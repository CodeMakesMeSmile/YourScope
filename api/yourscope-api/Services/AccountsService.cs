using Microsoft.AspNetCore.Mvc;
using yourscope_api;
using yourscope_api.entities;
using yourscope_api.service;
using yourscope_api.Models.DbModels;
using User = yourscope_api.Models.DbModels.User;
using Firebase.Auth;
using Firebase.Auth.Providers;
using Firebase.Auth.Repository;
using FirebaseAdmin;
using FirebaseAdmin.Auth;
using Newtonsoft.Json;
using System.Text;
using Newtonsoft.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace yourscope_api.service
{
    public class AccountsService : IAccountsService
    {
        #region class fields and constructors
        private readonly IConfiguration configuration;
        private readonly FirebaseAuthClient firebase;
        private readonly string FirebaseWebAPIKey;
        private readonly string FirebaseAuthDomain;

        private readonly FirebaseApp FirebaseApp;

        private readonly string FirebaseSendPasswordResetEmailUrl;

        public AccountsService(IConfiguration configuration, FirebaseApp firebaseApp)
        {
            this.configuration = configuration;
            this.FirebaseApp = firebaseApp;

            // Setting configuration values.
            string? apiKey = this.configuration.GetValue<string>("FirebaseAuth:APIKey");
            string? authDomain = this.configuration.GetValue<string>("FirebaseAuth:AuthDomain");
            string? firebaseResetPassword = this.configuration.GetValue<string>("FirebaseAuth:ResetPasswordUrl");

            // Null checks.
            if (string.IsNullOrEmpty(apiKey))
                throw new ArgumentNullException(nameof(apiKey), "Missing FirebaseWebAPIKey configuration field in appsettings.json");
            if (string.IsNullOrEmpty(authDomain))
                throw new ArgumentNullException(nameof(authDomain), "Missing FirebaseAuth:AuthDomain configuration field in appsettings.json");
            if (string.IsNullOrEmpty(firebaseResetPassword))
                throw new ArgumentNullException(nameof(firebaseResetPassword), "Missing FirebaseAuth:ResetPasswordUrl configuration field in appsettings.json");

            FirebaseWebAPIKey = apiKey;
            FirebaseAuthDomain = authDomain;
            FirebaseSendPasswordResetEmailUrl = firebaseResetPassword + FirebaseWebAPIKey;

            #region setup firebase
            var config = new FirebaseAuthConfig {
                ApiKey = FirebaseWebAPIKey,
                AuthDomain = FirebaseAuthDomain,
                Providers = new FirebaseAuthProvider[]
                {
                    new EmailProvider()
                }
            };
            firebase = new(config);
            #endregion
        }
        #endregion

        public bool CheckEmailRegistered(string email)
        {
            using var context = new YourScopeContext();

            List<User> users = context.Users.Where(user => user.Email == email).ToList();
            return users.Count > 0;
        }

        public async Task<ApiResponse> RegisterStudentMethod(UserRegistrationDto userInfo)
        {
            if (CheckEmailRegistered(userInfo.Email))
                return new ApiResponse(StatusCodes.Status400BadRequest, $"{userInfo.Email} has already been registered!", data: false, success: false);

            User user = ConvertRegistrationDtoToUser(userInfo, UserRole.Student);

            // Adding the extra roles claim to the Firebase user.
            string uid = (await FirebaseRegister(userInfo)).User.Uid;

            int userID = await InsertUserIntoDb(user);

            var claims = GenerateCustomClaims(UserRole.Student, userID, user);

            await FirebaseAuth.GetAuth(FirebaseApp).SetCustomUserClaimsAsync(uid, claims);

            return new ApiResponse(StatusCodes.Status201Created, "User successfully registered.", data: true, success: true);
        }

        public async Task<ApiResponse> RegisterEmployerMethod(UserRegistrationDto userInfo)
        {
            if (CheckEmailRegistered(userInfo.Email))
                return new ApiResponse(StatusCodes.Status400BadRequest, $"{userInfo.Email} has already been registered!", success: false);

            User user = ConvertRegistrationDtoToUser(userInfo, UserRole.Employer);

            string uid = (await FirebaseRegister(userInfo)).User.Uid;

            int userID = await InsertUserIntoDb(user);

            var claims = GenerateCustomClaims(UserRole.Employer, userID, user);

            await FirebaseAuth.GetAuth(FirebaseApp).SetCustomUserClaimsAsync(uid, claims);

            return new ApiResponse(StatusCodes.Status201Created, "User successfully registered.", true, success: true);
        }

        public async Task<ApiResponse> RegisterAdminMethod(UserRegistrationDto userInfo)
        {
            if (CheckEmailRegistered(userInfo.Email))
                return new ApiResponse(StatusCodes.Status400BadRequest, $"{userInfo.Email} has already been registered!", success: false);

            User user = ConvertRegistrationDtoToUser(userInfo, UserRole.Admin);

            string uid = (await FirebaseRegister(userInfo)).User.Uid;

            int userID = await InsertUserIntoDb(user);

            var claims = GenerateCustomClaims(UserRole.Admin, userID, user);

            await FirebaseAuth.GetAuth(FirebaseApp).SetCustomUserClaimsAsync(uid, claims);

            return new ApiResponse(StatusCodes.Status201Created, "User successfully registered.", true, success: true);
        }

        private async Task<UserCredential> FirebaseRegister(UserRegistrationDto userInfo)
        {
            var nameList = new List<string> { userInfo.FirstName.Trim() };
            if (userInfo.MiddleName is not null && userInfo.MiddleName.Trim().Length > 1)
                nameList.Add(userInfo.MiddleName.Trim() + ".");
            nameList.Add(userInfo.LastName.Trim());

            string displayName = string.Join(" ", nameList);

            return await firebase.CreateUserWithEmailAndPasswordAsync(userInfo.Email, userInfo.Password, displayName);
        }

        private static async Task<int> InsertUserIntoDb(User user)
        {
            using var context = new YourScopeContext();

            context.Users.Add(user);
            await context.SaveChangesAsync();

            return user.UserId;
        }

        public async Task<ApiResponse> LoginMethod(UserLoginDto loginInfo)
        {
            UserCredential userLogin;
            
            try
            {
                userLogin = await firebase.SignInWithEmailAndPasswordAsync(loginInfo.Email, loginInfo.Password);
            }
            catch (Firebase.Auth.FirebaseAuthException)
            {
                return new ApiResponse(StatusCodes.Status401Unauthorized, "Incorrect email or password.");
            }

            return new ApiResponse(StatusCodes.Status201Created, data: userLogin.User.Credential.IdToken, success: true);
        }

        public async Task<ApiResponse> SendPasswordResetEmailMethod(string email)
        {
            if (!CheckEmailRegistered(email))
                return new ApiResponse(StatusCodes.Status404NotFound, "Email is not registered.", success: false);

            #region sending the api call to firebase api
            using (var client = new HttpClient())
            {
                FirebasePasswordResetRequest request = new() { Email = email };
                StringContent body = new(JsonConvert.SerializeObject(request, new JsonSerializerSettings
                {
                    ContractResolver = new CamelCasePropertyNamesContractResolver()
                }));

                var response = await client.PostAsync(FirebaseSendPasswordResetEmailUrl, body);
                if (!response.IsSuccessStatusCode)
                    throw new ApplicationException($"Unable to call firebase API to send password to user. Got: {response.StatusCode}");
            }
            #endregion

            return new ApiResponse(StatusCodes.Status201Created, data: true, success: true);
        }

        public async Task<ApiResponse> GetUserByIdMethod(int id)
        {
            User? user = await GetUserById(id);

            if (user is null)
                return new ApiResponse(StatusCodes.Status404NotFound, $"User with ID {id} does not exist");

            return new ApiResponse(StatusCodes.Status200OK, data: user, success: true);
        }

        #region helpers
        private static User ConvertRegistrationDtoToUser(UserRegistrationDto userInfo, UserRole role)
        {
            User user = new()
            {
                Email = userInfo.Email,
                FirstName = userInfo.FirstName,
                MiddleName = userInfo.MiddleName,
                LastName = userInfo.LastName,
                Affiliation = userInfo.Affiliation,
                Birthday = userInfo.Birthday,
                Role = role,
                Grade = userInfo.Grade
            };

            #region retrieving the affiliation ID
            using var context = new YourScopeContext();

            int? affiliationID = role switch
            {
                UserRole.Student => context.Schools.Where(school => school.Name == user.Affiliation).Select(result => result.SchoolId).FirstOrDefault(),
                UserRole.Admin => context.Schools.Where(school => school.Name == user.Affiliation).Select(result => result.SchoolId).FirstOrDefault(),
                UserRole.Employer => context.Company.Where(company => company.CompanyName == user.Affiliation).Select(result => result.CompanyID).FirstOrDefault(),
                _ => null
            };
            if (affiliationID == 0) affiliationID = null;

            user.AffiliationID = affiliationID;
            #endregion

            return user;
        }

        private Dictionary<string, object> GenerateCustomClaims(UserRole role, int userID, User user)
        {
            var claims = new Dictionary<string, object>()
            {
                { "role", role },
                { "userID", userID }
            };
            if (user.AffiliationID is not null)
                claims.Add("affiliationID", user.AffiliationID);

            return claims;
        }

        private static async Task<User?> GetUserById(int id)
        {
            using var context = new YourScopeContext();

            User? user = await context.Users.Where(u => u.UserId == id).FirstOrDefaultAsync();

            return user;
        }
        #endregion
    }
}

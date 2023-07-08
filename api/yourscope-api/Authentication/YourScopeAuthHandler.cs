using FirebaseAdmin;
using FirebaseAdmin.Auth;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using System.Security.Claims;
using System.Text.Encodings.Web;

namespace yourscope_api.authentication
{
    public class YourScopeAuthHandler : AuthenticationHandler<AuthenticationSchemeOptions>
    {
        private readonly FirebaseApp firebaseApp;
        public YourScopeAuthHandler(IOptionsMonitor<AuthenticationSchemeOptions> options, ILoggerFactory logger, UrlEncoder encoder, ISystemClock clock, FirebaseApp firebaseApp) : base(options, logger, encoder, clock)
        {
            this.firebaseApp = firebaseApp;
        }

        protected async override Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            if (!Context.Request.Headers.ContainsKey("Authorization"))
                return AuthenticateResult.NoResult();

            string? token = Context.Request.Headers["Authorization"];

            if (string.IsNullOrEmpty(token) || !token.StartsWith("Bearer "))
                return AuthenticateResult.Fail("Empty token or invalid format.");

            token = token["Bearer ".Length..];

            FirebaseToken fbToken;
            try
            {
                fbToken = await FirebaseAuth.GetAuth(firebaseApp).VerifyIdTokenAsync(token);
            }
            catch(FirebaseAuthException ex)
            {
                return AuthenticateResult.Fail(ex);
            }

            return AuthenticateResult.Success(GenerateAuthTicket(fbToken.Claims));
        }
        private static AuthenticationTicket GenerateAuthTicket(IReadOnlyDictionary<string, object> claims)
        {
            List<Claim> claimsList = new()
            {
                new Claim("uid", claims["user_id"].ToString() ?? throw new ArgumentNullException("user_id", "Missing user_id in auth token.")),
                new Claim("userID", claims["userID"].ToString() ?? throw new ArgumentNullException("userID", "Missing userID in auth token.")),
                new Claim("email", claims["email"].ToString() ?? throw new ArgumentNullException("email", "Missing email in auth token."))
            };
            // Custom claims.
            if (claims.ContainsKey("name"))
                claimsList.Add(new Claim("name", claims["name"].ToString()!));
            if (claims.ContainsKey("role"))
                claimsList.Add(new Claim("role", claims["role"].ToString()!));
            if (claims.ContainsKey("affiliationID"))
                claimsList.Add(new Claim("affiliationID", claims["affiliationID"].ToString()!));

            List<ClaimsIdentity> identities = new() {new ClaimsIdentity(claimsList, "YourScopeType") };
            ClaimsPrincipal claimsPrincipal = new(identities);
            return new AuthenticationTicket(claimsPrincipal, JwtBearerDefaults.AuthenticationScheme);

        }
    }
}

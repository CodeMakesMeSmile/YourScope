using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using yourscope_api.Models;
using yourscope_api.entities;
using yourscope_api.service;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json;
using yourscope_api.Models.Reponse;

namespace yourscope_api.Controllers
{
    [Route("api/[controller]/v1")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        #region fields and constructors
        private readonly IAccountsService service;

        public AccountsController(IAccountsService service)
        {
            this.service = service;
        }
        #endregion

        /// <summary>
        /// Checks whether an email is already registered to a user or not.
        /// </summary>
        /// <param name="email">A required path parameter representing an email address.</param>
        /// <returns>true if the email is registered already and false otherwise</returns>
        [HttpGet]
        [Route("check-registered/{email}")]
        [ProducesResponseType(typeof(bool), 200)]
        [ProducesResponseType(404)]
        public IActionResult CheckEmailRegistered(string email)
        {
            ApiResponse response;
            try
            {
                bool registered = service.CheckEmailRegistered(email);

                response = new(StatusCodes.Status200OK, data: registered);
            }
            catch (Exception ex)
            {
                response = new(StatusCodes.Status500InternalServerError, exception: ex);
            }
            return StatusCode(response.StatusCode, response);
        }

        /// <summary>
        /// Sends a password reset email to the email address specified if they are registered.
        /// </summary>
        /// <param name="email">A required path parameter representing an email address.</param>
        /// <returns>true if the email was sent successfully or 404 if the email is not registered</returns>
        [HttpGet]
        [HttpPost]
        [Route("{email}/send-password-reset-email")]
        [ProducesResponseType(typeof(bool), 201)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> SendPasswordResetEmail(string email)
        {
            ApiResponse response;
            try
            {
                response = await service.SendPasswordResetEmailMethod(email);
            }
            catch(Exception ex)
            {
                response = new(StatusCodes.Status500InternalServerError, exception: ex);
            }
            return StatusCode(response.StatusCode, response);
        }

        /// <summary>
        /// Registers a student account.
        /// </summary>
        /// <param name="email">A required body parameter (string) representing an email address.</param>
        /// <param name="password">A required body parameter (string) representing the user's password.</param>
        /// <param name="firstName">A required body parameter (string) representing the user's first name</param>
        /// <param name="middleName">An optional body parameter (string) representing the user's middle name (if any).</param>
        /// <param name="lastName">A required body parameter (string) representing the a user's last name.</param>
        /// <param name="birthday">A required body parameter (date string) representing the user's birthday formmated as a date string.</param>
        /// <param name="affiliation">A required body parameter (string) representing the name of the school that the user goes to.</param>
        /// <param name="grade">A required body parameter (number between 8 and 13 inclusive) representing the user's grade.</param>
        /// <returns>true if the user account was registered sucessfully, 400 if there was a problem with the request, 500 otherwise.</returns>
        [ProducesResponseType(typeof(bool), 201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        [HttpPost]
        [Route("student/register")]
        public async Task<IActionResult> RegisterStudent([FromBody] UserRegistrationDto userInfo)
        {
            if (!ModelState.IsValid)
                return StatusCode(StatusCodes.Status400BadRequest, GenerateMissingFieldsResponse());

            ApiResponse response;
            try
            {
                response = await service.RegisterStudentMethod(userInfo);
            }
            catch (Exception ex)
            {
                response = new(StatusCodes.Status500InternalServerError, exception: ex);
            }
            return StatusCode(response.StatusCode, response);
        }

        /// <summary>
        /// Registers an employer account.
        /// </summary>
        /// <param name="email">A required body parameter (string) representing an email address.</param>
        /// <param name="password">A required body parameter (string) representing the user's password.</param>
        /// <param name="firstName">A required body parameter (string) representing the user's first name</param>
        /// <param name="middleName">An optional body parameter (string) representing the user's middle name (if any).</param>
        /// <param name="lastName">A required body parameter (string) representing the a user's last name.</param>
        /// <param name="birthday">A required body parameter (date string) representing the user's birthday formmated as a date string.</param>
        /// <param name="affiliation">A required body parameter (string) representing the name of the company an employer works at.</param>
        /// <returns>true if the user account was registered sucessfully, 400 if there was a problem with the request, 500 otherwise.</returns>
        [ProducesResponseType(typeof(bool), 201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        [HttpPost]
        [Route("employer/register")]
        public async Task<IActionResult> RegisterEmployer([FromBody] UserRegistrationDto userInfo)
        {
            if (!ModelState.IsValid)
                return StatusCode(StatusCodes.Status400BadRequest, GenerateMissingFieldsResponse());

            ApiResponse response;
            try
            {
                response = await service.RegisterEmployerMethod(userInfo);
            }
            catch (Exception ex)
            {
                response = new(StatusCodes.Status500InternalServerError, exception: ex);
            }
            return StatusCode(response.StatusCode, response);
        }

        /// <summary>
        /// Creates a login session for a user.
        /// </summary>
        /// <param name="email">A required body parameter representing the user's email address.</param>
        /// <param name="password">A required body parameter representing the user's password.</param>
        /// <returns>A JWT upon successful login, 401 on invalid credentials and 500 otherwise.</returns>
        [ProducesResponseType(typeof(string), 201)]
        [ProducesResponseType(401)]
        [ProducesResponseType(500)]
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDto userInfo)
        {
            if (!ModelState.IsValid)
                return StatusCode(StatusCodes.Status400BadRequest, GenerateMissingFieldsResponse());

            ApiResponse response;
            try
            {
                response = await service.LoginMethod(userInfo);
                return StatusCode(response.StatusCode, response);
            }
            catch (Exception ex)
            {
                response = new(StatusCodes.Status500InternalServerError, ex.Message, success: false, exception: ex);
                return StatusCode(response.StatusCode, response);
            }
        }

        #region helpers
        private ApiResponse GenerateMissingFieldsResponse()
        {
            List<string> errors = new();
            foreach (var field in ModelState)
            {
                if (field.Value.Errors.Any(e => e.ErrorMessage.Contains("is required")))
                    errors.Add($"{field.Key} is a required field.");
            }

            ApiResponse response = new(StatusCodes.Status400BadRequest, "Bad request.", errors: errors);

            return response;
        }
        #endregion
    }
}

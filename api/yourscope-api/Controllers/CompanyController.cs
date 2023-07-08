using Microsoft.AspNetCore.Mvc;
using yourscope_api.entities;
using yourscope_api.Models.DbModels;
using yourscope_api.service;

namespace yourscope_api.Controllers
{
    [Route("api/[controller]/v1")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        #region constructors and class fields
        private readonly ICompanyService service;

        public CompanyController(ICompanyService service)
        {
            this.service = service;
        }
        #endregion

        /// <summary>
        /// Used to check whether or not a company with a given name has been registered yet.
        /// </summary>
        /// <param name="company">A required path parameter representing the name of the company to be searched for.</param>
        /// <returns>true if the company name has already been registered and false if it has not.</returns>
        [ProducesResponseType(typeof(bool), 200)]
        [ProducesResponseType(500)]
        [HttpGet]
        [Route("check-company-exist/{company}")]
        public IActionResult CheckCompanyExists(string company)
        {
            ApiResponse response;
            try
            {
                response = service.CheckCompanyExistsMethod(company);
            }
            catch (Exception ex)
            {
                response = new(StatusCodes.Status500InternalServerError, exception: ex);
            }
            return StatusCode(response.StatusCode, response);
        }

        /// <summary>
        /// Registers a company with the YourScope system.
        /// </summary>
        /// <param name="companyInfo">The information of the company to be registered.</param>
        /// <returns>true is the registration was successful, 400 status if required information is missing and 500 otherwise.</returns>
        [ProducesResponseType(typeof(bool), 201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> RegisterCompany([FromBody] Company companyInfo)
        {
            if (!ModelState.IsValid)
                return StatusCode(StatusCodes.Status400BadRequest, GenerateMissingFieldsResponse());

            ApiResponse response;
            try
            {
                response = await service.RegisterCompanyMethod(companyInfo);
            }
            catch (Exception ex)
            {
                response = new(StatusCodes.Status500InternalServerError, exception: ex);
            }
            return StatusCode(response.StatusCode, response);
        }

        /// <summary>
        /// Gets a list of all the registered companies in the system.
        /// </summary>
        /// <returns>A list of all the registered companies in the system.</returns>
        [ProducesResponseType(typeof(List<Company>), 200)]
        [ProducesResponseType(500)]
        [HttpGet]
        public IActionResult GetCompanies()
        {
            ApiResponse response;
            try
            {
                response = service.GetCompaniesMethod();
            }
            catch(Exception ex)
            {
                response = new(StatusCodes.Status500InternalServerError, exception: ex);
            }
            return StatusCode(response.StatusCode, response);
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

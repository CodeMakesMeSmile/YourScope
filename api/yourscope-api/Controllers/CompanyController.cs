using Microsoft.AspNetCore.Mvc;
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

        [HttpGet]
        [Route("check-company-exist/{company}")]
        public IActionResult CheckCompanyExists(string company)
        {
            try
            {
                return Ok(service.CheckCompanyExists(company));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> RegisterCompany([FromBody] Company companyInfo)
        {
            try
            {
                return await service.RegisterCompanyMethod(companyInfo);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}

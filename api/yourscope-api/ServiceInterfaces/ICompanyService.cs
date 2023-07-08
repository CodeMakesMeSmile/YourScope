using Microsoft.AspNetCore.Mvc;
using yourscope_api.entities;
using yourscope_api.Models.DbModels;

namespace yourscope_api.service
{
    public interface ICompanyService
    {
        public ApiResponse CheckCompanyExistsMethod(string company);
        public ApiResponse GetCompaniesMethod();
        public List<Company> GetCompanyList();
        public Task<ApiResponse> RegisterCompanyMethod(Company companyInfo);
    }
}

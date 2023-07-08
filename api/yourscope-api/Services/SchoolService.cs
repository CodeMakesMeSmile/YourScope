using System;
using yourscope_api.entities;
using yourscope_api.Models.DbModels;

namespace yourscope_api.service
{
    public class SchoolService : ISchoolService
    {
        #region fields and constructor
        private readonly IConfiguration configuration;

        public SchoolService(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
        #endregion

        public ApiResponse GetSchoolsMethod()
        {
            List<School> schools = GetAllSchools();

            return new ApiResponse(StatusCodes.Status200OK, data: schools);
        }

        #region helpers
        private static List<School> GetAllSchools()
        {
            using var context = new YourScopeContext();

            return context.Schools.ToList();
        }
        #endregion
    }
}


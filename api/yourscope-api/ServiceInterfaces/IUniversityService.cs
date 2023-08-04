using System;
using yourscope_api.entities;
using yourscope_api.Models.DbModels;
using yourscope_api.Models.Request;

namespace yourscope_api.service
{
    public interface IUniversityService
    {
        public List<UniProgram> GetPrograms(UniProgramDetails details, int count, int offset);
        public List<University> GetUniversities();
        public Task<ApiResponse> CountProgramsMethod(UniProgramDetails details);
    }
}


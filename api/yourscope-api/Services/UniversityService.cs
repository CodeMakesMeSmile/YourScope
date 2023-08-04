using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using yourscope_api.entities;
using yourscope_api.Models.DbModels;
using yourscope_api.Models.Request;
using yourscope_api.service;

namespace yourscope_api.Services
{
    public class UniversityService : IUniversityService
    {
        #region class fields and constructor
        private readonly IConfiguration configuration;
        public UniversityService(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
        #endregion
        
        public List<UniProgram> GetPrograms(UniProgramDetails details, int count, int offset)
        {
            using var context = new YourScopeContext();
            var query = context.UniPrograms.AsQueryable();

            if (details.UniversityId != null)
            {
                query = query.Where(q => q.UniversityId == details.UniversityId);
            }

            var programList = query.ToList();

            //Can be omptimized with like query rather than loading courses into memory but I'm not sure how to do this while ignoring case
            if (details.Search != null)
            {
                return programList.Where(q => q.Name.Contains(details.Search, StringComparison.OrdinalIgnoreCase))
                    .Skip(offset)
                    .Take(count)
                    .ToList();
            }

            return programList
                    .Skip(offset)
                    .Take(count)
                    .ToList();
        }

        public List<University> GetUniversities()
        {
            using var context = new YourScopeContext();
            return context.Universities.ToList();
        }

        public async Task<ApiResponse> CountProgramsMethod(UniProgramDetails details)
        {
            int count = await CountPrograms(details);

            return new ApiResponse(StatusCodes.Status200OK, data: count, success: true);
        }

        private static async Task<int> CountPrograms(UniProgramDetails details)
        {
            using var context = new YourScopeContext();
            var query = context.UniPrograms.AsQueryable();

            if (details.UniversityId != null)
            {
                query = query.Where(q => q.UniversityId == details.UniversityId);
            }

            var programList = await query.ToListAsync();

            if (details.Search != null)
            {
                return programList
                    .Where(q => q.Name.Contains(details.Search, StringComparison.OrdinalIgnoreCase))
                    .ToList()
                    .Count;
            }

            return programList
                    .ToList()
                    .Count;
        }
    }
}

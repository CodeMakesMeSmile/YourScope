using System;
using yourscope_api.entities;
using yourscope_api.Models.DbModels;
using yourscope_api.Models.Request;

namespace yourscope_api.service
{
    public interface ISchoolService
    {
        public ApiResponse GetSchoolsMethod();
        public Task<ApiResponse> GetCoursesMethod(CourseFilter filters);
        public Task<ApiResponse> GetCourseCountMethod(int? schoolID, string? searchQuery, int? grade, string? disciplines);
        public Task<ApiResponse> DeleteCourseFromSchoolByIdMethod(int schoolId, int courseId);
        public Task<Course?> GetCourseById(int courseId);
        public void PopulateCourseData(List<Course> courses, int schoolId);
    }
}


using System;
using yourscope_api.entities;
using yourscope_api.Models.DbModels;

namespace yourscope_api.service
{
    public interface IStudentService
    {
        public Task<ApiResponse> GetStudentScheduleMethod(int studentID);
        public Task<ApiResponse> CreateStudentScheduleMethod(int studentID);
        public Task<ApiResponse> AddCourseToStudentScheduleMethod(int studentID, int year, int courseID);
        public Task<ApiResponse> RemoveCourseFromStudentScheduleMethod(int studentID, int year, int courseID);
        public Task<ApiResponse> GetReccomendedCourses(int studentId, int schoolId);

    }
}


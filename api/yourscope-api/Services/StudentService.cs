using System;
using Microsoft.EntityFrameworkCore;
using yourscope_api.entities;
using yourscope_api.Models.DbModels;
using yourscope_api.Models.Reponse;

namespace yourscope_api.service
{
    public class StudentService : IStudentService
    {
        #region class fields and constructor
        private readonly IConfiguration configuration;
        private readonly ISchoolService schoolService;

        public StudentService(IConfiguration configuration, ISchoolService schoolService)
        {
            this.configuration = configuration;
            this.schoolService = schoolService;
        }
        #endregion

        public async Task<ApiResponse> GetStudentScheduleMethod(int studentID)
        {
            Schedule? schedule = await GetScheduleFromDB(studentID);

            if (schedule is null)
                return new ApiResponse(StatusCodes.Status404NotFound, $"Student with ID {studentID} does not have a schedule. Please call the schedule creation endpoint to create one.");

            ScheduleDetails result = new(schedule);

            return new ApiResponse(StatusCodes.Status200OK, data: result, success: true);
        }

        public async Task<ApiResponse> CreateStudentScheduleMethod(int studentID)
        {
            Schedule? schedule = await GetScheduleFromDB(studentID);

            if (schedule is not null)
                return new ApiResponse(StatusCodes.Status400BadRequest, $"Student with ID {studentID} already has a schedule created!");

            User? student = await GetStudentUserFromDB(studentID);

            if (student is null)
                return new ApiResponse(StatusCodes.Status404NotFound, $"User with ID {studentID} does not exist.");
            if (student.Role != UserRole.Student)
                return new ApiResponse(StatusCodes.Status400BadRequest, $"User with ID {studentID} is not a student.");

            bool result = await CreateStudentSchedule(student);

            return new ApiResponse(StatusCodes.Status201Created, data: result, success: result);
        }

        public async Task<ApiResponse> AddCourseToStudentScheduleMethod(int studentID, int yearNumber, int courseID)
        {
            #region sanity checks
            User? student = await GetStudentUserFromDB(studentID);

            if (student is null)
                return new ApiResponse(StatusCodes.Status404NotFound, $"User with ID {studentID} does not exist.");
            if (student.Role != UserRole.Student)
                return new ApiResponse(StatusCodes.Status400BadRequest, $"User with ID {studentID} is not a student.");

            Schedule? schedule = await GetScheduleFromDB(studentID);

            if (schedule is null)
                return new ApiResponse(StatusCodes.Status404NotFound, $"Student with ID {studentID} does not have a schedule. Please call the schedule creation endpoint to create one.");

            Year? year = schedule.Years.Where(year => year.YearNumber == yearNumber).FirstOrDefault();

            if (year is null)
                return new ApiResponse(StatusCodes.Status400BadRequest, $"Student with ID {studentID} does not have year #{yearNumber} in their schedule.");

            Course? course = await schoolService.GetCourseById(courseID);

            if (course is null)
                return new ApiResponse(StatusCodes.Status404NotFound, $"Course with ID {courseID} does not exist.");
            #endregion

            CourseYear? link = await GetCourseYearLink(year.YearId, courseID);
            if (link is not null)
                return new ApiResponse(StatusCodes.Status200OK, $"Student with ID {studentID} already has course with ID {courseID} in their year #{yearNumber} schedule.");

            bool result = await AddCourseToStudentSchedule(year.YearId, courseID);

            return new ApiResponse(StatusCodes.Status201Created, data: result, success: result);
        }

        public async Task<ApiResponse> RemoveCourseFromStudentScheduleMethod(int studentID, int yearNumber, int courseID)
        {
            #region sanity checks
            User? student = await GetStudentUserFromDB(studentID);

            if (student is null)
                return new ApiResponse(StatusCodes.Status404NotFound, $"User with ID {studentID} does not exist.");
            if (student.Role != UserRole.Student)
                return new ApiResponse(StatusCodes.Status400BadRequest, $"User with ID {studentID} is not a student.");

            Schedule? schedule = await GetScheduleFromDB(studentID);

            if (schedule is null)
                return new ApiResponse(StatusCodes.Status404NotFound, $"Student with ID {studentID} does not have a schedule. Please call the schedule creation endpoint to create one.");

            Year? year = schedule.Years.Where(year => year.YearNumber == yearNumber).FirstOrDefault();

            if (year is null)
                return new ApiResponse(StatusCodes.Status400BadRequest, $"Student with ID {studentID} does not have year #{yearNumber} in their schedule.");

            Course? course = await schoolService.GetCourseById(courseID);

            if (course is null)
                return new ApiResponse(StatusCodes.Status404NotFound, $"Course with ID {courseID} does not exist.");
            #endregion

            CourseYear? link = await GetCourseYearLink(year.YearId, courseID);

            if (link is null)
                return new ApiResponse(StatusCodes.Status400BadRequest, $"Student with ID {studentID} does not have course with ID {courseID} in their year #{yearNumber} schedule.");

            bool result = await RemoveCourseFromStudentSchedule(link);

            return new ApiResponse(StatusCodes.Status200OK, data: result, success: result);
        }

        public async Task<ApiResponse> GetReccomendedCourses(int studentId, int schoolId)
        {
            Schedule? schedule = await GetScheduleFromDB(studentId);

            if (schedule is null)
                return new ApiResponse(StatusCodes.Status404NotFound, $"Student with ID {studentId} does not have a schedule. Please call the schedule creation endpoint to create one.");

            var result = GetSuggestedCourses(schedule, schoolId);

            return new ApiResponse(StatusCodes.Status200OK, data: result, success: true);

        }

        #region helpers
        private static async Task<Schedule?> GetScheduleFromDB(int studentID)
        {
            using var context = new YourScopeContext();

            Schedule? schedule = await context.Schedules
                .Where(s => s.StudentId == studentID)
                .Include(s => s.Years)
                .ThenInclude(year => year.CourseYears)
                .ThenInclude(cy => cy.Course)
                .FirstOrDefaultAsync();

            return schedule;
        }

        private static async Task<User?> GetStudentUserFromDB(int studentID)
        {
            using var context = new YourScopeContext();

            User? student = await context.Users
                .Where(user => user.UserId == studentID)
                .FirstOrDefaultAsync();

            return student;
        }

        private static async Task<bool> CreateStudentSchedule(User student)
        {
            using var context = new YourScopeContext();

            // Creating the schedule.
            Schedule schedule = new() { StudentId = student.UserId };

            context.Schedules.Add(schedule);
            await context.SaveChangesAsync();

            // Creating the years.
            for (int i = 1; i <= 4; i++)
            {
                Year year = new() { YearNumber = i, ScheduleId = schedule.ScheduleId };
                context.Years.Add(year);
            }

            await context.SaveChangesAsync();

            return true;
        }

        private static async Task<bool> AddCourseToStudentSchedule(int yearID, int courseID)
        {
            using var context = new YourScopeContext();

            CourseYear link = new() { YearId = yearID, CourseId = courseID };

            context.CourseYear.Add(link);
            await context.SaveChangesAsync();

            return true;
        }

        private static async Task<CourseYear?> GetCourseYearLink(int yearId, int courseID)
        {
            using var context = new YourScopeContext();

            CourseYear? link = await context.CourseYear
                .Where(cy => cy.YearId == yearId && cy.CourseId == courseID)
                .FirstOrDefaultAsync();

            return link;
        }

        private static async Task<bool> RemoveCourseFromStudentSchedule(CourseYear link)
        {
            using var context = new YourScopeContext();

            context.CourseYear.Remove(link);
            await context.SaveChangesAsync();

            return true;
        }

        private static HashSet<Course> GetSuggestedCourses(Schedule schedule, int schoolId)
        {

            HashSet<string> studentCourses = new HashSet<string>();

            schedule.Years.ForEach(year =>
            {
                year.CourseYears.ForEach(courseId =>
                {
                    studentCourses.Add(courseId.Course.CourseCode.Substring(0, 5));
                });
            });

            HashSet<Course> suggestedCourses = new HashSet<Course>();

            List<Course> schoolCourses = GetCoursesFromSchool(schoolId);

            foreach(Course course in schoolCourses)
            {
                //Don't suggest courses that students have already taken
                var formattedCourse = course.CourseCode.Substring(0, 5);
                if (studentCourses.Contains(formattedCourse)) continue;

                //Get prereqs of course
                var coursePrereqs = course.Prerequisites.Split(",", StringSplitOptions.RemoveEmptyEntries);

                //Check if prereq to course is student course, then add to suggested courses
                foreach (string prereq in coursePrereqs)
                {
                    var formattedPrereq = prereq.Substring(0, 5);
                    if (studentCourses.Contains(formattedPrereq))
                    {
                        suggestedCourses.Add(course);
                    }
                }
            }

            return suggestedCourses;


        }

        private static List<Course> GetCoursesFromSchool(int schoolId)
        {
            using var context = new YourScopeContext();
            return context.Courses
                .Include(q => q.SchoolCourses)
                .Where(q => q.SchoolCourses.Select(q => q.SchoolId).Contains(schoolId))
                .ToList();
        }
        #endregion
    }
}


using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using yourscope_api.entities;
using yourscope_api.service;

namespace yourscope_api.Controllers
{
    [Route("api/[controller]/v1")]
    public class StudentController : Controller
    {
        #region fields and constructor
        private readonly IStudentService service;

        public StudentController(IStudentService service)
        {
            this.service = service;
        }
        #endregion

        /// <summary>
        /// Gets the schedule of a student given their user ID.
        /// </summary>
        /// <param name="studentID">The user ID of the student whose schedule is to be retrieved.</param>
        /// <returns>A schedule object containing all the required scheduling information, including courses added onto the schedule.</returns>
        [HttpGet]
        [Route("schedule/{studentID}")]
        public async Task<IActionResult> GetStudentSchedule(int studentID)
        {
            ApiResponse response;
            try
            {
                response = await service.GetStudentScheduleMethod(studentID);
            }
            catch(Exception ex)
            {
                response = new(StatusCodes.Status500InternalServerError, exception: ex);
            }
            return StatusCode(response.StatusCode, response);
        }

        /// <summary>
        /// Create a schedule for the a student given their user ID.
        /// </summary>
        /// <param name="studentID">The user ID of the student whose schedule is to be created.</param>
        /// <returns>true if the creation was successful, 404 status if the user does not exist, 400 if the user is not a student, and 500 otherwise.</returns>
        [HttpPost]
        [Route("schedule/{studentID}")]
        public async Task<IActionResult> CreateStudentSchedule(int studentID)
        {
            ApiResponse response;
            try
            {
                response = await service.CreateStudentScheduleMethod(studentID);
            }
            catch(Exception ex)
            {
                response = new(StatusCodes.Status500InternalServerError, exception: ex);
            }
            return StatusCode(response.StatusCode, response);
        }

        /// <summary>
        /// Adds a course to a student's schedule for the given year.
        /// </summary>
        /// <param name="studentID">The user ID of the student whose schedule will be added to.</param>
        /// <param name="year">The year of study that the course should be added to.</param>
        /// <param name="courseID">The course ID of the course that will be added to the student's schedule.</param>
        /// <returns>true if the addition was successful, 404 if the student does not exist, the student does not have a schedule, the student does not have the selected year specified, or the course was not found, and 500 otherwise.</returns>
        [HttpPost]
        [Route("schedule/{studentID}/year/{year}/course/{courseID}")]
        public async Task<IActionResult> AddCourseToStudentSchedule(int studentID, int year, int courseID)
        {
            ApiResponse response;
            try
            {
                response = await service.AddCourseToStudentScheduleMethod(studentID, year, courseID);
            }
            catch(Exception ex)
            {
                response = new(StatusCodes.Status500InternalServerError, exception: ex);
            }
            return StatusCode(response.StatusCode, response);
        }

        /// <summary>
        /// Removes a course from a student's schedule given the student's user ID, the year of study, and the course ID to be removed.
        /// </summary>
        /// <param name="studentID">The user ID of the student whose schedule will be removed from.</param>
        /// <param name="year">The year of study that the course should be removed from.</param>
        /// <param name="courseID">The course ID of the course that will be removed from the student's schedule.</param>
        /// <returns>true if the removal was successful, 404 if the student does not exist, the student does not have a schedule, the student does not have the selected year specified, or the course was not found, and 500 otherwise.</returns>
        [HttpDelete]
        [Route("schedule/{studentID}/year/{year}/course/{courseID}")]
        public async Task<IActionResult> RemoveCourseFromStudentSchedule(int studentID, int year, int courseID)
        {
            ApiResponse response;
            try
            {
                response = await service.RemoveCourseFromStudentScheduleMethod(studentID, year, courseID);
            }
            catch (Exception ex)
            {
                response = new(StatusCodes.Status500InternalServerError, exception: ex);
            }
            return StatusCode(response.StatusCode, response);
        }

        /// <summary>
        /// Get reccomeneded courses for student
        /// </summary>
        /// <param name="studentID">Id of student</param>
        /// <param name="schoolId">Id of school of student</param>
        /// <returns></returns>
        [HttpGet]
        [Route("insight/courses/{studentID}")]
        public async Task<IActionResult> GetReccomendedCourses(int studentID, int schoolId)
        {
            ApiResponse response;
            try
            {
                response = await service.GetReccomendedCourses(studentID, schoolId);
            }
            catch (Exception ex)
            {
                response = new(StatusCodes.Status500InternalServerError, exception: ex);
            }
            return StatusCode(response.StatusCode, response);
        }
    }
}


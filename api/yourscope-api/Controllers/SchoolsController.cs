using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using yourscope_api.Models;
using yourscope_api.entities;
using yourscope_api.service;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json;
using yourscope_api.Models.DbModels;
using Google.Api.Gax;
using yourscope_api.Models.Request;

namespace yourscope_api.Controllers
{
    [Route("api/[controller]/v1")]
    [ApiController]
    public class SchoolsController : ControllerBase
    {
        #region fields and constructors
        private readonly ISchoolService service;

        public SchoolsController(ISchoolService service)
        {
            this.service = service;
        }
        #endregion

        /// <summary>
        /// Gets a list of registered schools in the system.
        /// </summary>
        /// <returns>A list of registered schools in the system.</returns>
        [ProducesResponseType(typeof(int), 200)]
        [ProducesResponseType(500)]
        [HttpGet]
        public IActionResult GetSchools()
        {
            ApiResponse response;
            try
            {
                response = service.GetSchoolsMethod();
            }
            catch (Exception ex)
            {
                response = new(StatusCodes.Status500InternalServerError, exception: ex);
            }
            return StatusCode(response.StatusCode, response);
        }

        /// <summary>
        /// Adds course(s) to a given school
        /// </summary>
        /// <param name="courses">List of course(s) to add, if a course already exists, it uses the data that's already in the table.</param>
        /// <param name="schoolID">Id of school to add courses to</param>
        /// <returns></returns>
        [ProducesResponseType(201)]
        [ProducesResponseType(500)]
        [HttpPost]
        [Route("{schoolID}/courses")]
        public IActionResult CourseInit([FromBody] List<Course> courses, int schoolID)
        {
            try
            {
                service.PopulateCourseData(courses, schoolID);
                return StatusCode(201, new ApiResponse(201, success: true));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse(500, ex.Message, success: false));
            }
        }

        /// <summary>
        /// Gets the number of filtered courses.
        /// </summary>
        /// <param name="schoolID">An optional integer parameter representing the ID of a school used to filter courses by school.</param>
        /// <param name="searchQuery" example="ICS2O">An optional string parameter used to filter courses by both course code and course title.</param>
        /// <param name="grade" example="9">An optional integer between 9 and 12 inclusive used to filter courses by grade.</param>
        /// <param name="disciplines" example="Math,Science,Geography">An optional comma seperated list of strings used to filter courses by discipline.</param>
        /// <returns></returns>
        [HttpGet]
        [Route("courses/count")]
        public async Task<IActionResult> GetCourseCount(int? schoolID, string? searchQuery, int? grade, string? disciplines)
        {
            ApiResponse response;
            try
            {
                response = await service.GetCourseCountMethod(schoolID, searchQuery, grade, disciplines);
            }
            catch(Exception ex)
            {
                response = new ApiResponse(StatusCodes.Status500InternalServerError, exception: ex);
            }
            return StatusCode(response.StatusCode, response);
        }

        /// <summary>
        /// Gets a filtered list of courses.
        /// </summary>
        /// <param name="schoolID">An optional integer parameter representing the ID of a school used to filter courses by school.</param>
        /// <param name="searchQuery" example="ICS2O">An optional string parameter used to filter courses by both course code and course title.</param>
        /// <param name="grade" example="9">An optional integer between 9 and 12 inclusive used to filter courses by grade.</param>
        /// <param name="disciplines" example="Math,Science,Geography">An optional comma seperated list of strings used to filter courses by discipline.</param>
        /// <param name="offset">An optional query parameter (integer) representing the number of records to skip (default: 0). Used for pagination.</param>
        /// <param name="count">An optional query parameter (integer) representing the number of records to return (default: 10). Used for pagination.</param>
        /// <returns></returns>
        [HttpGet]
        [Route("courses")]
        public async Task<IActionResult> GetCourses(int? schoolID, string? searchQuery, int? grade, string? disciplines, int offset = 0, int count = 10)
        {
            ApiResponse response;
            try
            {
                CourseFilter filters = new()
                {
                    SchoolID = schoolID,
                    SearchQuery = searchQuery,
                    Grade = grade,
                    Disciplines = disciplines,
                    Offset = offset,
                    Count = count
                };

                response = await service.GetCoursesMethod(filters);
            }
            catch (Exception ex)
            {
                response = new(StatusCodes.Status500InternalServerError, exception: ex);
            }
            return StatusCode(response.StatusCode, response);
        }

        /// <summary>
        /// Remove a course from a school. This will not remove the course from the Courses table.
        /// </summary>
        /// <param name="schoolID">A required path parameter (integer) representing the ID of the school with the course to be removed from.</param>
        /// <param name="courseID">A required path parameter (integer) representing the ID of the course to be removed from the school.</param>
        /// <returns>true if the course deletion was successful, 404 status if the schoolId-courseId pair was not found, and 500 status otherwise.</returns>
        [HttpDelete]
        [Route("{schoolID}/courses/{courseID}")]
        public async Task<IActionResult> DeleteCourseFromSchoolById(int schoolID, int courseID)
        {
            ApiResponse response;
            try
            {
                response = await service.DeleteCourseFromSchoolByIdMethod(schoolID, courseID);
            }
            catch (Exception ex)
            {
                response = new(StatusCodes.Status500InternalServerError, exception: ex);
            }
            return StatusCode(response.StatusCode, response);
        }
    }
}

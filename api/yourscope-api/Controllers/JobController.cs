using Firebase.Auth;
using Google.Api.Gax;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using yourscope_api.entities;
using yourscope_api.Models.DbModels;
using yourscope_api.Models.Reponse;
using yourscope_api.Models.Request;
using yourscope_api.service;
using yourscope_api.ServiceInterfaces;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;
using static System.Net.Mime.MediaTypeNames;

namespace yourscope_api.Controllers
{
    [Route("api/[controller]/v1")]
    [ApiController]
    public class JobController : ControllerBase
    {
        #region constructors and class fields
        private readonly IJobService service;

        public JobController(IJobService service)
        {
            this.service = service;
        }
        #endregion



        /// <summary>
        /// Create Job Posting
        /// </summary>
        /// <param name="posting">Job Posting Details For Employer</param>
        /// <returns>Returns the id of the newly created JobPosting</returns>
        [ProducesResponseType(typeof(int), 200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        [HttpPost]
        [Route("posting")]
        public IActionResult CreateJobPosting([FromBody] JobPostingCreation posting)
        {
            if (!ModelState.IsValid)
                return StatusCode(StatusCodes.Status400BadRequest, GenerateMissingFieldsResponse());

            try
            {
                var jobId = service.CreateJobPosting(posting);
                return StatusCode(201, new ApiResponse(201, data : jobId, success : true));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse(500, ex.Message, success : false));
            }
        }

        /// <summary>
        /// Get Job Postings based on optional filters
        /// </summary>
        /// <param name="userId">User Id of student(only needed if applied is not null)</param>
        /// <param name="applied">If provided, will filter based on whether or not the user has applied to the job</param>
        /// <param name="count">Pagination count</param>
        /// <param name="offset">Pagination offset</param>
        /// <returns>List of job postings based on filters</returns>
        [ProducesResponseType(typeof(List<JobPostingDetails>), 200)]
        [ProducesResponseType(500)]
        [HttpGet]
        [Route("posting")]
        public IActionResult GetJobPostings(int? userId, bool? applied, int count, int offset)
        {
            try {

                JobFilter filters = new JobFilter
                {
                    UserId = userId,
                    Applied = applied,
                    Count = count,
                    Offset = offset
                };

                var jobPostings = service.GetJobPostings(filters);
                return Ok(new ApiResponse(200, data: jobPostings, success: true));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse(500, ex.Message, success: false));
            }
        }

        /// <summary>
        /// Deletes job posting
        /// </summary>
        /// <param name="id">Id of job posting to delete</param>
        /// <returns></returns>
        [ProducesResponseType(typeof(int), 200)]
        [ProducesResponseType(500)]
        [HttpDelete]
        [Route("posting/{id}")]
        public IActionResult DeleteJobPostings(int id)
        {
            try
            {
                service.DeleteJobPosting(id);
                return Ok(new ApiResponse(200, success: true));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse(500, ex.Message, success: false));
            }
        }

        /// <summary>
        /// Get number of job postings based on optional filters
        /// </summary>
        /// <param name="userId">User Id of student(only needed if applied is not null)</param>
        /// <param name="applied">If provided, will filter based on whether or not the user has applied to the job</param>
        /// <returns></returns>
        [ProducesResponseType(typeof(int), 200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        [HttpGet]
        [Route("posting/count")]
        public IActionResult CountJobPosting(int? userId, bool? applied)
        {
            JobFilter filters = new JobFilter
            {
                UserId = userId,
                Applied = applied
            };

            try
            {
                var numJobPostings = service.CountJobPostings(filters);
                return Ok(new ApiResponse(200, data: numJobPostings, success: true));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse(500, ex.Message, success: false));
            }
        }

        /// <summary>
        /// Create Job Application
        /// </summary>
        /// <param name="application">Job Application details</param>
        /// <returns></returns>
        [ProducesResponseType(typeof(int), 200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        [HttpPost]
        [Route("application")]
        public IActionResult CreateJobApplication([FromBody] JobApplicationCreation application)
        {
            if (!ModelState.IsValid)
                return StatusCode(StatusCodes.Status400BadRequest, GenerateMissingFieldsResponse());

            try
            {
                var jobId = service.CreateJobApplication(application);
                return Ok(new ApiResponse(200, data: jobId, success: true));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse(500, ex.Message, success: false));
            }
        }

        /// <summary>
        /// Get Job Applications
        /// </summary>
        /// <param name="id">Job Posting Id of job applications</param>
        /// <returns></returns>
        [ProducesResponseType(typeof(List<JobApplicationDetails>), 200)]
        [ProducesResponseType(500)]
        [HttpGet]
        [Route("application/{id}")]
        public IActionResult GetJobApplications(int id)
        {
            try
            {
                var applications = service.GetJobApplications(id);
                return StatusCode(200, new ApiResponse(200, data: applications, success: true));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse(500, ex.Message, success: false));
            }
        }
        
        #region helpers
        private ApiResponse GenerateMissingFieldsResponse()
        {
            List<string> errors = new();
            foreach (var field in ModelState)
            {
                if (field.Value.Errors.Any(e => e.ErrorMessage.Contains("is required")))
                    errors.Add($"{field.Key} is a required field.");
            }

            ApiResponse response = new(StatusCodes.Status400BadRequest, "Bad request.", errors: errors);

            return response;
        }
        #endregion
        
    }
}

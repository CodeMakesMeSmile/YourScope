using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using yourscope_api.Models;
using yourscope_api.entities;
using yourscope_api.service;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json;
using yourscope_api.Models.DbModels;
using yourscope_api.Models.Request;

namespace yourscope_api.Controllers
{
    [Route("api/[controller]/v1")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        #region fields and constructors
        private readonly IProfileService service;

        public ProfileController(IProfileService service)
        {
            this.service = service;
        }
        #endregion

        /// <summary>
        /// Gets student profile
        /// </summary>
        /// <param name="userId">User Id of user whose profile is being accessed</param>
        /// <returns></returns>
        [ProducesResponseType(typeof(Profile), 200)]
        [ProducesResponseType(204)]
        [ProducesResponseType(500)]
        [HttpGet]
        [Route("profile")]
        public IActionResult GetProfile(int userId)
        {
            try
            {
                var profile = service.GetProfile(userId);
                return Ok(new ApiResponse(profile == null ? 204 : 200, data: service.GetProfile(userId), success: true));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse(500, ex.Message, success: false));
            }
        }


        /// <summary>
        /// Create new profile for user
        /// </summary>
        /// <param name="details">Details of new profile</param>
        /// <returns></returns>
        [ProducesResponseType(typeof(int), 200)]
        [ProducesResponseType(500)]
        [HttpPost]
        [Route("profile")]
        public IActionResult CreateProfile([FromBody] ProfileCreation details)
        {
            try
            {
                return Ok(new ApiResponse(200, data: service.CreateProfile(details), success: true));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse(500, ex.Message, success: false));
            }
        }

        /// <summary>
        /// Modifies profile based on optional paramters
        /// </summary>
        /// <param name="details">Given user Id, change the following properties of student profile (all values are nullable except for profileId)</param>
        /// <returns></returns>
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        [HttpPut]
        [Route("profile")]

        public IActionResult ModifyProfile([FromBody] ProfileDetails details)
        {
            try
            {
                service.ModifyProfile(details);
                return Ok(new ApiResponse(200, success: true));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse(500, ex.Message, success: false));
            }
        }

        /// <summary>
        /// Create job/volunteer experience for student profile
        /// </summary>
        /// <param name="userId">Id of user that is creating the new experience</param>
        /// <param name="experience">Details for expereince</param>
        /// <returns></returns>
        [ProducesResponseType(typeof(Experience), 200)]
        [ProducesResponseType(500)]
        [HttpPost]
        [Route("experience")]

        public IActionResult CreateExperience(int userId, [FromBody] Experience experience)
        {
            try
            {
                return Ok(new ApiResponse(200, data: service.CreateExperience(userId, experience), success: true));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse(500, ex.Message, success: false));
            }
        }

        /// <summary>
        /// Get experiences of user
        /// </summary>
        /// <param name="userId">Id of user whose experiences are being returned</param>
        /// <returns></returns>
        [ProducesResponseType(typeof(List<Experience>), 200)]
        [ProducesResponseType(500)]
        [HttpGet]
        [Route("experience")]
        public IActionResult GetExperiences(int userId)
        {
            try
            {
                return Ok(new ApiResponse(200, data: service.GetExperiences(userId), success: true));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse(500, ex.Message, success: false));
            }
        }

        /// <summary>
        /// Deletes experience based on experienceId
        /// </summary>
        /// <param name="experienceId">experienceId of experience to be deleted</param>
        /// <returns></returns>
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        [HttpDelete]
        [Route("experience")]

        public IActionResult DeleteExperience(int experienceId)
        {
            try
            {
                service.DeleteExperience(experienceId);
                return Ok(new ApiResponse(200, success: true));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse(500, ex.Message, success: false));
            }
        }

        /// <summary>
        /// Get Cover letters of user
        /// </summary>
        /// <param name="userId">Id of user whose cover letters are being returned</param>
        /// <returns></returns>
        [ProducesResponseType(typeof(List<CoverLetter>), 200)]
        [ProducesResponseType(500)]
        [HttpGet]
        [Route("cover-letter")]
        public IActionResult GetCoverLetters(int userId)
        {
            try
            {
                return Ok(new ApiResponse(200, data: service.GetCoverLetters(userId), success: true));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse(500, ex.Message, success: false));
            }
        }

        /// <summary>
        /// Create cover letter for student profile
        /// </summary>
        /// <param name="userId">Id of user that is creating the new cover letter</param>
        /// <param name="coverLetter">Details for cover letter</param>
        /// <returns></returns>
        [ProducesResponseType(typeof(CoverLetter), 200)]
        [ProducesResponseType(500)]
        [HttpPost]
        [Route("cover-letter")]

        public IActionResult CreateCoverLetter(int userId, [FromBody] CoverLetter coverLetter)
        {
            try
            {
                
                return Ok(new ApiResponse(200, data: service.CreateCoverLetter(userId, coverLetter), success: true));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse(500, ex.Message, success: false));
            }
        }

        /// <summary>
        /// Delete cover letter for student profile
        /// </summary>
        /// <param name="userId">Id of user that is deleting the new cover letter</param>
        /// <returns></returns>
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        [HttpDelete]
        [Route("cover-letter")]

        public IActionResult DeleteCoverLetter(int coverLetterId)
        {
            try
            {
                service.DeleteCoverLetter(coverLetterId);
                return Ok(new ApiResponse(200, success: true));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse(500, ex.Message, success: false));
            }
        }

    }
}

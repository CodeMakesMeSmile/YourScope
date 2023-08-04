using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using yourscope_api.entities;
using yourscope_api.Models.DbModels;
using yourscope_api.Models.Request;
using yourscope_api.service;

namespace yourscope_api.Controllers
{
    [Route("api/[controller]/v1")]
    public class UniversityController: Controller
    {
        #region fields and constructor
        private readonly IUniversityService service;

        public UniversityController(IUniversityService service)
        {
            this.service = service;
        }
        #endregion

        /// <summary>
        /// Gets list of universities, with their corresponding ids
        /// </summary>
        /// <returns>A schedule object containing all the required scheduling information, including courses added onto the schedule.</returns>
        [ProducesResponseType(typeof(List<University>), 200)]
        [ProducesResponseType(500)]
        [HttpGet]
        [Route("schools")]
        public IActionResult GetUniversities()
        {
            try
            {
                var unis = service.GetUniversities().Select(q => new {q.Id, q.Name}).ToList();
                return Ok(new ApiResponse(200, data: unis, success: true));
            }
            catch(Exception ex)
            {
                return StatusCode(500, new ApiResponse(500, ex.Message, success: false));
            }
        }

        /// <summary>
        /// Gets list of univesity programs, based on optional filters
        /// </summary>
        /// <param name="details">(optional) Search program by university and name</param>
        /// <param name="count">Pagination count</param>
        /// <param name="offset">Pagination offset</param>
        /// <returns></returns>
        [ProducesResponseType(typeof(List<UniProgram>), 200)]
        [ProducesResponseType(500)]
        [HttpGet]
        [Route("programs")]
        public IActionResult GetPrograms(UniProgramDetails details, int count, int offset)
        {

            try
            {
                return Ok(new ApiResponse(200, data: service.GetPrograms(details, count, offset), success: true));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse(500, ex.Message, success: false));
            }
        }

        /// <summary>
        /// Returns the total number of filtered university programs
        /// </summary>
        /// <param name="details">Search program by university and name</param>
        /// <returns></returns>
        [ProducesResponseType(typeof(int), 200)]
        [ProducesResponseType(500)]
        [HttpGet]
        [Route("programs/count")]
        public async Task<IActionResult> CountPrograms(UniProgramDetails details)
        {
            ApiResponse response;
            try
            {
                response = await service.CountProgramsMethod(details);
            }
            catch(Exception ex)
            {
                response = new ApiResponse(StatusCodes.Status500InternalServerError, exception: ex);
            }
            return StatusCode(response.StatusCode, response);
        }

    }
}


using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using yourscope_api.entities;
using yourscope_api.Models.DbModels;
using yourscope_api.Models.Request;
using yourscope_api.service;

namespace yourscope_api.Controllers
{
    [Route("api/[controller]/v1")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        #region fields and constructors
        private readonly IEventsService service;

        public EventsController(IEventsService service)
        {
            this.service = service;
        }
        #endregion

        /// <summary>
        /// Creates a new event and adds it into the system.
        /// </summary>
        /// <param name="eventDetails">The details of the event to be created.</param>
        /// <returns>true if the event was successfully created, 400 status if required information is missing, and 500 otherwise.</returns>
        [ProducesResponseType(typeof(bool), 201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        [HttpPost]
        public async Task<IActionResult> CreateEvent([FromBody] EventCreationDto eventDetails)
        {
            if (!ModelState.IsValid)
                return StatusCode(StatusCodes.Status400BadRequest, GenerateMissingFieldsResponse());

            ApiResponse response;
            try
            {
                response = await service.CreateEventMethod(eventDetails);
            }
            catch (Exception ex)
            {
                response = new(StatusCodes.Status500InternalServerError, exception: ex);
            }
            return StatusCode(response.StatusCode, response);
        }

        /// <summary>
        /// Removes an event from the system.
        /// </summary>
        /// <param name="id">A required path parameter representing the id of the event to be deleted.</param>
        /// <returns>true if the event deletion was successful, 500 status if there was an error.</returns>
        [ProducesResponseType(typeof(bool), 200)]
        [ProducesResponseType(500)]
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteEvent(int id)
        {
            ApiResponse response;
            try
            {
                response = await service.DeleteEventMethod(id);
            }
            catch(Exception ex)
            {
                response = new(StatusCodes.Status500InternalServerError, exception: ex);
            }
            return StatusCode(response.StatusCode, response);
        }

        /// <summary>
        /// Gets a list of events in the system based on filters provided as query parameters.
        /// </summary>
        /// <param name="userId">An optional query parameter (user's ID as an integer) used to filter the list of events by the user who created it.</param>
        /// <param name="schoolId">An optional query parameter representing a school ID as an integer and used to filter the list of events by associated school. </param>
        /// <param name="offset">An optional query parameter (integer) representing the number of records to skip (default: 0). Used for pagination.</param>
        /// <param name="count">An optional query parameter (integer) representing the number of records to return (default: 10). Used for pagination.</param>
        /// <returns>A list of events or status 500 if there was an error.</returns>
        [ProducesResponseType(typeof(List<Event>), 200)]
        [ProducesResponseType(500)]
        [HttpGet]
        public async Task<IActionResult> GetEvents(int? userId, int? schoolId, int? offset, int? count)
        {
            #region initialize event filter object.
            EventFilter filters = new()
            {
                UserId = userId,
                SchoolId = schoolId,
            };
            if (offset is not null)
                filters.Offset = (int) offset;
            if (count is not null)
                filters.Count = (int) count;
            #endregion

            ApiResponse response;
            try
            {
                response = await service.GetEventsMethod(filters);
            }
            catch(Exception ex)
            {
                response = new(StatusCodes.Status500InternalServerError, exception: ex);
            }
            return StatusCode(response.StatusCode, response);
        }

        /// <summary>
        /// Gets the number of events in the system based on filters provided as query parameters.
        /// </summary>
        /// <param name="userId">An optional query parameter (user's ID as an integer) used to filter the list of events by the user who created it.</param>
        /// <param name="schoolId">An optional query parameter representing a school ID as an integer and used to filter the list of events by associated school. </param>
        /// <returns>The number of events in the system filtered using the inputs from the query parameters.</returns>
        [ProducesResponseType(typeof(int), 200)]
        [ProducesResponseType(500)]
        [HttpGet]
        [Route("count")]
        public async Task<IActionResult> CountEvents(int? userId, int? schoolId)
        {
            ApiResponse response;
            try
            {
                response = await service.CountEventsMethod(userId, schoolId);
            }
            catch (Exception ex)
            {
                response = new(StatusCodes.Status500InternalServerError, exception: ex);
            }
            return StatusCode(response.StatusCode, response);
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

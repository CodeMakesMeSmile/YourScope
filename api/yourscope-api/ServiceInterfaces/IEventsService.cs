using yourscope_api.entities;
using yourscope_api.Models.Request;

namespace yourscope_api.service
{
    public interface IEventsService
    {
        public Task<ApiResponse> CreateEventMethod(EventCreationDto eventDetails);
        public Task<ApiResponse> DeleteEventMethod(int id);
        public Task<ApiResponse> GetEventsMethod(EventFilter filter);
        public Task<ApiResponse> CountEventsMethod(int? userId, int? schoolId);
    }
}

using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using yourscope_api.Models.DbModels;

namespace yourscope_api.Controllers
{
    [ApiController]
    [Route("api/Test/v1")]
    public class EventController : ControllerBase
    {

        private readonly ILogger<EventController> _logger;

        public EventController(ILogger<EventController> logger)
        {
            _logger = logger;
        }
        
        [HttpPost]
        [Route("add-to-database")]
        public int Post()
        {
            using (var context = new YourScopeContext())
            {

                Event newEvent = new() { Title = "test", Description = "test"};
                context.Events.Add(newEvent);
                context.SaveChanges();
            }
            return 0;
        }
    }
}
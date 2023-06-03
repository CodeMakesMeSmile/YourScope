using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using yourscope_api.Models.Request;

namespace yourscope_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EventController : ControllerBase
    {

        private readonly ILogger<EventController> _logger;

        public EventController(ILogger<EventController> logger)
        {
            _logger = logger;
        }

        [HttpPost(Name = "event")]
        public int Post()
        {
            using (var context = new YourScopeContext())
            {

                Event newEvent = new Event { Title = "test", Description = "test"};
                context.Events.Add(newEvent);

                context.SaveChanges();
            }
            return 0;
        }
    }
}
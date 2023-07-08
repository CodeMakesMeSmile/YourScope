using Microsoft.AspNetCore.Http.Features;
using yourscope_api.entities;

namespace yourscope_api.middleware
{
    public class YourScopeStatusCodeMiddleware
    {
        private readonly RequestDelegate next;

        public YourScopeStatusCodeMiddleware(RequestDelegate next)
        {
            this.next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            await next(context);

            if (context.Response.StatusCode == StatusCodes.Status404NotFound)
            {
                ApiResponse response = new(StatusCodes.Status404NotFound, "The resource you are looking for does not exist.");
                context.Response.ContentType = "application/json";

                await context.Response.WriteAsJsonAsync(response);
            }
        }
    }
}

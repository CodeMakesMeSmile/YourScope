using Microsoft.AspNetCore.Http.Features;
using yourscope_api.entities;
using static Google.Apis.Requests.BatchRequest;

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
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
            
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            ApiResponse response;
            if (context.Response.StatusCode == StatusCodes.Status404NotFound)
            {
                response = new(StatusCodes.Status404NotFound, "The resource you are looking for does not exist.");
                context.Response.ContentType = "application/json";
            }
            else
            {
                response = new ApiResponse(StatusCodes.Status500InternalServerError, "There was an unknown error within the application.", exception: exception);
            }
            return context.Response.WriteAsJsonAsync(response);
        }
    }
}

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Policy;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mime;
using yourscope_api.entities;

namespace yourscope_api.Authentication
{
    public class YourScopeAuthorizationMiddleware : IAuthorizationMiddlewareResultHandler
    {
        public async Task HandleAsync(RequestDelegate next, HttpContext context, AuthorizationPolicy policy, PolicyAuthorizationResult authorizeResult)
        {
            var result = authorizeResult.Challenged ? HandleChallengedResult() : authorizeResult.Forbidden ? HandleForbiddenResult() : null;

            if (result is not null)
            {
                context.Response.StatusCode = result.StatusCode;
                context.Response.ContentType = "application/json";

                await context.Response.WriteAsJsonAsync(result);
                return;
            }

            await next(context);
        }

        #region methods to handle different authorization results
        private static ApiResponse HandleChallengedResult()
        {
            ApiResponse response = new(StatusCodes.Status401Unauthorized, "Authentication failure.", success: false);

            return response;
        }

        private static ApiResponse HandleForbiddenResult()
        {
            ApiResponse response = new(StatusCodes.Status403Forbidden, "User is not authorized to access this resource.", success: false);

            return response;
        }
        #endregion
    }
}

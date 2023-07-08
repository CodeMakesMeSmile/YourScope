using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using yourscope_api.service;
using Firebase.Auth;
using Firebase.Auth.Providers;
using FirebaseAdmin;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using yourscope_api.authentication;
using yourscope_api.ServiceInterfaces;
using yourscope_api.Services;
using Microsoft.AspNetCore.Authorization;
using yourscope_api.Authentication;
using yourscope_api.middleware;
using Newtonsoft.Json.Serialization;
using System.Reflection;

string YourScopePolicy = "YourScopePolicy";

var builder = WebApplication.CreateBuilder(args);
#region configuration setup
builder.Configuration.SetBasePath(Directory.GetCurrentDirectory());
builder.Configuration.AddJsonFile("appsettings.json", optional: false);
builder.Configuration.AddEnvironmentVariables();
#endregion
// Add services to the container.

#region Services Configuration

builder.Services.AddControllers()
    .AddNewtonsoftJson(options =>
        {
            options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
        })
    .ConfigureApiBehaviorOptions(options =>
        {
            options.SuppressModelStateInvalidFilter = true;
        });
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c => 
    {
        var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
        var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
        c.IncludeXmlComments(xmlPath);
    }
);
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: YourScopePolicy,
        policy => policy
        .AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod());
});
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddScheme<AuthenticationSchemeOptions, YourScopeAuthHandler>(JwtBearerDefaults.AuthenticationScheme, options => { });

builder.Services.AddRouting(builder => { builder.LowercaseUrls = true; });

#region dependency injection
builder.Services.AddTransient<IAccountsService, AccountsService>();
builder.Services.AddTransient<ICompanyService, CompanyService>();
builder.Services.AddTransient<IEventsService, EventsService>();
builder.Services.AddTransient<IJobService, JobService>();
builder.Services.AddTransient<ISchoolService, SchoolService>();
builder.Services.AddSingleton(FirebaseApp.Create());
builder.Services.AddSingleton<IAuthorizationMiddlewareResultHandler, YourScopeAuthorizationMiddleware>();
#endregion

#endregion

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

#region Middleware Configuration
app.UseCors(YourScopePolicy);
app.UseMiddleware<YourScopeStatusCodeMiddleware>();
#endregion

app.Run();

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using yourscope_api.service;
using Firebase.Auth;
using Firebase.Auth.Providers;
using FirebaseAdmin;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using yourscope_api.authentication;

string YourScopePolicy = "YourScopePolicy";

var builder = WebApplication.CreateBuilder(args);
#region configuration setup
builder.Configuration.SetBasePath(Directory.GetCurrentDirectory());
builder.Configuration.AddJsonFile("appsettings.json", optional: false);
builder.Configuration.AddEnvironmentVariables();
#endregion
// Add services to the container.

#region Services Configuration

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
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
builder.Services.AddSingleton(FirebaseApp.Create());
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

app.UseAuthorization();

app.MapControllers();

#region Middleware Configuration
app.UseCors(YourScopePolicy);
#endregion

app.Run();

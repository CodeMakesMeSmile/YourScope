using Microsoft.EntityFrameworkCore;
using yourscope_api.Models.DbModels;

namespace yourscope_api
{
    public class YourScopeContext : DbContext
    {
        private readonly IConfiguration config = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json")
            .AddEnvironmentVariables()
            .Build();

        public DbSet<Event> Events { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Company> Company { get; set; }
        public DbSet<School> Schools { get; set; }
        public DbSet<JobApplication> JobApplications { get; set; }
        public DbSet<JobPosting> JobPostings { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            string? connectionString = config.GetConnectionString("db");
            optionsBuilder.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
        }
    }
}

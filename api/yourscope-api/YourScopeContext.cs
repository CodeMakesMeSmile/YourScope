using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;
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
        public DbSet<Experience> Experiences { get; set; }
        public DbSet<CoverLetter> CoverLetters { get; set; }
        public DbSet<Profile> Profiles { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<SchoolCourse> SchoolCourse { get; set; }
        public DbSet<Schedule> Schedules { get; set; }
        public DbSet<Year> Years { get; set; }
        public DbSet<CourseYear> CourseYear{ get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            string? connectionString = config.GetConnectionString("db");
            optionsBuilder.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<SchoolCourse>()
                .HasKey(e => new { e.SchoolId, e.CourseId });
            modelBuilder.Entity<CourseYear>()
                .HasKey(e => new { e.CourseId, e.YearId });
        }
    }
}

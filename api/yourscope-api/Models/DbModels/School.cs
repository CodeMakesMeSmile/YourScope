using System.ComponentModel.DataAnnotations;

namespace yourscope_api.Models.DbModels
{
    public class School
    {
        [Key]
        public int SchoolId { get; set; }
        public required string Name { get; set; }
        public string? Address { get; set; }
        public List<SchoolCourse> SchoolCourses { get; set; } = new();
    }
}

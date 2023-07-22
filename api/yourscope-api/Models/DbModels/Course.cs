using System.Text.Json.Serialization;

namespace yourscope_api.Models.DbModels
{

    public enum Credits : byte
    {
        NoCredit = 0,       // 0.0 credits
        HalfCredit = 1,     // 0.5 credits
        FullCredit = 2,     // 1.0 credits
        DoubleCredit = 3,   // 2.0 credits
        QuadCredit = 4      // 2.0 credits
    }

    public class Course
    {
        [JsonIgnore]
        public int CourseId { get; set; }
        public required string CourseCode { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public required string Discipline { get; set; }
        public required string Type { get; set; } // Open, Academic, Applied etc. (too many types for an enum)
        public byte Grade { get; set; }
        public Credits Credits { get; set; }
        public required string Prerequisites { get; set; } // Comma seperated list of ids
        
        [JsonIgnore]
        public List<SchoolCourse> SchoolCourses { get; set; } = new();
        [JsonIgnore]
        public List<CourseYear> CourseYears { get; set; } = new();

    }
}

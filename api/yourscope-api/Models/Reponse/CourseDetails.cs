using System.Text.Json.Serialization;
using yourscope_api.Models.DbModels;

namespace yourscope_api.Models.Reponse
{

    public class CourseDetails
    {
        public int CourseId { get; set; }
        public string CourseCode { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Discipline { get; set; }
        public string Type { get; set; } // Open, Academic, Applied etc. (too many types for an enum)
        public byte Grade { get; set; }
        public Credits Credits { get; set; }
        public string Prerequisites { get; set; } // Comma seperated list of ids

        public CourseDetails(Course course)
        {
            this.CourseId = course.CourseId;
            this.CourseCode = course.CourseCode;
            this.Name = course.Name;
            this.Description = course.Description;
            this.Discipline = course.Discipline;
            this.Type = course.Type;
            this.Grade = course.Grade;
            this.Credits = course.Credits;
            this.Prerequisites = course.Prerequisites;
        }
    }
}

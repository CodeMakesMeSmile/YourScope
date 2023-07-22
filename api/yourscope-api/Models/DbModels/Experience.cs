using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace yourscope_api.Models.DbModels{
    public class Experience
    {
        [Key]
        [JsonIgnore]
        public int ExperienceId { get; set; }
        public bool isWorkExperience { get; set; } // True for work experience, false for volunteer experience
        public int StartDate { get; set; }
        public int EndDate { get; set; }
        public required string Position { get; set; }
        public required string Company { get; set; }
        public string? Location { get; set; }
        public required string Description { get; set; } //Comma seperated list of bullet points

    }
}

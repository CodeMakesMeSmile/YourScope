using System.ComponentModel.DataAnnotations;

namespace yourscope_api.Models.DbModels
{
    public class JobApplication
    {
        [Key]
        public int JobApplicationId { get; set; }
        public required JobPosting JobPosting { get; set; } = null!;
        public required User User { get; set; } = null!;
        public CoverLetter? CoverLetter { get; set; }
    }
}

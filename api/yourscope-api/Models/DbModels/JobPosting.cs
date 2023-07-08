using System.ComponentModel.DataAnnotations;
using yourscope_api.Models.DbModels;

namespace yourscope_api.Models.DbModels
{
    public class JobPosting
    {
        [Key]
        public int JobPostingId { get; set; }
        public required User User { get; set; } = null!;
        public required string Title { get; set; }
        public required string Description { get; set; }
        public DateTime ApplicationDeadline { get; set; }        

    }
}
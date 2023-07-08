using System.ComponentModel.DataAnnotations;

namespace yourscope_api.Models.DbModels
{
    public class Event
    {
        [Key]
        public int EventId { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
        public required DateTime Date { get; set; }
        public required string Location { get; set; }
        public int? UserId { get; set; }
        public User? User { get; set; } = null!;
        public int? SchoolId { get; set; }
        public School? School { get; set; } = null!;
    }
}

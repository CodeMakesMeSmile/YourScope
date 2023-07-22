using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace yourscope_api.Models.DbModels
{
    public class Schedule
    {
        [Key]
        public int ScheduleId { get; set; }
        public int StudentId { get; set; }
        [ForeignKey("StudentId")]
        public User Student { get; set; } = null!;
        public List<Year> Years { get; set; } = new List<Year>();
    }
}

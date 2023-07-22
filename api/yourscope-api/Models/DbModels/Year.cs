using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace yourscope_api.Models.DbModels
{
    public class Year
    {
        [Key]
        public int YearId { get; set; }
        public required int YearNumber { get; set; }
        public required int ScheduleId { get; set; }

        // Navigation properties.
        [ForeignKey("ScheduleId")]
        public Schedule Schedule { get; set; } = null!;
        public List<CourseYear> CourseYears { get; set; } = new();
    }
}

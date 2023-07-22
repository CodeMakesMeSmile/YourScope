using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace yourscope_api.Models.DbModels
{
    public class SchoolCourse
    {
        public int SchoolId { get; set; }
        public int CourseId { get; set; }

        [ForeignKey("SchoolId")]
        public School School { get; set; } = null!;

        [ForeignKey("CourseId")]
        public Course Course { get; set; } = null!;
    }
}

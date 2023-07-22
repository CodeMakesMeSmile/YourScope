using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.Extensions.Hosting;

namespace yourscope_api.Models.DbModels
{
    public class CourseYear
    {
        public int YearId { get; set; }
        public int CourseId { get; set; }

        [ForeignKey("YearId")]
        public Year Year { get; set; } = null!;

        [ForeignKey("CourseId")]
        public Course Course { get; set; } = null!;
    }
}
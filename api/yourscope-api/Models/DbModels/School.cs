using System.ComponentModel.DataAnnotations;

namespace yourscope_api.Models.DbModels
{
    public class School
    {
        [Key]
        public required string Name { get; set; }
        public required string? Address { get; set; } // Might be online school, so nullable
    }
}

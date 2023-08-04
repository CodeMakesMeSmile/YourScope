using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace yourscope_api.Models.DbModels
{
    // Based on this format https://www.colorado.edu/business/sites/default/files/attached-files/Cover%20Letter%20Writing%202014.pdf
    public class CoverLetter
    {
        [Key]
        [JsonIgnore]
        public int CoverLetterId { get; set; }
        public required string Intro { get; set; }
        public required string SalesPitch1 { get; set; }
        public string? SalesPitch2 { get; set; } 
        public string? SalesPitch3 { get; set; } //Optional since students may not have 2-3 skills to pitch to employers, but they should have at least 2
        public required string Conclusion { get; set; }
        [JsonIgnore]
        public bool IsDeleted { get; set; } = false;
    }
}

using System.ComponentModel.DataAnnotations;

namespace yourscope_api.Models.DbModels
{
    public class Tag
    {
        [Key]
        public int TagId { get; set; }
        public required string TagName { get; set; }
    }
}

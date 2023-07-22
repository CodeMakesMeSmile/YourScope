using System.ComponentModel.DataAnnotations;
using yourscope_api.Models.DbModels;

namespace yourscope_api.Models.Request
{
    public class ProfileCreation
    {
        public int UserId { get; set; }
        public required string Skills { get; set; } //Comma seperated list
        public required string IntrestsHobbies { get; set; } //Comma seperated list
        public required string Awards { get; set; } //Comma seperated list
    }
}

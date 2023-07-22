using yourscope_api.Models.DbModels;

namespace yourscope_api.Models.Request
{
    public class ProfileDetails
    {
        public int ProfileId { get; set; }
        public string? Skills { get; set; } //Comma seperated list
        public string? IntrestsHobbies { get; set; } //Comma seperated list
        public string? Awards { get; set; } //Comma seperated list
    }
}

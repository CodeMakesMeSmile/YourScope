using System.ComponentModel.DataAnnotations;

namespace yourscope_api.Models.DbModels
{
    public class Profile
    {

        [Key]
        public int ProfileId { get; set; }
        public User User { get; set; } = null!;
        public ICollection<CoverLetter> CoverLetters { get; set; } = new List<CoverLetter>();
        public ICollection<Experience> Experiences { get; set; } = new List<Experience>();
        public required string Skills { get; set; } //Comma seperated list
        public required string IntrestsHobbies { get; set; } //Comma seperated list
        public required string Awards { get; set; } //Comma seperated list

    }
}

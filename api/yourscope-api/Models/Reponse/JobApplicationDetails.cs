using yourscope_api.Models.DbModels;

namespace yourscope_api.Models.Reponse
{
    public class JobApplicationDetails
    {
        public required string Email { get; set; }
        public required string FirstName { get; set; }
        public string? MiddleName { get; set; }
        public required string LastName { get; set; }
        public DateTime? Birthday { get; set; }
        public required string School { get; set; }
        public UserGrade? Grade { get; set; }
        public CoverLetter? CoverLetter { get; set; }
        public List<string> Skills { get; set; } = new List<string>();
        public List<string> IntrestsHobbies { get; set; } = new List<string>();
        public List<string> Awards { get; set; } = new List<string>();
    }
}

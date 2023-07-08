using yourscope_api.Models.DbModels;

namespace yourscope_api.entities
{
    public class UserRegistrationDto
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
        public required string FirstName { get; set; }
        public string? MiddleName { get; set; }
        public required string LastName { get; set; }
        public DateTime? Birthday { get; set; }
        public required string Affiliation { get; set; }
        public UserGrade? Grade { get; set; }

    }
}

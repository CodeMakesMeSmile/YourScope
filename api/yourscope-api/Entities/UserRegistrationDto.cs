using yourscope_api.Models.DbModels;

namespace yourscope_api.entities
{
    public class UserRegistrationDto
    {
        /// <summary>
        /// Email: A required string representing the email address of the user used for registration.
        /// </summary>
        /// <example>email@domain.com</example>
        public required string Email { get; set; }
        /// <summary>
        /// Password: A required string storing the user's password used for registration.
        /// </summary>
        /// <example>Password1</example>
        public required string Password { get; set; }
        /// <summary>
        /// First Name: A required string representing the user's first name.
        /// </summary>
        /// <example>Samuel</example>
        public required string FirstName { get; set; }
        /// <summary>
        /// Middle Name: An optional string representing the user's middle name.
        /// </summary>
        /// <example>Leroy</example>
        public string? MiddleName { get; set; }
        /// <summary>
        /// Last Name: A required string representing the user's last name.
        /// </summary>
        /// <example>Jackson</example>
        public required string LastName { get; set; }
        /// <summary>
        /// Birthday: An optional date string representing the user's birthday.
        /// </summary>
        public DateTime? Birthday { get; set; }
        /// <summary>
        /// Affiliation: A required string representing either the name of the company the user works at (employers) or the name of the school the user is associated with (students and admins).
        /// </summary>
        /// <example>Wendat Village</example>
        public required string Affiliation { get; set; }
        /// <summary>
        /// Grade: An optional number between 8 and 13 inclusive that represent's a student's grade (only used for studet registration).
        /// </summary>
        public UserGrade? Grade { get; set; }

    }
}

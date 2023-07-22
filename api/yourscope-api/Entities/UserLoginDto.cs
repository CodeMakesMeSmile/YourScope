namespace yourscope_api.entities
{
    public class UserLoginDto
    {
        /// <summary>
        /// Email: A required string representing the user's email address.
        /// </summary>
        /// <example>email@domain.com</example>
        public required string Email { get; set; }
        /// <summary>
        /// A string required representing the user's password.
        /// </summary>
        /// <example>Password1</example>
        public required string Password { get; set; }
    }
}

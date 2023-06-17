namespace yourscope_api.Models.DbModels
{
    public enum UserRole
    {
        Student,
        Admin,
        Employer
    }

    public enum UserGrade : short
    {
        Eight = 8,
        Nine = 9,
        Ten = 10,
        Eleven = 11,
        Twelve = 12,
        ThirteenPlus = 13,
    }

    public class User
    {
        public int UserId { get; set; }
        public required string Email { get; set; }
        public required string FirstName { get; set; }
        public string? MiddleName { get; set; }
        public required string LastName { get; set; }
        public DateTime? Birthday { get; set; }
        public UserRole Role { get; set; }
        public required string Affiliation { get; set; }
        public UserGrade? Grade { get; set; }

    }
}

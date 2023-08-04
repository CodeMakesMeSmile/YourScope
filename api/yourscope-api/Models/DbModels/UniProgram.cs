using System.Reflection.Metadata;

namespace yourscope_api.Models.DbModels
{
    public class UniProgram
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string GradeRange { get; set; }
        public required string Language { get; set; }
        public required string Prerequisites { get; set; } //Comma seperated value
        public required string Website { get; set; } //Links to program website
        public int UniversityId { get; set; }
    }
}

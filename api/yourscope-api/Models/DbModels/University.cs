using Microsoft.Extensions.Hosting;
using System.Text.Json.Serialization;

namespace yourscope_api.Models.DbModels
{
    public class University
    {
        public int Id { get; set; }
        public required string Name { get; set; }

        [JsonIgnore]
        public ICollection<UniProgram> UniPrograms { get; } = new List<UniProgram>();

    }
}

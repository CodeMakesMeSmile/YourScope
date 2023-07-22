using System;
namespace yourscope_api.Models.Request
{
    public class CourseFilter
    {
        public int? SchoolID { get; set; }
        public string? SearchQuery { get; set; }
        public int? Grade { get; set; }
        public string? Disciplines { get; set; }
        public int Count { get; set; } = 10;
        public int Offset { get; set; } = 0;
        public List<int>? CourseIDs;
    }
}


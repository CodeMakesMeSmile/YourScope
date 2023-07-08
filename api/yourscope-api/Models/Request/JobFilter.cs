namespace yourscope_api.Models.Request
{
    public class JobFilter
    {
        public int? UserId { get; set; }
        public int? Count { get; set; } //Should always be given except for counting jobs
        public int? Offset { get; set; } //Should always be given except for counting jobs
        public bool? Applied { get; set; }
    }
}

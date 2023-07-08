namespace yourscope_api.Models.Request
{
    public class EventFilter
    {
        public int? UserId { get; set; }
        public int? SchoolId { get; set; }
        public int Count { get; set; } = 10;
        public int Offset { get; set; } = 0;
    }
}

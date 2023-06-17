namespace yourscope_api.Models.DbModels
{
    public class Event
    {
        public int EventId { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
    }
}

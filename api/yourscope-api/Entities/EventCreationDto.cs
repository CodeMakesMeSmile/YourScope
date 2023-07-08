namespace yourscope_api.entities
{
    public class EventCreationDto
    {
        public required string Title { get; set; }
        public required string Description { get; set; }
        public required DateTime Date { get; set; }
        public required string Location { get; set; }
        public required int UserId { get; set; }
    }
}

namespace yourscope_api.Models.Request
{
    public class JobPostingCreation
    {
        public int UserId { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
        public DateTime ApplicationDeadline { get; set; }
    }
}

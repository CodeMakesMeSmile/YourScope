using yourscope_api.Models.DbModels;

namespace yourscope_api.Models.Reponse
{
    public class JobPostingDetails
    {
        public int PostingID { get; set; }
        public string FirstName { get; set; }
        public string? MiddleName { get; set; }
        public string LastName { get; set; }
        public string? CompanyName { get; set; }
        public string? Country { get; set; }
        public string? City { get; set; }
        public string? Address { get; set; }
        public string? CompanyEmail { get; set; }
        public int? UnitNumber { get; set; }
        public string? Phone { get; set; }
        public string? Fax { get; set; }
        public string? Type { get; set; }
        public string JobTitle { get; set; }
        public string Description { get; set; }
        public DateTime ApplicationDeadline { get; set; }

        public JobPostingDetails (JobPosting posting, User user, Company? company) {
            this.PostingID = posting.JobPostingId;
            this.FirstName = user.FirstName;
            this.MiddleName = user.MiddleName;
            this.LastName = user.LastName;
            this.CompanyName = company?.CompanyName;
            this.Country = company?.Country;
            this.City = company?.City;
            this.Address = company?.Address;
            this.CompanyEmail = company?.Email;
            this.UnitNumber = company?.UnitNumber;
            this.Phone = company?.Phone;
            this.Fax = company?.Fax;
            this.Type = company?.Type;
            this.Description = posting.Description;
            this.ApplicationDeadline = posting.ApplicationDeadline;
            this.JobTitle = posting.Title;
        }
    }
}

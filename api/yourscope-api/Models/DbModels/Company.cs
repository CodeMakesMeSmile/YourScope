using System.ComponentModel.DataAnnotations;

namespace yourscope_api.Models.DbModels
{
    /*
    public enum CompanyType
    {
        Accomodation,
        FoodServices,
        AdminAndSupport
        WasteManagement,
        Remediation,
        Agriculture,
        Forestry,
        Fishing,
        Hunting,
        Arts,
        Entertainment,
        Recreation,
        Construction,
        Education,
        FinanceAndInsurance,
        HealthCare,
        SocialAssistance,
        Information,
        CulturalIndustries,
        Management,
        Manufacturing,
        Mining,
        OilAndGasExtraction,
        Other,
        Professional,
        Technical,
        Scientific,
        PublicAdmin,
        RealEstate,
        Retail,
        Transportation,
        Warehousing,
        Utilities,
        Wholesale
    }
    */

    public class Company
    {
        [Key]
        public required string CompanyName { get; set; }
        public required string Country { get; set; }
        public required string City { get; set; }
        public required string Address { get; set; }
        public int? UnitNumber { get; set; }
        public string? Phone { get; set; }
        public string? Fax { get; set; }
        public required string Email { get; set; }
        public string? Type { get; set; }
    }
}

using yourscope_api.Models.DbModels;
using yourscope_api.Models.Reponse;
using yourscope_api.Models.Request;

namespace yourscope_api.ServiceInterfaces
{
    public interface IJobService
    {
        public int CreateJobPosting(JobPostingCreation posting);
        public int CountJobPostings(JobFilter filters);
        public List<JobPostingDetails> GetJobPostings(JobFilter filters);
        public void DeleteJobPosting(int postingId);
        public int CreateJobApplication(JobApplicationCreation application);
        public List<JobApplicationDetails> GetJobApplications(int postingId);
    }
}

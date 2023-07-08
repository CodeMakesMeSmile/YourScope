using Google.Api.Gax;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using yourscope_api.Models.DbModels;
using yourscope_api.Models.Reponse;
using yourscope_api.Models.Request;
using yourscope_api.service;
using yourscope_api.ServiceInterfaces;

namespace yourscope_api.Services
{
    public class JobService : IJobService
    {

        #region Fields and Constructor
        private readonly ICompanyService companyService;
        public JobService() {
            this.companyService = new CompanyService();
        }
        #endregion

        public int CountJobPostings(JobFilter filters)
        {
            using var context = new YourScopeContext();
            return this.QueryJobPostings(filters, context).Count();
        }

        public int CreateJobApplication(JobApplicationCreation application)
        {
            using var context = new YourScopeContext();


            JobApplication newApplication = new JobApplication
            {
                User = context.Users.Where(q => q.UserId == application.userId).First(),
                JobPosting = context.JobPostings.Where(q => q.JobPostingId == application.jobPostingId).First()
            };

            context.JobApplications.Add(newApplication);
            context.SaveChanges();

            return newApplication.JobApplicationId;

        }

        public int CreateJobPosting(JobPostingCreation posting)
        {
            using var context = new YourScopeContext();

            var user = context.Users.Where(q => q.UserId == posting.UserId).First();
            var newPosting = new JobPosting
            {
                User = user,
                Title = posting.Title,
                Description = posting.Description,
                ApplicationDeadline = posting.ApplicationDeadline
            };

            context.JobPostings.Add(newPosting);
            context.SaveChanges();

            return newPosting.JobPostingId;
        }

        public void DeleteJobPosting(int postingId)
        {
            using var context = new YourScopeContext();
            var posting = context.JobPostings.Where(q => q.JobPostingId == postingId).First();
            context.JobPostings.Remove(posting);
            context.SaveChanges();
        }

        public List<JobApplicationDetails> GetJobApplications(int jobPostingId)
        {
            using var context = new YourScopeContext();

            List<JobApplicationDetails> jobApplications = new List<JobApplicationDetails>();

            context.JobApplications
                .Include(q => q.User)
                .Include(q => q.JobPosting)
                .Where(q => q.JobPosting.JobPostingId == jobPostingId)
                .ToList()
                .ForEach(application =>
            {
                var user = application.User;
                jobApplications.Add(new JobApplicationDetails
                {
                    Birthday = user.Birthday,
                    Email = user.Email,
                    FirstName = user.FirstName,
                    MiddleName = user.MiddleName,
                    LastName = user.LastName,
                    Grade = user.Grade,
                    School = user.Affiliation
                });
            });

            return jobApplications;
        }

        public List<JobPostingDetails> GetJobPostings(JobFilter filters)
        {
            using var context = new YourScopeContext();
            List<JobPostingDetails> result = new List<JobPostingDetails>();
            List<Company> companies = this.companyService.GetCompanyList();

            if (filters.Offset == null || filters.Count == null)
            {
                throw new ArgumentNullException("Offset and count must be specefied");
            }

            this.QueryJobPostings(filters, context)
                .Include(q => q.User)
                .Skip((int)filters.Offset)
                .Take((int)filters.Count)
                .ToList()
                .ForEach(posting =>
            {
                var user = posting.User;
                var company = companies.Where(q => q.CompanyName == user.Affiliation).FirstOrDefault();

                if (company != null)
                {
                    result.Add(new JobPostingDetails(posting, user, company));
                }

                else
                {
                    throw new Exception(String.Format("Job Posting with id {0} created by non-employer", posting.JobPostingId));
                }
                
            });

            return result;
        }

        private IQueryable<JobPosting> QueryJobPostings(JobFilter filters, YourScopeContext context)
        {
            var allPostings = context.JobPostings.AsQueryable();

            if (filters.Applied != null)
            {

                var applications = context.JobApplications.Where(q => q.User.UserId == filters.UserId).Select(q => q.JobPosting.JobPostingId);
                allPostings = allPostings.Where(q => applications.Contains(q.JobPostingId) == filters.Applied);
            }

            return allPostings;
        }
    }
}

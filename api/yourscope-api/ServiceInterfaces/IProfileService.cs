using Microsoft.EntityFrameworkCore.Query;
using System;
using yourscope_api.entities;
using yourscope_api.Models.DbModels;
using yourscope_api.Models.Request;

namespace yourscope_api.service
{
    public interface IProfileService
    {
        public Profile? GetProfile(int UserId);
        public int CreateProfile(ProfileCreation details);
        public void ModifyProfile(ProfileDetails details);
        public int CreateExperience(int userId, Experience experience);
        public List <Experience> GetExperiences(int userId);
        public void DeleteExperience(int experienceId);
        public CoverLetter CreateCoverLetter(int userId, CoverLetter coverLetter);
        public List<CoverLetter> GetCoverLetters(int userId);
        public void DeleteCoverLetter(int coverLetterId);
    }
}


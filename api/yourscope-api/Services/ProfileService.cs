using Firebase.Auth;
using Microsoft.EntityFrameworkCore;
using yourscope_api.Models.DbModels;
using yourscope_api.Models.Request;
using yourscope_api.service;

namespace yourscope_api.Services
{
    public class ProfileService : IProfileService
    {
        #region constructor
        public ProfileService() { }
        #endregion

        public CoverLetter CreateCoverLetter(int userId, CoverLetter coverLetter)
        {
            using var context = new YourScopeContext();

            //Assume profile exsists
            Profile profile = context.Profiles.Include(q => q.User).First(p => p.User.UserId == userId);

            profile.CoverLetters.Add(coverLetter);
            context.SaveChanges();

            return coverLetter;

        }

        public int CreateExperience(int userId, Experience experience)
        {
            using var context = new YourScopeContext();
            
            //Assume profile exsists
            Profile profile = context.Profiles.Include(q => q.User).First(p => p.User.UserId == userId);

            profile.Experiences.Add(experience);
            context.SaveChanges();

            return experience.ExperienceId;
        }

        public int CreateProfile(ProfileCreation details)
        {
            using var context = new YourScopeContext();

            Profile newProfile = new Profile
            {
                Skills = details.Skills,
                IntrestsHobbies = details.IntrestsHobbies,
                Awards = details.Awards,
                User = context.Users.First(q => q.UserId == details.UserId)
            };

            context.Profiles.Add(newProfile);
            context.SaveChanges();

            return newProfile.ProfileId;
        }

        public void DeleteCoverLetter(int coverLetterId)
        {
            using var context = new YourScopeContext();

            var experience = context.CoverLetters.First(q => q.CoverLetterId == coverLetterId);

            context.CoverLetters.Remove(experience);
            context.SaveChanges();
        }

        public void DeleteExperience(int experienceId)
        {
            using var context = new YourScopeContext();

            var experience = context.Experiences.First(q => q.ExperienceId == experienceId);

            context.Experiences.Remove(experience);
            context.SaveChanges();

        }

        public List<CoverLetter> GetCoverLetters(int userId)
        {
            using var context = new YourScopeContext();

            return context.Profiles.Include(q => q.User)
                .Where(p => p.User.UserId == userId)
                .Include(q => q.CoverLetters)
                .Select(q => q.CoverLetters)
                .First()
                .ToList();
        }

        public List<Experience> GetExperiences(int userId)
        {
            using var context = new YourScopeContext();

            return context.Profiles.Include(q => q.User)
                .Where(p => p.User.UserId == userId)
                .Include(q => q.Experiences)
                .Select(q => q.Experiences)
                .First()
                .ToList();
        }

        public Profile? GetProfile(int userId)
        {
            using var context = new YourScopeContext();

            return context.Profiles.Include(q => q.User).FirstOrDefault(q => q.User.UserId == userId);
        }

        public void ModifyProfile(ProfileDetails details)
        {
            using var context = new YourScopeContext();

            var profile = context.Profiles.First(q => q.ProfileId == details.ProfileId);

            if (details.IntrestsHobbies != null)
            {
                profile.IntrestsHobbies = details.IntrestsHobbies;
            }

            if (details.Skills != null)
            {
                profile.Skills = details.Skills;
            }

            if (details.Awards != null)
            {
                profile.Awards = details.Awards;
            }

            context.Profiles.Update(profile);
            context.SaveChanges();

        }
    }
}

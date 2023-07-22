using System;
using yourscope_api.Models.DbModels;

namespace yourscope_api.Models.Reponse
{
    public class YearDetails
    {
        public int YearNumber { get; set; }
        public List<CourseDetails> Courses { get; set; }

        public YearDetails(Year year)
        {
            this.YearNumber = year.YearNumber;
            this.Courses = year.CourseYears.ConvertAll<CourseDetails>(link => new(link.Course));
        }
    }
}


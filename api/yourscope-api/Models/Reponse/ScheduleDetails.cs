using System;
using yourscope_api.Models.DbModels;

namespace yourscope_api.Models.Reponse
{
    public class ScheduleDetails
    {
        public int ScheduleId { get; set; }
        public int StudentId { get; set; }
        public List<YearDetails> Years { get; set; } = new();

        public ScheduleDetails(Schedule schedule)
        {
            this.ScheduleId = schedule.ScheduleId;
            this.StudentId = schedule.StudentId;
            this.Years = schedule.Years.ConvertAll<YearDetails>(year => new(year));
        }
    }
}


import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { APIService } from 'src/app/services/api.service';
import { CookieService } from 'ngx-cookie-service';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-dashboard-student',
  templateUrl: './dashboard-student.component.html',
  styleUrls: ['./dashboard-student.component.scss']
})
export class DashboardStudentComponent implements OnInit {
  name: string = "";
  schoolName: string = "";
  events: any = [];
  jobs: any = [];
  currentCourses: any = [];
  nextCourses: any = [];
  eventsWidth = 323;
  jobsWidth = 323;
  courseWidth = 200;
  user: any

  constructor(private api: APIService, private cookie: CookieService, private jwt: JwtService) { }

  async ngOnInit(): Promise<void> {
    this.user = JSON.parse(this.cookie.get('userObject'));
    const token = this.jwt.DecodeToken(this.cookie.get("loginToken"));
    this.name = token.name;
    this.schoolName = this.user.affiliation;
    this.api.getEvents(10, 0, token.affiliationID, undefined).subscribe((res: any) => {
      this.events = res.data;
      this.eventsWidth = this.eventsWidth * this.events.length;
    });
    this.api.getJobs(10, 0, token.userID, undefined).subscribe((res: any) => {
      this.jobs = res.data;
      this.jobsWidth = this.jobsWidth * this.jobs.length;
    });
    
    let result = await this.api.getStudentSchedule(token.userID);

    if (result == undefined) {
      await this.api.createStudentSchedule(token.userID);
      result = await this.api.getStudentSchedule(token.userID);
    }

    this.currentCourses = result.years[this.user.grade-9].courses;
    this.nextCourses = result.years[this.user.grade-8].courses;
  }
}

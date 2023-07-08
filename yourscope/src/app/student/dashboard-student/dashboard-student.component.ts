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
  collapsed = true;
  name: string = "";
  events: any = [];
  jobs: any = [];
  currentCourses = [
    {code: 'CSCC01', name: 'Introduction to Software Engineering'},
    {code: 'CSCC01', name: 'Introduction to Software Engineering'},
    {code: 'CSCC01', name: 'Introduction to Software Engineering'},
    {code: 'CSCC01', name: 'Introduction to Software Engineering'},
    {code: 'CSCC01', name: 'Introduction to Software Engineering'}
  ];
  previousCourses = [
    {code: 'CSCC01', name: 'Introduction to Software Engineering'},
    {code: 'CSCC01', name: 'Introduction to Software Engineering'},
    {code: 'CSCC01', name: 'Introduction to Software Engineering'},
    {code: 'CSCC01', name: 'Introduction to Software Engineering'},
    {code: 'CSCC01', name: 'Introduction to Software Engineering'}
  ];
  eventsWidth = 323;
  jobsWidth = 323;

  constructor(private api: APIService, private cookie: CookieService, private jwt: JwtService) { }

  ngOnInit() {
    const token = this.jwt.DecodeToken(this.cookie.get("loginToken"));
    this.name = token.name;
    this.api.getEvents(0, 10, token.affiliationID, undefined).subscribe((res: any) => {
      this.events = res.data;
      this.eventsWidth = this.eventsWidth * this.events.length;
    });
    this.api.getJobs(10, 0, token.userID, undefined).subscribe((res: any) => {
      this.jobs = res.data;
      this.jobsWidth = this.jobsWidth * this.jobs.length;
    });
  }
}
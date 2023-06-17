import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-employer',
  templateUrl: './dashboard-employer.component.html',
  styleUrls: ['./dashboard-employer.component.scss']
})
export class DashboardEmployerComponent {
  jobs = [
    {title: "Software Engineer", url: "employer/posting/1"},
    {title: "Data Scientist", url: "employer/posting/2"},
    {title: "Fullstack Developer", url: "employer/posting/3"}
  ];
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { EmployerRoutingModule } from './employer-routing.module';
import { DashboardEmployerComponent } from './dashboard-employer/dashboard-employer.component';
import { EmployerPostingComponent } from './employer-posting/employer-posting.component';
import { SharedModule } from '../shared/shared.module';

import { JobPostingComponent } from './job-posting/job-posting.component';
import { JobPostingCreateComponent } from './job-posting-create/job-posting-create.component';
import { JobApplicantComponent } from './job-applicant/job-applicant.component';

@NgModule({
  declarations: [
    DashboardEmployerComponent,
    EmployerPostingComponent,
    JobPostingComponent,
    JobPostingCreateComponent,
    JobApplicantComponent,
  ],
  imports: [
    CommonModule,
    EmployerRoutingModule,
    SharedModule, 
    BrowserModule,
    ReactiveFormsModule
  ]
})
export class EmployerModule { }

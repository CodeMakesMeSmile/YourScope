import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentRoutingModule } from './student-routing.module';
import { DashboardStudentComponent } from './dashboard-student/dashboard-student.component';
import { StudentCoursesComponent } from './student-courses/student-courses.component';
import { StudentPostingsComponent } from './student-postings/student-postings.component';
import { StudentEventsComponent } from './student-events/student-events.component';
import { StudentEventDetailsComponent } from './student-event-details/student-event-details.component';
import { StudentPostingDetailsComponent } from './student-posting-details/student-posting-details.component';
import { CourseComponent } from './course/course.component';
import { YearComponent } from './year/year.component';
import { ViewCourseComponent } from './view-course/view-course.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { StudentApplicationComponent } from './student-application/student-application.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { StudentToolkitComponent } from './student-toolkit/student-toolkit.component';
import { StudentCourseDetailsComponent } from './student-course-details/student-course-details.component';
import { MissingPrereqComponent } from './missing-prereq/missing-prereq.component';
import { CoverLetterViewComponent } from './cover-letter-view/cover-letter-view.component';
import { CoverLetterComponent } from './cover-letter/cover-letter.component';
import { PostSecondaryViewComponent } from './post-secondary-view/post-secondary-view.component';
import { ProgramComponent } from './program/program.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    DashboardStudentComponent,
    StudentEventsComponent,
    StudentPostingsComponent,
    StudentEventDetailsComponent,
    StudentCoursesComponent,
    StudentPostingDetailsComponent,
    CourseComponent,
    YearComponent,
    ViewCourseComponent,
    AddCourseComponent,
    ProfileComponent,
    CreateProfileComponent,
    StudentPostingDetailsComponent,
    StudentCourseDetailsComponent,
    MissingPrereqComponent,
    CoverLetterViewComponent,
    CoverLetterComponent,
    StudentToolkitComponent,
    PostSecondaryViewComponent,
    ProgramComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    StudentApplicationComponent,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatSlideToggleModule,
    MatSelectModule
  ]
})
export class StudentModule { }

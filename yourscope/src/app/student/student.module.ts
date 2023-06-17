import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { DashboardStudentComponent } from './dashboard-student/dashboard-student.component';
import { StudentCoursesComponent } from './student-courses/student-courses.component';
import { StudentPostingsComponent } from './student-postings/student-postings.component';
import { StudentEventsComponent } from './student-events/student-events.component';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { TruncatePipe } from '../pipes/truncate.pipe';

@NgModule({
  declarations: [
    DashboardStudentComponent,
    StudentPostingsComponent,
    StudentEventsComponent,
    StudentCoursesComponent,
    TruncatePipe,
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    NgbCollapse,
  ]
})
export class StudentModule { }

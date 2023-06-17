import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardStudentComponent } from './dashboard-student/dashboard-student.component';
import { StudentEventsComponent } from './student-events/student-events.component';
import { StudentPostingsComponent } from './student-postings/student-postings.component';
import { StudentCoursesComponent } from './student-courses/student-courses.component';
import { StudentToolkitComponent } from './student-toolkit/student-toolkit.component';

const routes: Routes = [
  { path: 'student', component: DashboardStudentComponent },
  { path: 'student/toolkit', component: StudentToolkitComponent },
  { path: 'student/courses', component: StudentCoursesComponent },
  { path: 'student/postings', component: StudentPostingsComponent },
  { path: 'student/events', component: StudentEventsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }

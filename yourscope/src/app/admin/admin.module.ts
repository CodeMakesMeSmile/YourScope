import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { AdminEventsComponent } from './admin-events/admin-events.component';
import { AdminCoursesComponent } from './admin-courses/admin-courses.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { AdminEventDetailsComponent } from './admin-event-details/admin-event-details.component';
import { AdminCourseDetailsComponent } from './admin-course-details/admin-course-details.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CreateCourseComponent } from './create-course/create-course.component';

@NgModule({
  declarations: [
    DashboardAdminComponent,
    AdminEventsComponent,
    AdminCoursesComponent,
    CreateEventComponent, 
    CreateCourseComponent, 
    AdminEventDetailsComponent,
    AdminCourseDetailsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    SharedModule,
  ],
  exports: [RouterModule],
  bootstrap: [AdminEventsComponent] 
})
export class AdminModule { }

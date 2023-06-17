import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router'; 
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { AdminEventsComponent } from './admin-events/admin-events.component';
import { AdminCoursesComponent } from './admin-courses/admin-courses.component';


@NgModule({
  declarations: [
    DashboardAdminComponent,
    AdminEventsComponent,
    AdminCoursesComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
  ],
  exports: [RouterModule]
})
export class AdminModule { }

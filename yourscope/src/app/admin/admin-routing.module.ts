import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminModule } from './admin.module';
import { Routes, RouterModule } from '@angular/router';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { AdminCoursesComponent } from './admin-courses/admin-courses.component';
import { AdminEventsComponent } from './admin-events/admin-events.component';

const routes: Routes = [
  {   path: 'admin',   component: DashboardAdminComponent},
  {   path: 'admin/courses',   component: AdminCoursesComponent},
  {   path: 'admin/events',   component: AdminEventsComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)  
  ],
  exports: [RouterModule]
})

export class AdminRoutingModule { }

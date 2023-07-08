import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router'; 
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { AdminEventsComponent } from './admin-events/admin-events.component';
import { AdminCoursesComponent } from './admin-courses/admin-courses.component';
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { CreateEventComponent } from './create-event/create-event.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardAdminComponent,
    AdminEventsComponent,
    AdminCoursesComponent,
    CreateEventComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatButtonModule,
    MatCardModule, 
    FormsModule,
  ],
  exports: [RouterModule],
  bootstrap: [AdminEventsComponent] 
})
export class AdminModule { }

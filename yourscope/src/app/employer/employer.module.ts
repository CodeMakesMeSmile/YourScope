import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployerRoutingModule } from './employer-routing.module';
import { DashboardEmployerComponent } from './dashboard-employer/dashboard-employer.component';
import { EmployerPostingComponent } from './employer-posting/employer-posting.component';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    DashboardEmployerComponent,
    EmployerPostingComponent,
  ],
  imports: [
    CommonModule,
    EmployerRoutingModule,
    NgbCollapse,
  ]
})
export class EmployerModule { }

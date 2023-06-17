import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardEmployerComponent } from './dashboard-employer/dashboard-employer.component';
import { EmployerPostingComponent } from './employer-posting/employer-posting.component';

const routes: Routes = [
  {path: 'employer', component: DashboardEmployerComponent},
  {path: 'employer/posting/:id', component: EmployerPostingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployerRoutingModule { }

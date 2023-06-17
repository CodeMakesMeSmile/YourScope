import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { RegisterStudentComponent } from './auth/register-student/register-student.component';
import { RegisterEmployerComponent } from './auth/register-employer/register-employer.component';
import { RegisterEmployerCompanyComponent } from './auth/register-employer-company/register-employer-company.component';
import { RegisterCompanyComponent } from './auth/register-company/register-company.component';

import { DashboardStudentComponent } from './student/dashboard-student/dashboard-student.component';
import { DashboardAdminComponent } from './admin/dashboard-admin/dashboard-admin.component';
import { DashboardEmployerComponent } from './employer/dashboard-employer/dashboard-employer.component';
import { PasswordResetComponent } from './auth/password-reset/password-reset.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboardStudent', component: DashboardStudentComponent },
  { path: 'dashboardAdmin', component: DashboardAdminComponent },
  { path: 'dashboardEmployer', component: DashboardEmployerComponent },
  { path: 'passwordReset', component: PasswordResetComponent}
]

@NgModule({
  declarations: [
    LandingComponent,
    LoginComponent,
    RegisterComponent,
    ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    RegisterStudentComponent,
    RegisterEmployerComponent,
    RegisterEmployerCompanyComponent,
    RegisterCompanyComponent,
    FormsModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

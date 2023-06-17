import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public regState: number = 0;

  loadStudentRegistration(){
    this.regState = 1;
  }

  loadEmployerCompanyRegistration(){
    this.regState = 2;
  }
}
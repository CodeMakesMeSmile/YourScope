import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.scss']
})
export class RegisterStudentComponent {
  public currDate = new Date().toLocaleDateString()
}

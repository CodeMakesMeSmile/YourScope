import { Component } from '@angular/core';

@Component({
  selector: 'app-student-toolkit',
  templateUrl: './student-toolkit.component.html',
  styleUrls: [
    './student-toolkit.component.scss',
    '../../admin/dashboard-admin/dashboard-admin.component.scss'
  ]
})
export class StudentToolkitComponent {
  // Display
  collapsed: boolean = false;
}

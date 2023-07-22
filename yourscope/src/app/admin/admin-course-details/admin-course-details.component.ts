import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-admin-course-details',
  templateUrl: './admin-course-details.component.html',
  styleUrls: ['./admin-course-details.component.scss']
})
export class AdminCourseDetailsComponent {
  @Input('course') selected : any = {};
}

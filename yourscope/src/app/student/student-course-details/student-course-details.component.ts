import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-student-course-details',
  templateUrl: './student-course-details.component.html',
  styleUrls: ['./student-course-details.component.scss']
})
export class StudentCourseDetailsComponent {
  @Input('course') selected : any = {};
  prerequisites = "";
  ngOnInit(){
    this.prerequisites = this.selected.prerequisites.trim().length > 0 ? this.selected.prerequisites.trim().replaceAll(",", " or ") : "None";
  }
}

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../course/course.component';

@Component({
  selector: 'app-year',
  templateUrl: './year.component.html',
  styleUrls: ['./year.component.scss']
})
export class YearComponent {
  // Constants
  scheduleYearPrefix: string = "scheduleYear";
  courseIndices = Array(8).fill(0).map((_, i) => i);
  // Class fields.
  grade: number = 0;
  // Properties
  @Input() year: any = undefined;
  @Output() onClickViewCourse = new EventEmitter<YearCourse>();
  @Output() onClickAddCourse = new EventEmitter<number>();
  // Initialization
  ngOnInit(): void {
    this.grade = this.year.yearNumber + 8;
  }
  onClickCourse(course: Course) {
    let result = new YearCourse(this.year.yearNumber, course);

    this.onClickViewCourse.emit(result);
  }

  onClickAdd() {
    this.onClickAddCourse.emit(this.year.yearNumber);
  }
}

export class YearCourse extends Course {
  yearNumber: number;

  constructor(yearNum: number, course: Course) {
    super(course.courseId, course.courseCode, course.name, course.description, course.discipline, course.credits, course.grade, course.prerequisites, course.type);

    this.yearNumber = yearNum;
  }
}

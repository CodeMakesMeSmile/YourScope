import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})

export class CourseComponent {
  @Input() course: Course | undefined = undefined;
  @Output() onClickCourse = new EventEmitter<Course>();
  @Output() onClickAdd = new EventEmitter<void>();

  onClick() {
    // If there is a course here.
    if (this.course) {
      this.onClickCourse.emit(this.course);
    }
    // If there is no course.
    else {
      this.onClickAdd.emit();
    }
  }
}

export class Course {
  courseId: number;
  courseCode: string;
  name: string;
  description: string;
  discipline: string;
  credits: number;
  grade: number;
  prerequisites: string;
  type: string;

  constructor(id: number, code: string, name: string, desc: string, disc: string, credits: number, grade: number, prereq: string, type: string) {
    this.courseId = id;
    this.courseCode = code;
    this.name = name;
    this.description = desc;
    this.discipline = disc;
    this.credits = credits;
    this.grade = grade;
    this.prerequisites = prereq;
    this.type = type;
  }
}


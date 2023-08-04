import { Component, OnInit } from '@angular/core';
import { APIService } from '../../services/api.service';
import { CookieService } from 'ngx-cookie-service';
import { JwtService } from 'src/app/services/jwt.service';
import { YearCourse } from '../year/year.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student-courses',
  templateUrl: './student-courses.component.html',
  styleUrls: ['./student-courses.component.scss']
})
export class StudentCoursesComponent {
  // Constants
  animationDuration: number = 150;
  // Class fields
  scheduleLoaded = false;
  showAddCourse = false;
  showViewCourse = false;
  // For animations
  viewCourseDiv = true;
  schedule: StudentSchedule = new StudentSchedule(-1, -1, []);
  viewCourse: YearCourse | null = null;
  selectedYear: number = -1;
  popup: boolean = false; 
  confirm: boolean = false;
  selected: any = {};

  // Constructor
  constructor(private api: APIService, private cookie: CookieService, private jwt: JwtService, private toastr: ToastrService) {}
  // Initialization
  async ngOnInit(): Promise<void> {
    // Getting the user information.
    const user = JSON.parse(this.cookie.get('userObject'));
    let userID = user.userId;

    let result = await this.api.getStudentSchedule(userID);

    if (result == undefined) {
      await this.api.createStudentSchedule(userID);
      result = await this.api.getStudentSchedule(userID);
    }

    // Setting the schedule object.
    this.schedule = result;
    this.scheduleLoaded = true;
  }
  // Methods
  onClickViewCourse(yearCourse: YearCourse) {
    this.viewCourse = yearCourse;
    this.showViewCourse = true;
    this.viewCourseDiv = true;
  }
  onClickAddCourse(yearNumber: number) {
    this.showAddCourse = true;
    this.viewCourseDiv = true;
    this.selectedYear = yearNumber;
  }
  onClickBackground(event: any) {
    if (event.target.classList.contains("overlayBackground")) {
      this.viewCourseDiv = false;
      setTimeout(() => this.closeOverlay(), this.animationDuration + 150);
    }
  }
  onClickClose() {
    this.viewCourseDiv = false;
    setTimeout(() => this.closeOverlay(), this.animationDuration + 150);
  }
  closeOverlay() {
    this.showAddCourse = false;
    this.showViewCourse = false;
  }
  onCourseDeleted() {
    // Toasting.
    this.toastr.success("Successfully dropped course!");
    // Closing the overlay.
    this.closeOverlay();
    // Reloading all the data.
    this.schedule = new StudentSchedule(-1, -1, []);
    this.scheduleLoaded = false;
    this.ngOnInit();
  }
  
  onCourseAdded() {
    // Toasting.
    this.toastr.success("Successfully added course!");
    // Closing the overlay.
    this.closeOverlay();
    // Reloading all the data.
    this.schedule = new StudentSchedule(-1, -1, []);
    this.scheduleLoaded = false;
    this.showAddCourse = false;
    this.popup = false;
    this.ngOnInit();
  }

  loadPopup(e: any) {
    this.popup = true;
    this.selected = e;
  }

  closePopup1() {
    this.popup = false;
    this.showAddCourse = false;
  }

  closePopup2(t: MouseEvent) {
    if ((t.target as Element).className == "close-popup") {
      this.popup = false
      this.showAddCourse = false;
    };

  }
}

export class StudentSchedule {
  scheduleId: number;
  studentId: number;
  years: Array<any>;

  constructor(scheduleId: number, studentId: number, years: Array<any>) {
    this.scheduleId = scheduleId;
    this.studentId = studentId;
    this.years = years;
  }
}

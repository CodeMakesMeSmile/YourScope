import { Component, Input, Output, EventEmitter } from '@angular/core';
import { YearCourse } from '../year/year.component';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { APIService } from 'src/app/services/api.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ top: "20%", opacity: 0 }),
            animate('0.15s ease-out',
                    style({ top: "25%", opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ top: "25%", opacity: 1 }),
            animate('0.15s ease-in',
                    style({ top: "20%", opacity: 0 }))
          ]
        )
      ]
    )
  ]
})

export class ViewCourseComponent {
  // Properties
  @Input() course: YearCourse | null = null;
  @Input() visible: boolean = false;
  @Input() animationDuration: number = 0;
  @Output() onClickCloseEvent = new EventEmitter<void>();
  @Output() onCourseDeleted = new EventEmitter<void>();
  // Class fields
  courseId: number = 0;
  courseCode: string = "";
  courseName: string = "";
  courseDescription: string = "";
  courseCredits: number = 0;
  courseType: string = "";
  courseDiscipline: string = "";
  coursePrereqs: string = "";
  yearNumber: number = 0;
  // For displays
  showConfirmationDialog: boolean = false;
  disableDrop: boolean = false;
  // Constructor.
  constructor (private api: APIService, private cookie: CookieService, private toastr: ToastrService) { }
  // Initialization
  ngOnInit(): void {
    if (this.course) {
      let prereqs = this.course.prerequisites;
      this.courseCode = this.course.courseCode;
      this.courseId = this.course.courseId;
      this.courseName = this.course.name;
      this.courseDescription = this.course.description;
      this.courseCredits = this.course.credits;
      this.courseType = this.course.type;
      this.courseDiscipline = this.course.discipline;
      this.coursePrereqs = prereqs.trim().length > 0 ? prereqs.trim().replaceAll(",", " or ") : "None";
      this.yearNumber = this.course.yearNumber;
    }
  }
  onClickCloseButton() {
    this.closeCourseView();
    setTimeout(() => this.onClickCloseEvent.emit(), this.animationDuration + 150);
  }

  closeCourseView() {
    this.visible = false;
  }

  onClickDropCourse() {
    this.disableDrop = true;
    this.showConfirmationDialog = true;
  }

  async onConfirmationDialogClick(result: boolean) {
    this.showConfirmationDialog = false;
    // If user clicked yes, then remove the course.
    if (result) {
      // Get the user's ID.
      let user = JSON.parse(this.cookie.get('userObject'));
      let userId = user.userId;
      // Calling API.
      let response;
      try {
        response = await this.api.deleteCourseFromSchedule(userId, this.yearNumber, this.courseId);
      }
      catch(error) {
        console.log(error);
        this.toastr.error("There was an internal error.");
      }
      // Closing the UI and reloading the schedule list.
      this.closeCourseView();
      setTimeout(() => this.onCourseDeleted.emit(), this.animationDuration + 150);
      return;
    }
    this.disableDrop = false;
  }
}

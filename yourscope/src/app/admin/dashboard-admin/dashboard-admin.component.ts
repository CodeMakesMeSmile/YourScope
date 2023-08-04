import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/services/api.service';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent implements OnInit {
  events: any[] = [];
  eventStates: boolean[] = [];
  courses: any[] = [];
  courseStates: boolean[] = [];
  selectedEvent: any = {};
  selectedCourse: any = {};
  confirmEvent: boolean = false;
  confirmCourse: boolean = false;

  constructor(private api: APIService, private cookie: CookieService, private jwt: JwtService, private toastr: ToastrService) { }

  token = this.jwt.DecodeToken(this.cookie.get("loginToken"));
  
  ngOnInit(): void {
    this.api.getEvents(20, 0, this.token.affiliationID, undefined).subscribe({
      next: res => {
        this.events = JSON.parse(JSON.stringify(res)).data;
        for (let i = 0; i < this.events.length; i++) {
          this.eventStates.push(false);
        }
      }, 
      error: err => {
        this.toastr.error("There was an internal error.");
      }
    });
    this.api.getCourses(this.token.affiliationID, undefined, undefined, undefined, 0, 20).subscribe({
      next: (res: any) => {
        this.courses = JSON.parse(JSON.stringify(res)).data;
        for (let i = 0; i < this.courses.length; i++) {
          this.courseStates.push(false);
        }
      },
      error: err => {
        this.toastr.error("There was an internal error.");
      }
    });
  }

  toggleEventState(index: number): void {
    this.eventStates[index] = !this.eventStates[index];
  }

  toggleCourseState(index: number): void {
    this.courseStates[index] = !this.courseStates[index];
  }

  deleteEvent(e: any){
    this.selectedEvent = e;
    this.confirmEvent = true;
  }

  confirmEventDeletion(result: boolean) {
    this.confirmEvent = false;
    if (result) {
      this.api.deleteEvent(this.selectedEvent.eventId).subscribe({
        next: res => {
          this.toastr.success("Successfully deleted event.");
          location.reload();
        }, 
        error: err => {
          this.toastr.error("There was an internal error.");
        }
      });
    }
  }

  deleteCourse(e: any){
    this.selectedCourse = e;
    this.confirmCourse = true;
  }

  confirmCourseDeletion(result: boolean) {
    this.confirmCourse = false;
    if (result) {
      this.api.deleteCourse(this.selectedCourse.courseId).subscribe({
        next: res => {
          this.toastr.success("Successfully deleted course.");
          location.reload();
        }, 
        error: err => {
          this.toastr.error("There was an internal error.");
        }
      });
    }
  }
}

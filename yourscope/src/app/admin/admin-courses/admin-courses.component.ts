import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { APIService } from 'src/app/services/api.service';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-admin-courses',
  templateUrl: './admin-courses.component.html',
  styleUrls: ['./admin-courses.component.scss']
})
export class AdminCoursesComponent {
  courses = <any> [];
  popup: boolean = false; 
  confirm: boolean = false;
  selected: any = {};
  currentPage: number = 1;
  totalPages: number = 0;

  constructor(private api: APIService, private cookie: CookieService, private jwt: JwtService) { }

  ngOnInit(): void {
    const token = this.jwt.DecodeToken(this.cookie.get("loginToken"));
    this.api.getCourseCount(token.affiliationID, undefined, undefined, undefined).subscribe((res: any) => {
      this.totalPages = Math.ceil(res.data / 12);
      console.log(this.totalPages);
    })
    this.updatePage();
  }

  deleteCourse(e: any){
    this.selected = e;
    this.confirm = true;
  }

  confirmDeletion(result: boolean) {
    this.confirm = false;
    if (result) {
      this.api.deleteCourse(this.selected.courseId).subscribe({
        next: res => {
          alert("Successfully deleted course.");
          this.updatePage();
        }, 
        error: err => {
          alert("Unable to delete event.");
        }
      });
    }
  }

  loadPopup(e: any) {
    this.popup = true;
    this.selected = e;
  }

  closePopup1() {
    this.popup = false;
  }

  closePopup2(t: MouseEvent) {
    if ((t.target as Element).className == "close-popup") this.popup = false;
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.updatePage();
  }

  onPageMove(increment: boolean) {
    if (this.totalPages == 0) {
      return;
    }
    if (increment) {
      if (this.currentPage == this.totalPages) {
        return;
      }
      this.currentPage++;
    } else {
      if (this.currentPage == 1) {
        return;
      }
      this.currentPage--;
    }
    this.updatePage();
  }

  updatePage() {
    const token = this.jwt.DecodeToken(this.cookie.get("loginToken"));
    this.api.getCourses(token.affiliationID, undefined, undefined, undefined, (this.currentPage - 1) * 12, 12).subscribe({
      next: (res: any) => {
        this.courses = res.data
      },
      error: err => {
        alert("Unable to retrieve events.");
      }
    });
  }
}

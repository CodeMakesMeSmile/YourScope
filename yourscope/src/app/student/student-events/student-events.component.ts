import { Component, OnInit } from '@angular/core';
import { APIService } from '../../services/api.service';
import { CookieService } from 'ngx-cookie-service';
import { JwtService } from 'src/app/services/jwt.service';

interface event {
  eventId: number,
  title: string,
  description: string,
  date: string,
  location: string,
  userId: number | null,
  user: number | null,
  schoolId: number | null,
  school: number | null
}

@Component({
  selector: 'app-student-events',
  templateUrl: './student-events.component.html',
  styleUrls: ['./student-events.component.scss']
})

export class StudentEventsComponent implements OnInit {
  popup : boolean = false; 
  selected : event = {eventId: -1, title: "", date: "", description: "", location: "", userId:  null, user:  null, schoolId:  null, school:  null};
  currentPage: number = 1;
  totalPages: number = 0;

  constructor(private api: APIService, private cookie: CookieService, private jwt: JwtService) {}

  loadPopup(e: event) {
    this.popup = true;
    this.selected = e;
  }

  closePopup1() {
    this.popup = false;
  }

  closePopup2(t: MouseEvent) {
    if ((t.target as Element).className == "close-popup") this.popup = false;
  }

  events: event[] = [];

  ngOnInit() {
    const token = this.jwt.DecodeToken(this.cookie.get("loginToken"));
    this.api.getEventCount(token.affiliationID, token.userID).subscribe((res: any) => {
      this.totalPages = Math.ceil(res.data / 12);
    });
    this.updatePage();
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
      if (this.currentPage == this.totalPages ) {
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
    this.api.getEvents(12, (this.currentPage - 1) * 12, token.affiliationID, undefined).subscribe({
      next: (res: any) => {
        this.events = res.data;
      },
      error: err => {
        alert("Unable to retrieve events.");
      }
    });
  }
}

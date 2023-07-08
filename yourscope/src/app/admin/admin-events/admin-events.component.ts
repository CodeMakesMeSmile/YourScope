import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { APIService } from 'src/app/services/api.service';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.scss']
})
export class AdminEventsComponent implements OnInit {

  constructor(private hc: APIService, private cookie: CookieService, private jwtService: JwtService) { }
  
  events = <any> [];
  empty = false;

  ngOnInit(): void {
    let loginToken = this.cookie.get("loginToken");
    let decodedToken = this.jwtService.DecodeToken(loginToken);

    this.hc.getEvents(0,10, undefined, decodedToken.userID).subscribe({
      next: res => {
        this.events = JSON.parse(JSON.stringify(res)).data;

        if (this.events.length != 0){
          for (let event in this.events){
            let date = this.events[event].date;
            date = new Date(date).toLocaleDateString('en-US'); 
            this.events[event].date = date;
          }
        } else {
          this.empty = true;
        }
        
      }, 
      error: err => {
        alert("Couldn't retrieve events" );
      }
    });
  }

  deleteEvent(id: number){
    this.hc.deleteEvent(id).subscribe({
      next: res => {
        alert("Successfully deleted event");
        location.reload();
      }, 
      error: err => {
        alert("Couldn't delete event");
      }
    });
  }
}


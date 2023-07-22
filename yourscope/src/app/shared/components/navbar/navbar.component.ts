import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/auth/auth.service';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  links: any[] = [];
  home: string = "#";
  collapsed: boolean = true;

  constructor(private cookie: CookieService, private jwt: JwtService, private auth: AuthService) {}
  
  ngOnInit(): void {
    const token = this.jwt.DecodeToken(this.cookie.get("loginToken"));
    if (token.role === 0) {
      this.home = "dashboardStudent";
      this.links = [
        {
          'label': "Profile",
          'href': "student/profile"
        },
        {
          'label': "Course Planning",
          'href': "student/courses"
        },
        {
          'label': "Toolkit",
          'href': "student/toolkit"
        },
        {
          'label': "Job Search",
          'href': "student/postings"
        },
        {
          'label': "School Events",
          'href': "student/events"
        },
      ];
    } else if (token.role === 1) {
      this.home = "dashboardAdmin";
    } else {
      this.home = "dashboardEmployer";
    }
  }

  dashboard(): void {
    const token = this.jwt.DecodeToken(this.cookie.get("loginToken"));
    this.auth.redirectToDashboard(token);
  }

  logout(): void {
    this.auth.logout();
  }
}
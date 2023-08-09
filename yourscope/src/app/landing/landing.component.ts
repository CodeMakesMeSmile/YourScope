import { Component } from '@angular/core';
import { APIService } from '../services/api.service';
import { CookieService } from 'ngx-cookie-service';
import { JwtService } from '../services/jwt.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../auth/auth.service';
import { CarouselElement } from '../shared/components/carousel/carousel.component';
import { UserRole } from '../auth/auth.service';
import { Router } from '@angular/router';
import * as AOS from "aos";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  // Class fields.
  title: string = 'yourscope';
  loggedIn: boolean = false;
  collapsed: boolean = false;
  user: User | undefined = undefined;
  carouselElements: Array<CarouselElement> = new Array<CarouselElement>();
  
  constructor(private api: APIService, private cookie: CookieService, private jwt: JwtService, private toastr: ToastrService, private router : Router) { }

  ngOnInit(): void {
    // Get the user's cookie and check if they're logged in.
    this.loggedIn = this.checkLoggedIn();
    // Initializing carousel elements.
    this.initCarouselElements();
    // Initializing AOS.
    AOS.init({
      duration: 500,
      delay: 150
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      AOS.refresh()
    }, 100)
  }

  checkLoggedIn(): boolean {
    let token: string = this.cookie.get('loginToken');
    if (token.length == 0) {
      //  Clearing cookies.
      this.clearLoginCookies();

      return false;
    }

    let tokenInfo = this.jwt.DecodeToken(token);
    // Check if the token is expired.
    let expireSecs = tokenInfo.exp;
    // If the JWT does not have an expiry date.
    if (expireSecs == undefined || expireSecs == null) {
      this.toastr.error("Please login again.");
      // Clearing cookies.
      this.clearLoginCookies();

      return false;
    }
    const expireDate = new Date(0);
    expireDate.setUTCSeconds(expireSecs);
    const today =  new Date(Date.now());
    
    // If the token is expired.
    if (today > expireDate) {
      this.toastr.warning("Your login session has expired. Please login again.");
      // Clearing cookies.
      this.clearLoginCookies();

      return false;
    }
    // Setting the user object in component.
    let result = this.setUserObject();
    if (result === false) {
      this.toastr.error("Please login again.");
      // Clearing cookies.
      this.clearLoginCookies();
      return false;
    }

    return true;
  }

  clearLoginCookies(): void {
    this.cookie.delete('loginToken');
    this.cookie.delete('userObject');
  }

  setUserObject(): boolean {
    let user = this.getUserObject();
    if (user === undefined) return false;

    this.user = user;
    return true;
  }

  getUserObject(): User | undefined {
    // Getting the JSON string from the cookies
    let userString = this.cookie.get('userObject');
    if (userString.length === 0) return undefined;

    // Parsing and returning the user object
    return JSON.parse(userString);
  }

  initCarouselElements(): void {
    this.carouselElements.push(new CarouselElement("../../assets/landing/carousel/01.jpg", "Students giving thumbs up", `"Your Success is Our Success"`, "- YourScope Team"));
    this.carouselElements.push(new CarouselElement("../../assets/landing/carousel/02.jpg", "Student writing in a notebook", "Made For Highschool Students", "Helping You Get Back on Track"));
    this.carouselElements.push(new CarouselElement("../../assets/landing/carousel/03.jpg", "Students using a computer", "Powerful Tools to Help You Succeed", "Course Planner, Events Tracker, Job Board, and More!"));
  }

  onClickDashboard() {
    // Redirecting the user to the proper dashbaord.
    switch (this.user?.role) {
      case UserRole.Student:
        this.router.navigate(['/dashboardStudent']);
        break;
      case UserRole.Admin:
        this.router.navigate(['/dashboardAdmin']);
        break;
      case UserRole.Employer:
        this.router.navigate(['/dashboardEmployer']);
        break;
      case null:
        this.toastr.error("There was an unexpected error.");
        console.log(`User role is not accounted for. Current user has no role.`);
        break;
      case undefined:
        this.toastr.error("There was an unexpected error.");
        console.log(`User role is not accounted for. Current user has no role.`);
        break;
      default:
        this.toastr.error("There was an unexpected error.");
        console.log(`User role is not accounted for. Current user has role with ID ${this.user?.role}`);
        break;
    }
  }
}

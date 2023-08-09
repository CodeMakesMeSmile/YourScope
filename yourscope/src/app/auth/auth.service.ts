import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from '../services/api.service';
import { JwtService } from '../services/jwt.service';
import { CookieService } from 'ngx-cookie-service';
import { firstValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private router: Router,
              private service : APIService,
              private jwtService : JwtService,
              private cookieService: CookieService,
              private api: APIService,
              private toastr: ToastrService)  { }

  async login(email: string, password: string): Promise<number | null> {
    let response;
    try {
      response = await firstValueFrom(this.service.getLogin(email, password));
    }
    catch(err: any) {
      // Logging the error.
      console.log(err);

      // Returning the error status code or null  if not API error.
      if (err.status)
        return err.status;
      else 
        return null;
    }

    let loginData = JSON.parse(JSON.stringify(response));
    let loginToken = this.jwtService.DecodeToken(loginData.data);
    this.cookieService.set('loginToken', `Bearer ${loginData.data}`);

    await this.setUserObject(loginToken);

    this.redirectToDashboard(loginToken);

    return 201;
  }

  async logout(): Promise<void> {
    if (this.cookieService.check('loginToken')) {
      await this.deleteCookie('loginToken');
    }

    if (this.cookieService.check('userObject')) {
      await this.deleteCookie('userObject');
    }

    this.router.navigate(['/']);
  }

  private deleteCookie(cookieName: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.cookieService.delete(cookieName);
      resolve();
    });
  }
  
  passwordReset(email: string) {
    this.service.passwordReset(email);
  }

  redirectToDashboard(loginToken: any) {
    if (loginToken.role === 0) {
      this.api.getProfile(loginToken.userID).subscribe({
        next: res => {
            if (JSON.parse(JSON.stringify(res)).statusCode == 204) {
            this.router.navigate(['/student/create-profile'])
          } else {
            this.router.navigate(['/dashboardStudent']);
          }
        },
        error: err => {
          this.toastr.error("There was an internal error.");
        }
      });
    } else if (loginToken.role === 1) {
      this.router.navigate(['/dashboardAdmin']);
    } else {
      this.router.navigate(['/dashboardEmployer']);
    }
  }

  async setUserObject(loginToken: any): Promise<void> {
    let user = await this.service.getUser(loginToken.userID);

    this.cookieService.set('userObject',  JSON.stringify(user), loginToken.exp);
  }
}

export class User {
  userId: number;
  email: string;
  firstName: string;
  middleName: string | undefined;
  lastName: string;
  birthday: Date;
  role: number;
  affiliation: string;
  affiliationID: number | undefined;
  grade: number;

  constructor(id: number, email: string, firstName: string, middleName: string | undefined, lastName: string, birthday: Date, role: number, affiliation: string, affiliationID: number, grade: number) {
    this.userId = id;
    this.email = email;
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.birthday = birthday;
    this.role = role;
    this.affiliation = affiliation;
    this.affiliationID = affiliationID;
    this.grade = grade;
  }
}

export enum UserRole {
  Student = 0,
  Admin,
  Employer
}

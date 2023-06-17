import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from '../services/api.service';
import { JwtService } from '../services/jwt.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private router : Router, private service : APIService, private jwtService : JwtService)  { }

  login(email: string, password: string) {
    this.service.getLogin(email, password).subscribe({
      next: res => {
        let loginToken = this.jwtService.DecodeToken(res.toString());
        if(loginToken.role === 0){
          this.router.navigate(['/dashboardStudent']);
        }
        else if(loginToken.role === 1){
          this.router.navigate(['/dashboardAdmin']);
        }
        else{
          this.router.navigate(['/dashboardEmployer']);
        }
      }, 
      error: err => {
        alert(err.error);
      }
    });
  }
  
  passwordReset(email: string) {
    this.service.passwordReset(email).subscribe({
      next: res => {
        alert("Email sent");
        this.router.navigate(['/login']);
      }, 
      error: err => {
        alert(err.error);
      }
    });
  }
}

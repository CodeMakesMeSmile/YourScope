import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from '../../services/api.service';
import { CookieService } from 'ngx-cookie-service';
import { JwtService } from 'src/app/services/jwt.service';

interface profile {
  profileId: number,
  user: {
    email: string,
    firstName: string,
    middleName: string,
    lastName: string,
    birthday: string,
    role: number,
    affiliation: string,
    affiliationID: number,
    grade: number,
  }
  coverLetters: [],
  experiences: [],
  skills: string,
  intrestsHobbies: string,
  awards: string
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  constructor(private router: Router, private cookie: CookieService, private api: APIService, private jwt: JwtService){}
  student_profile : profile = {profileId: -1, user: {email: "", firstName: "", middleName: "", lastName: "", birthday: "", role: -1, affiliation: "", affiliationID: -1, grade: -1}, coverLetters: [], experiences: [], skills: "", intrestsHobbies: "", awards: ""};

  num_experiences = -1;
  num_cover = -1;

  ngOnInit() {
    const token = this.jwt.DecodeToken(this.cookie.get("loginToken"));
    this.api.getProfile(token.userID).subscribe((res: any) => {
      if (res.statusCode == 200){
        this.student_profile = res.data
        this.num_experiences = this.student_profile.experiences.length;
        this.num_cover = this.student_profile.coverLetters.length;

        console.log(this.student_profile);

        let date = this.student_profile.user.birthday;
        date = new Date(date).toLocaleDateString('en-US'); 
        this.student_profile.user.birthday = date;


      } else{
        this.router.navigate(['/student/create-profile']);
      }
    });
  }
}

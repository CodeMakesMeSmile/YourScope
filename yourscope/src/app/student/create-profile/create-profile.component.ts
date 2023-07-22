import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { APIService } from '../../services/api.service';
import { CookieService } from 'ngx-cookie-service';
import { JwtService } from 'src/app/services/jwt.service';
import { Router } from '@angular/router';

interface profile {
  profileId: number,
  user: {
    email: string,
    firstName: string,
    middleName: string,
    lastName: string,
    birthday: string,
    school: string,
    grade: number,
    coverLetters: [],
    experiences: [],
    skills: string,
    intrestsHobbies: string,
    awards: string
  }
}

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent{
  constructor(private formBuilder: FormBuilder, private cookie: CookieService, private api: APIService, private jwt: JwtService, private router: Router){}

  add_exp = false;
  num_exp = 0;
  experiences = Array(this.num_exp);
  student_profile : profile = {profileId: -1, user: {email: "", firstName: "", middleName: "", lastName: "", birthday: "", school: "",grade: -1, coverLetters: [], experiences: [], skills: "", intrestsHobbies: "", awards: ""}};

  exp_form = this.formBuilder.group({
    start: '',
    end: '',
    position: '',
    company:'',
    location: '',
    description: ''
  }
  )

  about_form = this.formBuilder.group({
    skills: '',
    hobbies: '',
    awards: '',
  }
  )

  addExperience(){
    this.add_exp =true;
    this.num_exp++;

    this.exp_form.reset();
  }

  submitProfile(){
    console.log("pain")
    this.api.createProfile(this.about_form.value.skills, this.about_form.value.hobbies, this.about_form.value.awards).subscribe({
      next: res => {
        alert("Successfully added profile");
        this.router.navigate(['/student/profile'])
      }, 
      error: err => {
        alert(err.error);
      }
    });
  }
}

import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { APIService } from '../../services/api.service';
import { AuthService } from 'src/app/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

class UserObj {
  Email!: string;
  FirstName!: string;
  MiddleName!: string | null;
  LastName!: string;
  Birthday!: string | null;
  Role!: number;
  Affiliation!: string;
  Grade!: number | null;
  Password!: string;

  constructor(a: string, b: string, c: string | null, d: string, e: string | null, f: number, g: string, h: number | null, i: string) {
    this.Email = a;
    this.FirstName = b;
    this.MiddleName = c;
    this.LastName = d;
    this.Birthday = e;
    this.Role = f;
    this.Affiliation = g;
    this.Grade = h;
    this.Password = i;
  }
}

class School {
  schoolId: number;
  name: string;
  address: string | undefined;

  constructor(id: number, name: string, address: string | undefined) {
    this.schoolId = id;
    this.name = name;
    this.address = address;
  }
}

@Component({
  standalone: true,
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.scss'],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ]
})

export class RegisterStudentComponent {
  schools: School[] = [];
  // Form validation
  validFName: boolean = true;
  validLName: boolean = true;
  validEmail: boolean = true;
  validPassword: boolean = true;
  validCPassword: boolean = true;
  validSchool: boolean = true;
  validGrade: boolean = true;
  validBirthday: boolean = true;
  formErrorStr: string = "";

  constructor(private api: APIService, private auth: AuthService, private toastr: ToastrService) { }

  public studentForm = new FormGroup({
    fname: new FormControl(),
    //mname: new FormControl(),
    lname: new FormControl(),
    email: new FormControl(),
    pass: new FormControl(),
    cpass: new FormControl(),
    school: new FormControl(),
    grade: new FormControl(),
    birthday: new FormControl()
  })

  ngAfterViewInit(): void {
    this.fetchAllSchools();
  }

  validateAndSubmit(): void {
    let pass, cpass;
    let checkExistsUrl = "https://localhost:7184/api/accounts/v1/check-registered/";
    const emailRegEx: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    // Required fields validation.
    if (!this.studentForm.get("fname")!.value) {
      if (!this.formErrorStr)
        this.formErrorStr = "Missing highlighted required fields.";
      this.validFName = false;
    };
    if (!this.studentForm.get("lname")!.value) {
      if (!this.formErrorStr)
        this.formErrorStr = "Missing highlighted required fields.";
      this.validLName = false;
    };
    if (!this.studentForm.get("email")!.value) {
      if (!this.formErrorStr)
        this.formErrorStr = "Missing highlighted required fields.";
      this.validEmail = false;
    }
    else {
      checkExistsUrl += this.studentForm.get("email")!.value;
    };
    if (!this.studentForm.get("school")!.value) {
      if (!this.formErrorStr)
        this.formErrorStr = "Missing highlighted required fields.";
      this.validSchool = false;
    };
    if (!this.studentForm.get("grade")!.value) {
      if (!this.formErrorStr)
        this.formErrorStr = "Missing highlighted required fields.";
      this.validGrade = false;
    };
    if (!this.studentForm.get("birthday")!.value) {
      if (!this.formErrorStr)
        this.formErrorStr = "Missing highlighted required fields.";
      this.validBirthday = false;
    };
    // Email validation.
    if (!emailRegEx.test(this.studentForm.get("email")!.value)) {
      this.validEmail = false;
      if (!this.formErrorStr)
        this.formErrorStr = "Please enter a valid email.";
    }
    // Password validation.
    if (this.studentForm.get("pass")!.value && (this.studentForm.get("pass")!.value as string).length > 5)
      pass = this.studentForm.get("pass")!.value;
    else if (!this.studentForm.get("pass")!.value) {
      if (!this.formErrorStr)
        this.formErrorStr = "Missing highlighted required fields.";
      this.validPassword = false;
    }
    else {
      if (!this.formErrorStr)
        this.formErrorStr = "Password must be longer than 5 characters.";
      this.validPassword = false;
    }
    if (this.studentForm.get("cpass")!.value)
      cpass = this.studentForm.get("cpass")!.value;
    else {
      if (!this.formErrorStr)
        this.formErrorStr = "Missing highlighted required fields.";
      this.validCPassword = false;
    };
    if (pass != cpass) {
      if (!this.formErrorStr)
        this.formErrorStr = "Passwords do not match.";
      this.validPassword = false;
      this.validCPassword = false;
    };

    if (!(this.validFName && this.validLName && this.validEmail && this.validPassword && this.validCPassword && this.validSchool && this.validGrade && this.validBirthday))
      return;

    this.api.get(checkExistsUrl).subscribe({
      next: res => {
        let response = JSON.parse(JSON.stringify(res));

        if (response.data) {
          this.validEmail = false;
          this.formErrorStr = "Email has already been registered!";
        }
        else {
          this.postStudentRegistration();
        }
      },
      error: err => {
        console.log(err);
        this.toastr.error("There was an internal error.");
      }
    })
  }

  clearFormNotifications() {
    this.validFName = true;
    this.validLName = true;
    this.validEmail = true;
    this.validPassword = true;
    this.validCPassword = true;
    this.validSchool = true;
    this.validGrade = true;
    this.validBirthday = true;
    this.formErrorStr = "";
  }

  handleStudentRegistration() {
    this.clearFormNotifications();
    this.validateAndSubmit();
  }

  postStudentRegistration() {
    const url = 'https://localhost:7184/api/accounts/v1/student/register';
    const user = new UserObj(
      this.studentForm.get("email")!.value,
      this.studentForm.get("fname")!.value,
      "",
      this.studentForm.get("lname")!.value,
      this.studentForm.get("birthday")!.value,
      0,
      this.studentForm.get("school")!.value,
      this.studentForm.get("grade")!.value,
      this.studentForm.get("pass")!.value
    );

    this.api.post(url, user).subscribe(() => {
      this.auth.login(this.studentForm.get("email")!.value, this.studentForm.get("pass")!.value);
    });
  }

  populateSchoolList(schools : School[]): void {
    this.schools = schools;
  }

  fetchAllSchools() : void {
    const url = 'https://localhost:7184/api/schools/v1';
    var component = this;

    this.api.get(url).subscribe({
      next: res => {
        let response = JSON.parse(JSON.stringify(res));
        component.populateSchoolList(response.data);
      },
      error: err => {
        console.log(err);
        this.toastr.error("There was an internal error.");
      }
    });
  }
}

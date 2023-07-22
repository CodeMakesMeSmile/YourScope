import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { APIService } from '../../services/api.service';
import { AuthService } from '../auth.service';

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

class CompanyObj {
  CompanyName!: string;
  Country!: string;
  City!: string;
  Address!: string;
  UnitNumber!: number | null;
  Phone!: string | null;
  Fax!: string | null;
  Email!: string;
  Type!: string | null;

  constructor(a: string, b: string, c: string, d: string, e: number | null, f: string | null, g: string | null, h: string, i: string | null) {
    this.CompanyName = a;
    this.Country = b;
    this.City = c;
    this.Address = d;
    this.UnitNumber = e;
    this.Phone = f;
    this.Fax = g;
    this.Email = h;
    this.Type = i;
  }
}

@Component({
  standalone: true,
  selector: 'app-register-employer',
  templateUrl: './register-employer.component.html',
  styleUrls: ['./register-employer.component.scss'],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ]
})
export class RegisterEmployerComponent {
  // Form validation
  validFName: boolean = true;
  validLName: boolean = true;
  validEmail: boolean = true;
  validPassword: boolean = true;
  validCPassword: boolean = true;
  formErrorStr: string = "";

  constructor(private api: APIService, private auth: AuthService) { }

  public employerForm = new FormGroup({
    fname: new FormControl(),
    mname: new FormControl(),
    lname: new FormControl(),
    email: new FormControl(),
    pass: new FormControl(),
    cpass: new FormControl()
  })

  validateAndSubmit(): void {
    let pass, cpass;
    let checkExistsUrl = "https://localhost:7184/api/accounts/v1/check-registered/";
    const emailRegEx: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    // Required fields validation.
    if (!this.employerForm.get("fname")!.value) {
      if (!this.formErrorStr)
        this.formErrorStr = "Missing highlighted required fields.";
      this.validFName = false;
    }
    if (!this.employerForm.get("lname")!.value) {
      if (!this.formErrorStr)
        this.formErrorStr = "Missing highlighted required fields.";
      this.validLName = false;
    };
    if (!this.employerForm.get("email")!.value ) {
      if (!this.formErrorStr)
        this.formErrorStr = "Missing highlighted required fields.";
      this.validEmail = false;
    }
    else {
      checkExistsUrl += this.employerForm.get("email")!.value;
    };
    // Email validation.
    if (!emailRegEx.test(this.employerForm.get("email")!.value)) {
      this.validEmail = false;
      if (!this.formErrorStr)
        this.formErrorStr = "Please enter a valid email.";
    }
    // Password validation.
    if (this.employerForm.get("pass")!.value && (this.employerForm.get("pass")!.value as string).length > 5)
      pass = this.employerForm.get("pass")!.value;
    else if (!this.employerForm.get("pass")!.value) {
      if (!this.formErrorStr)
        this.formErrorStr = "Missing highlighted required fields.";
      this.validPassword = false;
    }
    else {
      if (!this.formErrorStr)
        this.formErrorStr = "Password must be longer than 5 characters.";
      this.validPassword = false;
    }
    if (this.employerForm.get("cpass")!.value)
      cpass = this.employerForm.get("cpass")!.value;
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
    }

    if (!(this.validFName && this.validLName && this.validEmail && this.validPassword && this.validCPassword))
      return;

    this.api.get(checkExistsUrl).subscribe({
      next: res => {
        let response = JSON.parse(JSON.stringify(res));

        if (response.data) {
          this.validEmail = false;
          this.formErrorStr = "Email has already been registered.";
        }
        else {
          this.postCompanyAndEmployerRegistration();
        }
      },
      error: err => {
        console.log(err);
      }
    })
  }

  handleEmployerRegistration() {
    this.clearFormNotifications();

    this.validateAndSubmit();
  }

  postCompanyAndEmployerRegistration(): void {
    const url = 'https://localhost:7184/api/accounts/v1/employer/register';
    const user = new UserObj(
      this.employerForm.get("email")!.value,
      this.employerForm.get("fname")!.value,
      this.employerForm.get("mname")!.value,
      this.employerForm.get("lname")!.value,
      null,
      2,
      localStorage.getItem("companyName")!,
      null,
      this.employerForm.get("pass")!.value
    );

    const createCompany = localStorage.getItem("createCompany");
    if (createCompany != null) {
      const company_url = 'https://localhost:7184/api/company/v1/register';
      const jsn = JSON.parse(createCompany);
      var company = new CompanyObj(
        jsn.Name,
        jsn.Country,
        jsn.City,
        jsn.Address,
        jsn.UnitNumber,
        jsn.Phone,
        jsn.Fax,
        jsn.Email,
        jsn.Type
      );
      this.api.post(company_url, company).subscribe(res => {
        localStorage.removeItem("createCompany");
        this.api.post(url, user).subscribe(res => {
          localStorage.removeItem("companyName");
          this.auth.login(this.employerForm.get("email")!.value, this.employerForm.get("pass")!.value);
        });
      });
    }
    else {
      this.api.post(url, user).subscribe(res => {
        console.log(res);
        localStorage.removeItem("companyName");
        this.auth.login(this.employerForm.get("email")!.value, this.employerForm.get("pass")!.value);
      });
    }
  }

  clearFormNotifications() {
    this.validFName = true;
    this.validLName = true;
    this.validEmail = true;
    this.validPassword = true;
    this.validCPassword = true;
    this.formErrorStr = "";
  }
}

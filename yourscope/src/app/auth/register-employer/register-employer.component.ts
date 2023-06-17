import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { APIService } from '../../services/api.service';
import { Router } from '@angular/router';

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

  constructor(private api: APIService, private router: Router) { }

  public employerForm = new FormGroup({
    fname: new FormControl(),
    mname: new FormControl(),
    lname: new FormControl(),
    email: new FormControl(),
    pass: new FormControl(),
    cpass: new FormControl()
  })

  handleEmployerRegistration() {
    let pass, cpass;

    if (this.employerForm.get("fname")!.value == null) return;
    if (this.employerForm.get("lname")!.value == null) return;
    if (this.employerForm.get("email")!.value == null) return;
    if (this.employerForm.get("pass")!.value != null && (this.employerForm.get("pass")!.value as string).length > 5) pass = this.employerForm.get("pass")!.value;
    else return;
    if (this.employerForm.get("cpass")!.value != null && (this.employerForm.get("cpass")!.value as string).length > 5) cpass = this.employerForm.get("cpass")!.value;
    else return;
    if (pass != cpass) {console.log(pass, cpass); return;}

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
        console.log(res);
        localStorage.removeItem("createCompany");
        this.api.post(url, user).subscribe(res => {
          console.log(res);
          localStorage.removeItem("companyName");
          this.router.navigate(['/dashboardEmployer']);
        });
      });
    }
    else {
      this.api.post(url, user).subscribe(res => {
        console.log(res);
        localStorage.removeItem("companyName");
        this.router.navigate(['/dashboardEmployer']);
      });
    }
  }
}

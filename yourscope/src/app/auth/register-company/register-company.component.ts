import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RegisterEmployerComponent } from '../register-employer/register-employer.component';
import { APIService } from '../../services/api.service';
class CompanyObj {
  Name!: string;
  Country!: string;
  City!: string;
  Address!: string;
  UnitNumber!: number | null;
  Phone!: string | null;
  Fax!: string | null;
  Email!: string;
  Type!: string | null;

  constructor(a: string, b: string, c: string, d: string, e: number | null, f: string | null, g: string | null, h: string, i: string | null) {
    this.Name = a;
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
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.scss'],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RegisterEmployerComponent
  ]
})
export class RegisterCompanyComponent {
  // Form validation
  validName: boolean = true;
  validEmail: boolean = true;
  validAddress: boolean = true;
  validCity: boolean = true;
  validCountry: boolean = true;
  formErrorStr: string = "";

  public regState: number = 0;

  constructor(private api: APIService) { }

  public companyForm = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
    addr: new FormControl(),
    unit: new FormControl(),
    city: new FormControl(),
    country: new FormControl(),
    tel: new FormControl(),
    fax: new FormControl()
  });

  validateAndSubmit(): void {
    let checkExistsUrl = "https://localhost:7184/api/company/v1/check-company-exist/";

    const emailRegEx: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    // Required fields validation.
    if (!this.companyForm.get("name")!.value) {
      if (!this.formErrorStr)
        this.formErrorStr = "Missing highlighted required fields.";
      this.validName = false;
    }
    else {
      checkExistsUrl += this.companyForm.get("name")!.value;
    }
    if (!this.companyForm.get("email")!.value) {
      if (!this.formErrorStr)
        this.formErrorStr = "Missing highlighted required fields.";
      this.validEmail = false;
    }
    if (!this.companyForm.get("addr")!.value) {
      if (!this.formErrorStr)
        this.formErrorStr = "Missing highlighted required fields.";
      this.validAddress = false;
    }
    if (!this.companyForm.get("city")!.value) {
      if (!this.formErrorStr)
        this.formErrorStr = "Missing highlighted required fields.";
      this.validCity = false;
    }
    if (!this.companyForm.get("country")!.value) {
      if (!this.formErrorStr)
        this.formErrorStr = "Missing highlighted required fields.";
      this.validCountry = false;
    }
    // Email validation.
    if (!emailRegEx.test(this.companyForm.get("email")!.value)) {
      this.validEmail = false;
      if (!this.formErrorStr)
        this.formErrorStr = "Please enter a valid email.";
    }

    if (!(this.validName && this.validEmail && this.validEmail && this.validAddress && this.validCity && this.validCountry))
      return;

    // Company name exists validation.
    this.api.get(checkExistsUrl).subscribe({
      next: res => {
        let response = JSON.parse(JSON.stringify(res));

        if (response.data) {
          this.validName = false;
          this.formErrorStr = "A company with this name is already registered."
        }
        else {
          this.progressEmployerRegistration();
        }
      },
      error: err => {
        console.log(err);
      }
    })
  }

  clearFormNotifications(): void {
    this.validName = true;
    this.validEmail = true;
    this.validAddress = true;
    this.validCity = true;
    this.validCountry = true;
    this.formErrorStr = "";
  }

  handleCompanyRegistration(): void {
    this.clearFormNotifications();

    this.validateAndSubmit();
  }

  progressEmployerRegistration(): void {
    const company = new CompanyObj(
      this.companyForm.get("name")!.value,
      this.companyForm.get("country")!.value,
      this.companyForm.get("city")!.value,
      this.companyForm.get("addr")!.value,
      this.companyForm.get("unit")!.value,
      this.companyForm.get("tel")!.value,
      this.companyForm.get("fax")!.value,
      this.companyForm.get("email")!.value,
      null
    );

    localStorage.setItem("companyName", this.companyForm.get("name")!.value);
    localStorage.setItem("createCompany", JSON.stringify(company));
    this.regState = 1;
  }
}

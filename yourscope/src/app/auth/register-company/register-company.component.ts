import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RegisterEmployerComponent } from '../register-employer/register-employer.component';

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
  public regState: number = 0;

  constructor() { }

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

  handleCompanyRegistration() {
    if (this.companyForm.get("name")!.value == null) return;
    if (this.companyForm.get("email")!.value == null) return;
    if (this.companyForm.get("addr")!.value == null) return;
    if (this.companyForm.get("city")!.value == null) return;
    if (this.companyForm.get("country")!.value == null) return;

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

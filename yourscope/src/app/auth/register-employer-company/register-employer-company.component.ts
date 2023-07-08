import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { take, takeUntil } from 'rxjs/operators';
import { RegisterEmployerComponent } from '../register-employer/register-employer.component';
import { RegisterCompanyComponent } from '../register-company/register-company.component';
import { APIService } from '../../services/api.service';

interface Company {
  companyID: number;
  companyName: string;
  phone: string;
  fax: string;
  email: string;
  type: string;
  unitNumber: number;
  address: string;
  city: string;
  country: string;
}

@Component({
  standalone: true,
  selector: 'app-register-employer-company',
  templateUrl: './register-employer-company.component.html',
  styleUrls: ['./register-employer-company.component.scss'],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
    RegisterEmployerComponent,
    RegisterCompanyComponent
  ]
})
export class RegisterEmployerCompanyComponent implements AfterViewInit, OnDestroy, OnInit {
  public regState: number = 0;
  public selected: string = "";

  protected companies: Company[] = [];

  public companyControl: FormControl = new FormControl();
  public companyFilter: FormControl = new FormControl();
  public filteredCompanies: ReplaySubject<any> = new ReplaySubject();

  protected _onDestroy = new Subject();
  constructor(private api: APIService) { }

  selectedCompany(event: MatSelectChange) {
    this.selected = event.source.triggerValue;
    if (this.selected != "" && this.selected != null && this.selected != "Select Company") this.regState = 0;
  }

  ngOnInit() {
    this.fetchAllCompanies();

    this.companyControl.setValue(this.companies[1]);
    this.filteredCompanies.next(this.companies.slice());

    this.companyFilter.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterCompanies();
      });
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next(0);
    this._onDestroy.complete();
  }

  protected setInitialValue() {
    this.filteredCompanies.pipe(take(1), takeUntil(this._onDestroy));
  }

  protected filterCompanies() {
    if (!this.companies) {
      return;
    }

    let search = this.companyFilter.value;
    if (!search) {
      this.filteredCompanies.next(this.companies.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    this.filteredCompanies.next(
      this.companies.filter(company => company.companyName.toLowerCase().indexOf(search) > -1)
    );
  }

  loadEmployerRegistration() {
    if (this.selected != "" && this.selected != null && this.selected != "Select Company") {
      localStorage.setItem("companyName", this.selected);

      this.regState = 1;
    }
    else this.regState = 3;
  }

  loadCompanyRegistration() {
    this.regState = 2;
  }

  fetchAllCompanies(): void {
    const url = 'https://localhost:7184/api/company/v1';

    this.api.get(url).subscribe({
      next: res => {
        let response = JSON.parse(JSON.stringify(res));
        this.populateCompanyDropdown(response.data);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  populateCompanyDropdown(companies: Company[]) {
    this.companies = companies;
    this.filterCompanies();
  }
}

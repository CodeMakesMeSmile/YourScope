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

interface Company {
  name: string;
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

  protected companies: Company[] = [ // Temporary data. currently no endpoint to return a query yet
    {name:'company 1', phone:'', fax:'', email:'', type:'', unitNumber:0, address:'', city:'', country:''},
    {name:'company 2', phone:'', fax:'', email:'', type:'', unitNumber:0, address:'', city:'', country:''},
    {name:'Google Inc.', phone:'', fax:'', email:'', type:'', unitNumber:0, address:'', city:'', country:''},
    {name:'Microsoft Corp.', phone:'', fax:'', email:'', type:'', unitNumber:0, address:'', city:'', country:''},
    {name:'Microsoft Corp. 1', phone:'', fax:'', email:'', type:'', unitNumber:0, address:'', city:'', country:''},
    {name:'Microsoft Corp. 2', phone:'', fax:'', email:'', type:'', unitNumber:0, address:'', city:'', country:''},
    {name:'Microsoft Corp. 3', phone:'', fax:'', email:'', type:'', unitNumber:0, address:'', city:'', country:''},
    {name:'Microsoft Corp. 4', phone:'', fax:'', email:'', type:'', unitNumber:0, address:'', city:'', country:''},
    {name:'Microsoft Corp. 5', phone:'', fax:'', email:'', type:'', unitNumber:0, address:'', city:'', country:''},
    {name:'Microsoft Corp. 6', phone:'', fax:'', email:'', type:'', unitNumber:0, address:'', city:'', country:''},
    {name:'Microsoft Corp. 7', phone:'', fax:'', email:'', type:'', unitNumber:0, address:'', city:'', country:''},
    {name:'Microsoft Corp. 8', phone:'', fax:'', email:'', type:'', unitNumber:0, address:'', city:'', country:''}
  ];

  public companyControl: FormControl = new FormControl();
  public companyFilter: FormControl = new FormControl();
  public filteredCompanies: ReplaySubject<any> = new ReplaySubject();

  protected _onDestroy = new Subject();
  constructor() { }

  selectedCompany(event: MatSelectChange) {
    this.selected = event.source.triggerValue;
    if (this.selected != "" && this.selected != null && this.selected != "Select Company") this.regState = 0;
  }

  ngOnInit() {
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
      this.companies.filter(company => company.name.toLowerCase().indexOf(search) > -1)
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
}

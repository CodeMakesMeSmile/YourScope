import { HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { APIService } from 'src/app/services/api.service';
import { JwtService } from 'src/app/services/jwt.service';
import { environment } from 'src/environments/environment';
import settings from '../../../appsettings.json';

interface coverLetter {
  resumeId : number,
  intro : string,
  salesPitch1 : string,
  salesPitch2 : string,
  salesPitch3 : string,
  conclusion : string
}

@Component({
  standalone: true,
  selector: 'app-student-application',
  templateUrl: './student-application.component.html',
  styleUrls: ['./student-application.component.scss'],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule
  ]
})
export class StudentApplicationComponent implements OnInit {
  @Input() selected: any = {};
  public profile: any = {};
  public cov: any = {};
  public create: boolean = false;

  protected coverLetters: coverLetter[] = [];
  
  public coverControl: FormControl = new FormControl();
  public coverFilter: FormControl = new FormControl();
  public filteredCovers: ReplaySubject<any> = new ReplaySubject();

  protected _onDestroy = new Subject();

  public applicationForm = new FormGroup({
    intro: new FormControl(),
    salesPitch1: new FormControl(),
    salesPitch2: new FormControl(),
    salesPitch3: new FormControl(),
    conclusion: new FormControl()
  })

  constructor(private api: APIService, private cookie: CookieService, private jwtService : JwtService) { }

  selectedCoverLetter(cover: any) {
    this.cov = cover;
  }

  loadCreateCoverLetter() {
    this.create = true;
  }

  protected filterCovers() {
    if (!this.coverLetters) {
      return;
    }

    let search = this.coverFilter.value;
    if (!search) {
      this.filteredCovers.next(this.coverLetters.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    this.filteredCovers.next(
      this.coverLetters.filter(cov => cov.intro.toLowerCase().indexOf(search) > -1)
    );
  }

  fetchAllCoverLetters() {
    let loginToken = this.cookie.get("loginToken");
    let decodedToken = this.jwtService.DecodeToken(loginToken);
    const url = settings.apiBaseURL+'api/profile/v1/cover-letter';
    const options = {
      params: {'userId': decodedToken.userID },
      headers: new HttpHeaders({
        "Api-Key": environment.firebase.apiKey,
        "Authorization": loginToken,
        'Accept': 'application/json' as const, 
        'Content-Type': 'application/json' as const, 
        'Response-Type': 'JSON' as const
      })
    };
    this.api.get(url, options).subscribe(res => {
      let response = JSON.parse(JSON.stringify(res));
      if (response.statusCode == 200) {
        this.populateCoverLetterDropdown(response.data);
      }
    })
  }

  populateCoverLetterDropdown(covers: coverLetter[]) {
    this.coverLetters = covers;
    this.filterCovers();
  }

  submitConfirm() {
    let loginToken = this.cookie.get("loginToken");
    let decodedToken = this.jwtService.DecodeToken(loginToken);
    const url = settings.apiBaseURL+'api/profile/v1/cover-letter';
    const options = {
      params: {'userId': decodedToken.userID },
      headers: new HttpHeaders({
        "Api-Key": environment.firebase.apiKey,
        "Authorization": loginToken,
        'Accept': 'application/json' as const, 
        'Content-Type': 'application/json' as const, 
        'Response-Type': 'JSON' as const
      })
    };
    if (this.create) {
      if (!this.applicationForm.get("intro")!.value) return;
      if (!this.applicationForm.get("salesPitch1")!.value) return;
      if (!this.applicationForm.get("salesPitch2")!.value) return;
      if (!this.applicationForm.get("salesPitch3")!.value) return;
      if (!this.applicationForm.get("conclusion")!.value) return;

      let body = {
        intro: this.applicationForm.get("intro")!.value,
        salesPitch1: this.applicationForm.get("salesPitch1")!.value,
        salesPitch2: this.applicationForm.get("salesPitch2")!.value,
        salesPitch3: this.applicationForm.get("salesPitch3")!.value,
        conclusion: this.applicationForm.get("conclusion")!.value
      }
      this.api.post(url, body, options).subscribe(res => {
        this.cov = JSON.parse(JSON.stringify(res)).data;
        this.createNewApplication();
      })
    }
    else {
      this.createNewApplication();
    }
  }

  createNewApplication() {
    let loginToken = this.cookie.get("loginToken");
    let decodedToken = this.jwtService.DecodeToken(loginToken);
    const url = settings.apiBaseURL+'api/job/v1/application';
    let body = {'jobPostingId': this.selected.postingID, 'userId': decodedToken.userID, 'coverLetterId': this.cov.coverLetterId };
    const options = {
      headers: new HttpHeaders({
        "Api-Key": environment.firebase.apiKey,
        "Authorization": loginToken,
        'Accept': 'application/json' as const, 
        'Content-Type': 'application/json' as const, 
        'Response-Type': 'JSON' as const
      })
    };
    this.api.post(url, body, options).subscribe(res => {
      location.reload();
    })
  }

  ngOnInit() {
    this.fetchAllCoverLetters();

    this.coverControl.setValue(this.coverLetters[1]);
    this.filteredCovers.next(this.coverLetters.slice());

    this.coverFilter.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterCovers();
      });
  }
}

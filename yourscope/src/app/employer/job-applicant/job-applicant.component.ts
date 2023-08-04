import { Component, Input } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/services/api.service';
import { JwtService } from 'src/app/services/jwt.service';

interface applicant {
  firstName : string,
  middleName : string | null,
  lastName : string,
  companyName : string,
  email : string,
  intrestsHobbies: [], 
  skills: [], 
  coverLetter: {
    intro: string,
    salesPitch1: string, 
    salesPitch2: string, 
    salesPitch3: string, 
    conclusion: string, 
  },
  awards: [],
  school: string
}

interface posting {
  postingID: number,
  firstName : string,
  middleName : string | null,
  lastName : string,
  companyName : string,
  country : string,
  city : string,
  address : string,
  companyEmail : string,
  unitNumber : number | null,
  phone : string | null,
  fax : string | null,
  type : string | null,
  jobTitle : string,
  description : string,
  applicationDeadline : string
}

@Component({
  selector: 'app-job-applicant',
  templateUrl: './job-applicant.component.html',
  styleUrls: ['./job-applicant.component.scss']
})
export class JobApplicantComponent {
  constructor(private api: APIService, private toastr: ToastrService) {}
  
  applicants: applicant[] = [];
  eventStates: boolean[] = [];

  @Input('posting') selection : posting = {
    postingID: -1,
    firstName : "",
    middleName : null,
    lastName : "",
    companyName : "",
    country : "",
    city : "",
    address : "",
    companyEmail : "",
    unitNumber : null,
    phone : null,
    fax : null,
    type : null,
    jobTitle : "",
    description : "",
    applicationDeadline : ""
  };

  ngOnInit() {
    this.api.getJobApplicants(this.selection.postingID).subscribe({
      next: res => {
        this.applicants = JSON.parse(JSON.stringify(res)).data;
      }, 
      error: err => {
        this.toastr.error("There was an internal error.");
      }
    });
  }

  toggleEventState(index: number): void {
    this.eventStates[index] = !this.eventStates[index];
  }
}

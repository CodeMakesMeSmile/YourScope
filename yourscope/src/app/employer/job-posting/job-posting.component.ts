import { Component, Input } from '@angular/core';

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
  selector: 'app-job-posting',
  templateUrl: './job-posting.component.html',
  styleUrls: ['./job-posting.component.scss']
})
export class JobPostingComponent {
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
}

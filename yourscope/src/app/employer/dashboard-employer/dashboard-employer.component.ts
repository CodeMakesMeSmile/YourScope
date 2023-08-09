import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/services/api.service';
import { JwtService } from 'src/app/services/jwt.service';

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
  selector: 'app-dashboard-employer',
  templateUrl: './dashboard-employer.component.html',
  styleUrls: ['./dashboard-employer.component.scss']
})
export class DashboardEmployerComponent implements OnInit {
  page : number[] = [1, 1];
  load : number = 0;
  options : number = 0;
  jobs: posting[] = [];
  selection : posting = {
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
  }
  name: string = "";

  constructor(private api: APIService, private cookie: CookieService, private jwt: JwtService, private toastr: ToastrService) {}

  closePopup1() {
    this.options = 0;
  }

  closePopup2(e: MouseEvent) {
    if ((e.target as Element).className == "popup") this.options = 0;
  }

  loadJobPosting(job : posting) {
    this.options = 1;
    this.selection = job;
  }
  
  loadJobPostingApplicants(job : posting) {
    this.options = 5;
    this.selection = job;
  }


  loadCreatePosting() {
    this.options = 2;
  }

  loadDeletePosting(job : posting) {
    this.options = 3;
    this.selection = job;
  }

  loadPosting(p : number) {
    let loginToken = this.cookie.get("loginToken");
    let decodedToken = this.jwt.DecodeToken(loginToken);
    this.api.getJobPostings((p - 1) * this.load, this.load, undefined, undefined, decodedToken.userID).subscribe({
      next: res => {
        this.jobs = JSON.parse(JSON.stringify(res)).data;

        for (let event in this.jobs){
            let date = this.jobs[event].applicationDeadline;
            date = new Date(date).toLocaleDateString('en-US'); 
            this.jobs[event].applicationDeadline = date;
        }

        this.page[0] = p;
      }, 
      error: err => {
        this.toastr.error("There was an internal error.");
      }
    });
  }

  nextPage() {
    this.loadPosting(this.page[0] + 1);
  }

  prevPage() {
    this.loadPosting(this.page[0] - 1);
  }

  deletePosting() {
    this.api.deleteJobPosting(this.selection.postingID).subscribe(res => {
      this.options = 4;
      this.loadPosting(1);
      this.page = [1, 1];
      setTimeout(() => {
        this.toastr.success("Successfully deleted job posting.");
      }, 2000);
      this.ngOnInit();
      this.options = 0;
    })
  }



  ngOnInit() {
    let token = this.jwt.DecodeToken(this.cookie.get("loginToken"));
    this.name = token.name;
    this.load = Math.ceil((window.innerHeight - 300) / 75);
    this.api.jobCount().subscribe(res => {
      this.page[1] = Math.max(Math.ceil(Number(JSON.parse(JSON.stringify(res)).data) / this.load), 1);
    });
    this.loadPosting(1);
  }
}

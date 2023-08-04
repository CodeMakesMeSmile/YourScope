import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { APIService } from 'src/app/services/api.service';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-job-posting-create',
  templateUrl: './job-posting-create.component.html',
  styleUrls: ['./job-posting-create.component.scss'],
})
export class JobPostingCreateComponent {
  constructor(private api: APIService, private cookie: CookieService, private jwt: JwtService) {}
  maxTitle : number = 400;
  maxDesc : number = 3000;
  // Form validation
  lblText: string = "";
  missingTitle: boolean = false;
  missingDate: boolean = false;
  missingDesc: boolean = false;
  today: string = new Date().toISOString().slice(0, 10);;

  supQuestions : string[] = [];

  public createJobPostingForm = new FormGroup({
    title: new FormControl(),
    desc: new FormControl(),
    deadline: new FormControl()
  })

  // Form submission and validation

  submitForm() {
    // Validate the form inputs first.
    if (!this.validateForm()) return;

    // Then create the job posting.
    this.createJob();
  }

  validateForm() {
    // Resetting the form validation fields.
    this.resetFormValidation();

    // Form validation.
    let valid: boolean = true;
    let title = this.createJobPostingForm.get("title");
    let desc = this.createJobPostingForm.get("desc");
    let deadline = this.createJobPostingForm.get("deadline");

    if (title!.value == null) {
      this.missingTitle = true;
      if (this.lblText.length == 0)
        this.lblText = "Missing required fields.";
    }
    if (desc!.value == null) {
      this.missingDesc = true;
      if (this.lblText.length == 0)
        this.lblText = "Missing required fields.";
    }
    if (deadline!.value == null) {
      this.missingDate = true;
      if (this.lblText.length == 0)
        this.lblText = "Missing required fields.";
    }

    return valid;
  }

  resetFormValidation() {
    this.lblText = "";
    this.missingDate = false;
    this.missingTitle = false;
    this.missingDesc = false;
  }

  createJob() {
    let title = this.createJobPostingForm.get("title");
    let desc = this.createJobPostingForm.get("desc");
    let deadline = this.createJobPostingForm.get("deadline");

    let dl = Number(this.createJobPostingForm.get("deadline")!.value.replace("-", "").replace("-", ""));
    const date = new Date();
    let time = dl - date.getFullYear() * 10000 + Number(String(date.getDate()).padStart(2,'0') + String(date.getMonth()+1).padStart(2,'0'));
    if (dl <= 0) return;

    this.api.createJobPosting(title!.value, desc!.value, deadline!.value).subscribe(res => {
      location.reload();
    })
  }
}

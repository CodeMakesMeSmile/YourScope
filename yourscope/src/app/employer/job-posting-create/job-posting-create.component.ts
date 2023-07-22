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

  supQuestions : string[] = [];

  public createJobPostingForm = new FormGroup({
    title: new FormControl(),
    desc: new FormControl(),
    deadline: new FormControl()
  })

  createJob() {
    let title = this.createJobPostingForm.get("title");
    let desc = this.createJobPostingForm.get("desc");
    let deadline = this.createJobPostingForm.get("deadline");
    if (title!.value == null) return;
    if (desc!.value == null) return;
    if (deadline!.value == null) return;

    let dl = Number(this.createJobPostingForm.get("deadline")!.value.replace("-", "").replace("-", ""));
    const date = new Date();
    let time = dl - date.getFullYear() * 10000 + Number(String(date.getDate()).padStart(2,'0') + String(date.getMonth()+1).padStart(2,'0'));
    if (dl <= 0) return;

    this.api.createJobPosting(title!.value, desc!.value, deadline!.value).subscribe(res => {
      location.reload();
    })
  }
}

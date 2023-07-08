import { Component, OnInit } from '@angular/core';
import { APIService } from '../../services/api.service';
import { CookieService } from 'ngx-cookie-service';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-student-postings',
  templateUrl: './student-postings.component.html',
  styleUrls: ['./student-postings.component.scss']
})
export class StudentPostingsComponent implements OnInit {
  collapsed: boolean = false;
  popup: boolean = false; 
  selected: any = {};
  currentPage: number = 1;
  totalPages: number = 0;

  constructor(private api: APIService, private cookie: CookieService, private jwt: JwtService) {}

  loadPopup(e: any) {
    this.popup = true;
    this.selected = e;
  }

  closePopup1() {
    this.popup = false;
  }

  closePopup2(t: MouseEvent) {
    if ((t.target as Element).className == "close-popup") this.popup = false;
  }

  jobs: any[] = [];

  ngOnInit() {
    this.api.get('https://localhost:7184/api/job/v1/posting/count').subscribe((res: any) => {
      this.totalPages = Math.ceil(res.data / 12);
    })
    this.updatePage();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.updatePage();
  }

  onPageMove(increment: boolean) {
    if (increment) {
      if (this.currentPage == this.totalPages) {
        return;
      }
      this.currentPage++;
    } else {
      if (this.currentPage == 1) {
        return;
      }
      this.currentPage--;
    }
    this.updatePage();
  }

  updatePage() {
    const token = this.jwt.DecodeToken(this.cookie.get("loginToken"));
    this.api.getJobs(12, (this.currentPage - 1) * 12, token.userID, undefined).subscribe({
      next: (res: any) => {
        this.jobs = res.data
      },
      error: err => {
        alert("Unable to retrieve job postings.");
      }
    });
  }
}

import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'cover-letter-view',
  templateUrl: './cover-letter-view.component.html',
  styleUrls: [
    './cover-letter-view.component.scss',
    '../../admin/dashboard-admin/dashboard-admin.component.scss'
  ]
})
export class CoverLetterViewComponent {
  // Class fields
  coverLetters: Array<CoverLetter> = new Array<CoverLetter>();
  loadingComplete: boolean = false;

  // Constructor
  constructor(private toastr: ToastrService, private api: APIService) { }

  // Initialization
  ngOnInit(): void {
    this.setCoverLetters();
  }
  async setCoverLetters(): Promise<void> {
    // Setting the component cover letter variable.
    this.coverLetters = await this.getCoverLetters();
    this.loadingComplete = true;
  }
  async getCoverLetters(): Promise<Array<CoverLetter>> {
    let result;
    try {
      result = await this.api.getCoverLetters();
    }
    catch(err) {
      console.log(err);
      this.toastr.error("There was an internal error.");
    }

    return result;
  }

  // Methods
  async deleteCV(coverLetter: CoverLetter): Promise<boolean> {
    try {
      await this.api.deleteCoverLetter(coverLetter.coverLetterId);
    }
    catch(err) {
      console.log(err);
      this.toastr.error("There was an internal error.");
      return false;
    }

    this.toastr.success("Successfully deleted cover letter!");
    // Reloading the component.
    this.ngOnInit();
    return true;
  }
}

export interface CoverLetter {
  coverLetterId: number;
  intro: string;
  salesPitch1: string;
  salesPitch2: string;
  salesPitch3: string;
  conclusion: string;
}

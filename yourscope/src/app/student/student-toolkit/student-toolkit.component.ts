import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/services/api.service';
import { CoverLetterViewComponent } from '../cover-letter-view/cover-letter-view.component';

@Component({
  selector: 'app-student-toolkit',
  templateUrl: './student-toolkit.component.html',
  styleUrls: [
    './student-toolkit.component.scss',
    '../../admin/dashboard-admin/dashboard-admin.component.scss'
  ]
})
export class StudentToolkitComponent {
  // Constructor
  constructor(private toastr: ToastrService, private api: APIService) { }
  // Display
  collapsed: boolean = false;
  displayCreateCoverLetter: boolean = false;
  // FormGroup for CV
  public formCV = new FormGroup({
    intro: new FormControl(),
    salesPitch1: new FormControl(),
    salesPitch2: new FormControl(),
    salesPitch3: new FormControl(),
    conclusion: new FormControl()
  })
  // Children references
  @ViewChild(CoverLetterViewComponent) child: CoverLetterViewComponent | undefined;
  // Form validation.
  lblText: string = '';
  missingIntro: boolean = false;
  clickedCreate: boolean = false;
  // Methods
  onClickCreateCV() {
    // Showing the popup
    this.displayCreateCoverLetter = true;
  }
  onClickClosePopup() {
    this.displayCreateCoverLetter = false;
    this.clearValidation();
    this.formCV.reset();
  }
  // Cover letter creation
  submitCV() {
    // Disable the button
    this.clickedCreate = true;
    // Form validation
    if (!this.validateForm()) {
      // Re-enable the button
      this.clickedCreate = false;
      return;
    }
    // Creating the CV
    this.createCV();
  }
  validateForm(): boolean {
    // Clearing previous validations.
    this.clearValidation();

    // Validating form.
    let valid: boolean = true;

    if (!this.formCV.get('intro')!.value) {
      valid = false;
      this.missingIntro = true;
      if (this.lblText.length == 0)
        this.lblText = 'Missing required fields.';
    }

    return valid;
  }
  clearValidation(): void {
    this.missingIntro = false;
    this.lblText = '';
  }
  createCV() {
    // Collecting all relevant values.
    let introduction: string = this.formCV.get('intro')!.value;
    let pitch1: string = this.formCV.get('salesPitch1')!.value ?? '';
    let pitch2: string = this.formCV.get('salesPitch2')!.value ?? '';
    let pitch3: string = this.formCV.get('salesPitch3')!.value ?? '';
    let conclusion: string = this.formCV.get('conclusion')!.value ?? '';
    // Calling the API to create the cover letter.
    this.api.createCoverLetter(introduction, pitch1, pitch2, pitch3, conclusion)
      .then(() => {
        this.displayCreateCoverLetter = false;
        this.formCV.reset();
        this.child?.setCoverLetters();
        this.toastr.success("Cover letter successfully created!");
      })
      .catch(err => {
        this.toastr.error("An internal error occurred.");
        console.log(err);
      })
      .finally(() => {
        this.clickedCreate = false;
      });
  }
}

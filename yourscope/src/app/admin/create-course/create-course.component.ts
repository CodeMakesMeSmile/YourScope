import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})
export class CreateCourseComponent {
  code : string = '';
  name : string = '';
  description : string = '';
  discipline: string = '';
  type : string = '';
  grade : number | string = '';
  credits : number | string = '';
  prerequisites : string = '';
  // Form validation.
  missingCode: boolean = false;
  missingName: boolean = false;
  missingDesc: boolean = false;
  missingDisc: boolean = false;
  missingType: boolean = false;
  missingGrade: boolean = false;
  missingCredits: boolean = false;
  lblText: string = "";
  
  constructor(private router : Router, private hc : APIService, private toastr: ToastrService) { }

  submitForm() {
    // Validating the form input.
    if (!this.validateForm()) return;
    // Calling the save method.
    this.save();
  }

  validateForm(): boolean {
    // Clearing form validation.
    this.clearFormValidation();

    // Validating the form.
    let valid: boolean = true;

    // Existance of all fields.
    if (!this.code) {
      valid = false;
      this.missingCode = true;
      if (this.lblText.length == 0)
        this.lblText = "Missing required fields.";
    }
    if (!this.name) {
      valid = false;
      this.missingName = true;
      if (this.lblText.length == 0)
        this.lblText = "Missing required fields.";
    }
    if (!this.description) {
      valid = false;
      this.missingDesc = true;
      if (this.lblText.length == 0)
        this.lblText = "Missing required fields.";
    }
    if (!this.discipline) {
      valid = false;
      this.missingDisc = true;
      if (this.lblText.length == 0)
        this.lblText = "Missing required fields.";
    }
    if (!this.type) {
      valid = false;
      this.missingType = true;
      if (this.lblText.length == 0)
        this.lblText = "Missing required fields.";
    }
    if (!this.credits) {
      valid = false;
      this.missingCredits = true;
      if (this.lblText.length == 0)
        this.lblText = "Missing required fields.";
    }
    if (!this.grade) {
      valid = false;
      this.missingGrade = true;
      if (this.lblText.length == 0)
        this.lblText = "Missing required fields.";
    }

    // Checking for number entries in credits and grade.
    if (isNaN(+this.credits)) {
      this.missingCredits = true;
      if (this.lblText.length == 0)
        this.lblText = "Invalid credits. Input must be a number.";
    }
    if (isNaN(+this.grade)) {
      this.missingGrade = true;
      if (this.lblText.length == 0)
        this.lblText = "Invalid grade. Input must be a number.";
    }

    // Validation of grade and credit amount.
    if (<number>this.credits < 1) {
      valid = false;
      this.missingCredits = true;
      if (this.lblText.length == 0)
        this.lblText = "Invalid credit amount. Must be positive.";
    }
    if (<number>this.grade < 9 || <number>this.grade > 12) {
      valid = false;
      this.missingGrade = true;
      if (this.lblText.length == 0)
        this.lblText = "Invalid grade. Value must be between 9 and 12.";
    }

    return valid;
  }

  clearFormValidation() {
    this.missingCode = false;
    this.missingName = false;
    this.missingDesc = false;
    this.missingDisc = false;
    this.missingType = false;
    this.missingGrade = false;
    this.missingCredits = false;
    this.lblText = "";
  }

  save() {
    this.hc.createCourse(this.code, this.name, this.discipline, this.type, <number>this.grade, <number>this.credits, this.description, this.prerequisites).subscribe({
      next: res => {
        this.router.navigate(['/admin/courses']).then(() => {
          this.toastr.success("Successfully added new course!");
        });
      }, 
      error: err => {
        console.log(err);
        this.toastr.error("There was an internal error.");
      }
    });
  }
}

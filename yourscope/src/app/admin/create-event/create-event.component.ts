import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent {
  title : string = '';
  eventDate : Date | undefined;
  location : string = '';
  description : string = '';
  // Form validation.
  missingTitle: boolean = false;
  missingDate: boolean = false;
  missingLocation: boolean = false;
  missingDesc: boolean = false;
  lblText: string = "";
  today: string = new Date().toISOString().slice(0, 10);
  
  constructor(private router : Router, private hc : APIService, private toastr: ToastrService) { }

  // Form submission and validation
  submitForm() {
    // Form validation.
    if (!this.validateForm()) return;
    // Creating the event.
    this.save();
  }

  validateForm(): boolean {
    // Clearing any previous validation fields.
    this.clearValidationFields();

    // Form validation.
    let valid: boolean = true;

    if(!this.title) {
      valid = false;
      this.missingTitle = true;
      if (this.lblText.length == 0)
        this.lblText = "Missing required fields.";
    }
    if(!this.description) {
      valid = false;
      this.missingDesc = true;
      if (this.lblText.length == 0)
        this.lblText = "Missing required fields.";
    }
    if(!this.location) {
      valid = false;
      this.missingLocation = true;
      if (this.lblText.length == 0)
        this.lblText = "Missing required fields.";
    }
    if (!this.eventDate) {
      valid = false;
      this.missingDate = true;
      if (this.lblText.length == 0)
        this.lblText = "Missing required fields.";
    }

    return valid;
  }

  clearValidationFields(): void {
    this.missingTitle = false;
    this.missingDate = false;
    this.missingLocation = false;
    this.missingDesc = false;
    this.lblText = "";
  }

  save() {
    let currentDate = Date.now();
    currentDate = new Date(currentDate).setHours(0,0,0,0);

    this.hc.createEvent(this.title, this.description, this.eventDate!, this.location).subscribe({
      next: res => {
        this.router.navigate(['/admin/events']).then(() => {
          this.toastr.success("Event created successfully!");
        });
      }, 
      error: err => {
        console.log(err);
        this.toastr.error("There was an internal error.");
      }
    });
  }
}

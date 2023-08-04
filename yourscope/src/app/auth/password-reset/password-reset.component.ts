import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit{
    email : string = '';
    emailSending: boolean = false;
    // Form validation
    lblText: string = '';
    invalidEmail = false;

    constructor(private auth : AuthService, private toastr: ToastrService) { }

    ngOnInit(): void {
    }

    resetPassword(){
      // Validate inputs
      if (!this.validateForm()) return;

      // Sending reset email.
      this.auth.passwordReset(this.email);

      // UI output.
      this.emailSending = true;
      this.lblText = "If the entered email address is registered within the system, then you will be sent an email with instructions on how to reset your password.";
    }

    validateForm(): boolean {
      this.clearValidation();

      // Form validation.
      let valid: boolean  = true;
      const emailRegEx: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

      // If no email entered.
      if(this.email == '') {
        valid = false;
        this.invalidEmail = true;

        if (this.lblText.length == 0)
          this.lblText = 'Please enter an email address.';
      }

      // If Invalid email entered
      if (!emailRegEx.test(this.email)) {
        valid = false;
        this.invalidEmail = true;
        if (this.lblText.length == 0)
          this.lblText = 'The entered email address is invalid.';
      }

      return valid;
    }

    clearValidation() {
      this.lblText = '';
      this.invalidEmail = false;
    }
}

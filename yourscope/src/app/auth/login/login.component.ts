import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  disableLogin = false;
  email : string = '';
  password : string = '';
  // Form validation
  missingEmail: boolean = false;
  missingPassword: boolean = false;
  lblText: string = '';

  constructor(private auth : AuthService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  async login() {
    // Disable the login button.
    this.disableLogin = true;

    // Validation.
    if (!this.validateInput()) {
      this.disableLogin = false;
      return;
    }

    // Performing the login.
    let status: number | null = await this.auth.login(this.email, this.password);

    // Re-enabling the login.
    this.disableLogin = false;

    // Displaying toaster.
    if (status === 401)
      this.toastr.warning("Email or password is incorrect.");
    else if (status != 201)
      this.toastr.error("An internal error has occured.");
  }

  validateInput(): boolean {
    this.resetFormValidation();

    let valid: boolean = true;

    if(this.email == '') {
      if (this.lblText.length == 0)
        this.lblText = 'Missing required fields.';
      this.missingEmail = true;
      valid = false;
    }

    if(this.password == '') {
      if (this.lblText.length == 0)
        this.lblText = 'Missing required fields.';
      this.missingPassword = true;
      valid = false;
    }

    return valid;
  }

  resetFormValidation() {
    this.missingEmail = false;
    this.missingPassword = false;
    this.lblText = '';
  }
}
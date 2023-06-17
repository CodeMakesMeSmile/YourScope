import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit{
    email : string = '';

    constructor(private auth : AuthService) { }

    ngOnInit(): void {
    }

    resetPassword(){
      if(this.email == '') {
        alert("Please enter email");
      return;
      }
      this.auth.passwordReset(this.email);
    }
}

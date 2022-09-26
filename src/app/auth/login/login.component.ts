import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BaseAuthComponent } from '../base-auth/base-auth.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseAuthComponent {
  constructor(private authServ: AuthService, private router: Router) {
    super();
  }
  errMessage = '';
  login(data: {email:string,password:string}) {

    this.authServ.login({ email: data.email!, password: data.password! }).subscribe(res => {
      if (res.status == 'success') {
        this.router.navigate(['/home']);
      } else {
        this.errMessage = res.message;
      }
    }, (err) => {
      this.errMessage=err.error.message;
    });

  }

}

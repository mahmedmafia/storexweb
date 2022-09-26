import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BaseAuthComponent } from '../base-auth/base-auth.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BaseAuthComponent implements OnInit {
  constructor(private authServ: AuthService, private router: Router) {
    super();
   }
  errMessage = '';
  override ngOnInit(): void {
    console.log(this.authForm);
   this.authForm.addControl('name',new FormControl('',[Validators.required,Validators.minLength(5)]));
  }


  register(data:{email:string,password:string,name:string}) {

    this.authServ.register(data).subscribe(res => {
      if (res.status == 'success') {
        this.router.navigate(['/home']);
      } else {
        this.errMessage = res.message;
      }
    }, (err) => {
      this.errMessage = err.error.message;
    });

  }

}

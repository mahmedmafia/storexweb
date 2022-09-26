import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';

import { Routes,RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseAuthComponent } from './base-auth/base-auth.component';

const routes: Routes = [
  {
    path:'',pathMatch:'full',redirectTo:'login',
  },
  {
    path:'login',component:LoginComponent,
  },
   {
    path:'register',component:RegisterComponent,
  }
]
@NgModule({
  declarations: [
    LoginComponent,
    AuthComponent,
    RegisterComponent,
    BaseAuthComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ]
})
export class AuthModule { }

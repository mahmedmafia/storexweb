import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes,RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { SharedModule } from './shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AuthGuardGuard } from './auth/auth-guard.guard';

const routes: Routes = [
    {
      path:'auth',
      component:AuthComponent,
      loadChildren:()=>import('./auth/auth.module').then(m=> m.AuthModule),
    },
    {
      path:'home',
      canActivate:[AuthGuardGuard],
      canActivateChild:[AuthGuardGuard],
      component:HomeComponent,loadChildren:()=>import('./home/home.module').then(m=> m.HomeModule),
    }
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    SharedModule,
    HttpClientModule,
    ModalModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

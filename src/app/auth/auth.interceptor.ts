import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import {  Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { AppModalService } from '../shared/modal-message-component/app-modal.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authServ: AuthService,private router:Router,private appModal:AppModalService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.authServ.user) {
      const newRequest = request.clone({
        headers: request.headers.set(
          'Authorization',
          `Bearer ${this.authServ.user?.token}`
        ),
      });
      return next.handle(newRequest).pipe(
        tap({
          error: async (err) => {
            if(err.error.message=='Unauthenticated.'){
              await this.appModal.openModal('Session Time Out','Please Login Again');
              this.authServ.logOut();
            }
          },
        })
      );
    }
    return next.handle(request);
  }
}

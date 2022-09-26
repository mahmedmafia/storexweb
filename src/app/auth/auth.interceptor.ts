import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authServ: AuthService,private router:Router) {}

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
          error: (err) => {
            if(err.error.message=='Unauthenticated.'){
              this.authServ.logOut();
            }
          },
        })
      );
    }
    return next.handle(request);
  }
}

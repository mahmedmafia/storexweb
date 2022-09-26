import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate, CanActivateChild {

  constructor(private authServ: AuthService, private router: Router,private modalService:BsModalService) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.handleUserAuth()
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.handleUserAuth()
  }
  handleUserAuth() {
    if (this.authServ.user?.token) {
      return true;
    } else {
      this.modalService.show('Session TimeOut Please LogIn Again',{show:true});
      this.router.navigate(['/auth'])
      return false;
    }
  }
}

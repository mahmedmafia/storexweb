import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppModalService } from '../shared/modal-message-component/app-modal.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate, CanActivateChild {

  constructor(private authServ: AuthService, private router: Router, private appModal: AppModalService) {

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
  async handleUserAuth() {
    if (this.authServ.user?.token) {
      return true;
    } else {
      await this.appModal.openModal('Not Authorized', 'Please Login Again');
      this.authServ.logOut();
      return false;
    }
  }
}

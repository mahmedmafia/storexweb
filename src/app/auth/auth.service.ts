import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, tap, catchError, of, throwError, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User | null=null;
  isAuthenticated: boolean = false;
  userSubject = new BehaviorSubject<User | null>(null);
  constructor(private http: HttpClient,private router:Router) {
    const localStorageUser = localStorage.getItem('user');
    if (localStorageUser) {
      this.user = JSON.parse(localStorageUser);
    }
    this.userSubject.next(this.user);
  }
  login(loginUserData: loginUser) {
    return this.http.post<loginResult>(environment.testAPi + '/login', loginUserData).
      pipe(tap((data) =>
        this.handleUserResult(data, loginUserData)
      ), catchError((err) =>  throwError(err)))
  }
  register(user: UserData) {
    return this.http.post<registerResult>(environment.testAPi + '/register', user).pipe(
      tap((data) =>
        this.handleUserResult(data, user)
      ), catchError(err => throwError(err))
    );
  }
  logOut() {
    localStorage.clear();
    this.user=null;
    this.userSubject.next(null);
    this.router.navigate(['/auth']);
  }
  handleUserResult(resultData: loginResult | registerResult, userData: loginUser | UserData) {
    if (resultData) {
      if (resultData.status == 'success') {
        this.user = { ...userData, token: resultData.authorisation.token };
        localStorage.setItem('user', JSON.stringify(this.user));
        this.userSubject.next(this.user);
      }
    }
  }
}
interface UserData {
  name: string,
  email: string,
  password: string,
}
export interface User {
  name?: string,
  email: string,
  password: string,
  updated_at?: string;
  created_at?: string;
  token: string;
  id?: number;

}
type loginUser = Omit<UserData, 'name'>;
interface loginResult {
  status: 'success' | 'error';
  authorisation: Authorisation
  message: string;
}
interface registerResult extends loginResult {
  user: User;
}

interface Authorisation {
  token: string;
  type: string;
}


import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

export interface ResponseAuthData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private SIGN_UP =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA4Bfx-JzFi39YV--xmB1KAf9jR6A_uS0c';
  private SIGN_IN =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA4Bfx-JzFi39YV--xmB1KAf9jR6A_uS0c';

  user = new BehaviorSubject<User>(null);

  logoutTimer: any;

  constructor(private httpClient: HttpClient, private router: Router) {}

  signUp(email: string, password: string) {
    return this.httpClient
      .post<ResponseAuthData>(this.SIGN_UP, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(catchError(this.handleError));
  }

  login(email: string, password: string) {
    return this.httpClient
      .post<ResponseAuthData>(this.SIGN_IN, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) =>
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          )
        )
      );
  }

  private handleError(errResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error message';
    if (!errResponse.error || !errResponse.error.error) {
      return throwError(errorMessage);
    }
    switch (errResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'Email already exist';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage =
          'There is no user record corresponding to this identifier';
        break;
      case 'INVALID_PASSWORD':
        errorMessage =
          'The password is invalid or the user does not have a password.';
        break;
    }
    return throwError(errorMessage);
  }

  handleAuthentication(
    email: string,
    password: string,
    token: string,
    expireAt: number
  ) {
    const expiredDate = new Date(new Date().getTime() + expireAt * 1000);
    const user = new User(email, password, token, expiredDate);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
    this.autoLogout(expireAt * 1000);
  }

  autoLogin() {
    const storageUser: {
      email: string;
      id: string;
      _token: string;
      _expirationTokenDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (storageUser) {
      let expireDate = new Date(storageUser._expirationTokenDate);
      const userFromStorage = new User(
        storageUser.email,
        storageUser.id,
        storageUser._token,
        expireDate
      );
      if (userFromStorage.token) {
        this.user.next(userFromStorage);
        this.autoLogout(new Date().getTime() - expireDate.getTime());
      }
    }
  }

  logout() {
    localStorage.removeItem('userData');
    this.user.next(null);
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
    }
    this.logoutTimer = null;
    this.router.navigate(['/auth']);
  }

  autoLogout(expireAt: number) {
    this.logoutTimer = setTimeout(() => {
      this.logout();
    }, expireAt);
  }
}

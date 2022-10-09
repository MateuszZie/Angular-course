import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Secret } from './secret';
import { User } from './user.model';
import * as fromAppStore from '../store/app.reducer';
import { Store } from '@ngrx/store';
import * as AuthActions from './store/auth.actions';

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
  // user = new BehaviorSubject<User>(null);

  logoutTimer: any;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private store: Store<fromAppStore.AppState>
  ) {}

  signUp(email: string, password: string) {
    return this.httpClient
      .post<ResponseAuthData>(Secret.SIGN_UP, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(catchError(this.handleError));
  }

  login(email: string, password: string) {
    return this.httpClient
      .post<ResponseAuthData>(Secret.SIGN_IN, {
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
    // this.user.next(user);
    this.store.dispatch(
      new AuthActions.Login({
        email: email,
        password: password,
        token: token,
        expiredDate: expiredDate,
      })
    );
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
        // this.user.next(userFromStorage);
        this.store.dispatch(
          new AuthActions.Login({
            email: storageUser.email,
            password: storageUser.id,
            token: storageUser._token,
            expiredDate: expireDate,
          })
        );
        this.autoLogout(new Date().getTime() - expireDate.getTime());
      }
    }
  }

  logout() {
    localStorage.removeItem('userData');
    // this.user.next(null);
    this.store.dispatch(new AuthActions.Logout());
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

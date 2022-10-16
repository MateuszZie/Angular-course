import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { Secret } from '../secret';
import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface ResponseAuthData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuthentication = (resData) => {
  const expiredDate = new Date(
    new Date().getTime() + +resData.expiresIn * 1000
  );
  const user = new User(
    resData.email,
    resData.localId,
    resData.idToken,
    expiredDate
  );
  localStorage.setItem('userData', JSON.stringify(user));
  return new AuthActions.AuthenticationSuccess({
    email: resData.email,
    id: resData.localId,
    token: resData.idToken,
    expiredDate: expiredDate,
    redirect: true,
  });
};

const handleError = (errResponse) => {
  let errorMessage = 'An unknown error message';
  if (!errResponse.error || !errResponse.error.error) {
    return of(new AuthActions.AuthenticationFail(errorMessage));
  }
  switch (errResponse.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'Email already exist';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'There is no user record corresponding to this identifier';
      break;
    case 'INVALID_PASSWORD':
      errorMessage =
        'The password is invalid or the user does not have a password.';
      break;
  }
  return of(new AuthActions.AuthenticationFail(errorMessage));
};

@Injectable()
export class AuthEffects {
  @Effect()
  authSignUp = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((signupData: AuthActions.SignupStart) => {
      return this.httpClient
        .post<ResponseAuthData>(Secret.SIGN_UP, {
          email: signupData.payload.email,
          password: signupData.payload.password,
          returnSecureToken: true,
        })
        .pipe(
          tap((resData) =>
            this.authService.setLogoutTimer(+resData.expiresIn * 1000)
          ),
          map((resData) => handleAuthentication(resData)),
          catchError((errResponse) => handleError(errResponse))
        );
    })
  );

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.httpClient
        .post<ResponseAuthData>(Secret.SIGN_IN, {
          email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true,
        })
        .pipe(
          tap((resData) =>
            this.authService.setLogoutTimer(+resData.expiresIn * 1000)
          ),
          map((resData) => handleAuthentication(resData)),
          catchError((errResponse) => handleError(errResponse))
        );
    })
  );

  @Effect({ dispatch: false })
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATION_SUCCESS, AuthActions.LOGOUT),
    tap((auth: AuthActions.AuthenticationSuccess | AuthActions.Logout) => {
      if (
        auth instanceof AuthActions.AuthenticationSuccess &&
        !auth.payload.redirect
      ) {
        return;
      }
      this.router.navigate(['/']);
    })
  );

  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      localStorage.removeItem('userData');
      this.authService.clearLogoutTimer();
    })
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
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
          return new AuthActions.AuthenticationSuccess({
            email: storageUser.email,
            id: storageUser.id,
            token: storageUser._token,
            expiredDate: expireDate,
            redirect: false,
          });
          // this.autoLogout(new Date().getTime() - expireDate.getTime());
        }
      }
      return { type: 'DUMMY' };
    })
  );

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
}

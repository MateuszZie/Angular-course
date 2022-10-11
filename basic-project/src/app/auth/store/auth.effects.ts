import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Secret } from '../secret';
import * as AuthActions from './auth.actions';

export interface ResponseAuthData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable()
export class AuthEffects {
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
          map((resData) => {
            const expiredDate = new Date(
              new Date().getTime() + +resData.expiresIn * 1000
            );
            return new AuthActions.Login({
              email: resData.email,
              id: resData.localId,
              token: resData.idToken,
              expiredDate: expiredDate,
            });
          }),
          catchError((errResponse) => {
            let errorMessage = 'An unknown error message';
            if (!errResponse.error || !errResponse.error.error) {
              return of(new AuthActions.LoginFail(errorMessage));
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
            return of(new AuthActions.LoginFail(errorMessage));
          })
        );
    })
  );

  @Effect({ dispatch: false })
  authSuccess = this.actions$.pipe(
    ofType(AuthActions.LOGIN),
    tap(() => this.router.navigate(['/']))
  );

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private router: Router
  ) {}
}

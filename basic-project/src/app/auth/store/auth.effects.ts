import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
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
            return of(
              new AuthActions.Login({
                email: resData.email,
                id: resData.localId,
                token: resData.idToken,
                expiredDate: expiredDate,
              })
            );
          }),
          catchError((errRes) => {
            return of();
          })
        );
    })
  );
  constructor(private actions$: Actions, private httpClient: HttpClient) {}
}

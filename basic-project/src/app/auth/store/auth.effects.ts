import { HttpClient } from '@angular/common/http';
import { Actions, ofType } from '@ngrx/effects';
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

export class AuthEffects {
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
          catchError((errRes) => {
            of();
          }),
          map((resData) => {
            of();
          })
        );
    })
  );
  constructor(private actions$: Actions, private httpClient: HttpClient) {}
}

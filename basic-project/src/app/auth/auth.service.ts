import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
  constructor(private httpClient: HttpClient) {}

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
      .pipe(catchError(this.handleError));
  }

  private handleError(errResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error message';
    if (!errResponse.error || !errResponse.error.error) {
      return throwError(errorMessage);
    }
    switch (errResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'Email allready exist';
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
}

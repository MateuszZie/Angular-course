import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface ResponseAuthData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private ADRES =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA4Bfx-JzFi39YV--xmB1KAf9jR6A_uS0c';
  constructor(private httpClient: HttpClient) {}

  signUp(email: string, password: string) {
    return this.httpClient.post<ResponseAuthData>(this.ADRES, {
      email: email,
      password: password,
      returnSecureToken: true,
    });
  }
}

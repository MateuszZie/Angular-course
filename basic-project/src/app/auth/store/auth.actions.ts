import { Action } from '@ngrx/store';

export const LOGIN_START = '[Auth] LOGIN_START';
export const SIGNUP_START = '[Auth] SIGNUP_START';
export const AUTHENTICATION_FAIL = '[Auth] AUTHENTICATION_FAIL';
export const AUTHENTICATION_SUCCESS = '[Auth] AUTHENTICATION_SUCCESS';
export const LOGOUT = '[Auth] LOGOUT';
export const CLEAR_ERROR = '[Auth] CLEAR_ERROR';
export const AUTO_LOGIN = '[Auth] AUTO_LOGIN';

export class AuthenticationSuccess implements Action {
  readonly type = AUTHENTICATION_SUCCESS;
  constructor(
    public payload: {
      email: string;
      id: string;
      token: string;
      expiredDate: Date;
    }
  ) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;

  constructor(public payload: { email: string; password: string }) {}
}

export class AuthenticationFail implements Action {
  readonly type = AUTHENTICATION_FAIL;

  constructor(public payload: string) {}
}

export class SignupStart implements Action {
  readonly type = SIGNUP_START;
  constructor(public payload: { email: string; password: string }) {}
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}

export type AuthActions =
  | AuthenticationSuccess
  | Logout
  | LoginStart
  | AuthenticationFail
  | SignupStart
  | ClearError
  | AutoLogin;

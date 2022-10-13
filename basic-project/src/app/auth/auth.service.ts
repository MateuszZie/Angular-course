import { Injectable } from '@angular/core';
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
  private logoutTimer: any;

  constructor(private store: Store<fromAppStore.AppState>) {}

  clearLogoutTimer() {
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
    }
    this.logoutTimer = null;
  }

  setLogoutTimer(expireAt: number) {
    this.logoutTimer = setTimeout(() => {
      this.store.dispatch(new AuthActions.Logout());
    }, expireAt);
  }
}

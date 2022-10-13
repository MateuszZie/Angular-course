import { Injectable } from '@angular/core';
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
  logoutTimer: any;

  constructor(private store: Store<fromAppStore.AppState>) {}

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
          new AuthActions.AuthenticationSuccess({
            email: storageUser.email,
            id: storageUser.id,
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
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
    }
    this.logoutTimer = null;
    // this.router.navigate(['/auth']);
  }

  autoLogout(expireAt: number) {
    this.logoutTimer = setTimeout(() => {
      this.logout();
    }, expireAt);
  }
}

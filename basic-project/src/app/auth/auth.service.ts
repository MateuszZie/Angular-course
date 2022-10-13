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

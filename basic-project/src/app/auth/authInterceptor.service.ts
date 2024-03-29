import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, Observable, take } from 'rxjs';
import { AuthService } from './auth.service';
import * as fromAppStore from '../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private store: Store<fromAppStore.AppState>
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select('auth').pipe(
      take(1),
      map((state) => state.user),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req);
        }
        const modifyReq = req.clone({
          params: new HttpParams().set('auth', user.token),
        });
        return next.handle(modifyReq);
      })
    );
  }
}

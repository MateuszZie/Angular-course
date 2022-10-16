import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { DataStorageService } from '../shered/data-stored.service';
import * as fromAppStore from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipesActions from '../recipes/store/recipes.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class Header implements OnInit, OnDestroy {
  isAuthenticated = false;
  userSub: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private store: Store<fromAppStore.AppState>
  ) {}

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  ngOnInit(): void {
    this.userSub = this.store
      .select('auth')
      .pipe(map((state) => state.user))
      .subscribe((user) => (this.isAuthenticated = !!user));
  }

  onSave() {
    this.dataStorageService.storeRecipes();
  }

  fetchRecipes() {
    this.store.dispatch(new RecipesActions.FetchRecipes());
  }

  logout() {
    this.store.dispatch(new AuthActions.Logout());
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { Recipe } from '../recipes.model';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipeChangeObservable: Subscription;
  recipes: Recipe[] = [];

  constructor(private store: Store<fromApp.AppState>) {}
  ngOnDestroy(): void {
    this.recipeChangeObservable.unsubscribe();
  }

  ngOnInit(): void {
    this.recipeChangeObservable = this.store
      .select('recipes')
      .pipe(map((data) => data.recipes))
      .subscribe((recipes) => (this.recipes = recipes));
  }
}

import { Injectable, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Ingredient } from '../shered/ingredient.model';
import { Recipe } from './recipes.model';
import * as ShoppingActions from '../shopping-list/shopping-list.actions';
import * as fromShoppingList from '../shopping-list/shopping-list.reducer';
import * as fromAppStore from '../store/app.reducer';

@Injectable()
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();

  constructor(private store: Store<fromAppStore.AppState>) {}

  private recipes: Recipe[] = [];

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientToShoppingList(ingredients: Ingredient[]) {
    this.store.dispatch(new ShoppingActions.AddIngredients(ingredients));
  }

  getRecipe(id: number): Recipe {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    if (this.recipes[index]) {
      this.recipes.splice(index, 1);
      this.recipeChanged.next(this.recipes.slice());
    }
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }
}

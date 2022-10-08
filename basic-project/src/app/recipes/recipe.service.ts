import { Injectable, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Ingredient } from '../shered/ingredient.model';
import { ShoppingListService } from '../shopping-list/shoppingList.service';
import { Recipe } from './recipes.model';
import * as ShoppingActions from '../shopping-list/shopping-list.actions';
import * as fromShoppingList from '../shopping-list/shopping-list.reducer';

@Injectable()
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<fromShoppingList.AppState>
  ) {}

  private recipes: Recipe[] = [];
  // [
  //   new Recipe(
  //     'A Test Recipe',
  //     'Recipe Description',
  //     'https://img.delicious.com.au/ZCVFCYn_/del/2022/02/chicken-chickpea-curry-163942-1.jpg',
  //     [new Ingredient('Meat', 1), new Ingredient('Chips', 2)]
  //   ),
  //   new Recipe(
  //     'A Test Recipe 2',
  //     'Recipe Description',
  //     'https://img.delicious.com.au/ZCVFCYn_/del/2022/02/chicken-chickpea-curry-163942-1.jpg',
  //     [new Ingredient('Meat', 2), new Ingredient('Chips', 3)]
  //   ),
  // ];

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientToShoppingList(ingredients: Ingredient[]) {
    this.store.dispatch(new ShoppingActions.AddIngredients(ingredients));
    // this.shoppingListService.addIngredients(ingredients);
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

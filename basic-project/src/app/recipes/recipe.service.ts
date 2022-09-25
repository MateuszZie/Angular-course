import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingridient } from '../shered/ingredient.model';
import { ShoppingListService } from '../shopping-list/shoppingList.service';
import { Recipe } from './recipes.model';

@Injectable()
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();

  constructor(private shoppingListService: ShoppingListService) {}
  private recipes: Recipe[] = [];
  // [
  //   new Recipe(
  //     'A Test Recipe',
  //     'Recipe Description',
  //     'https://img.delicious.com.au/ZCVFCYn_/del/2022/02/chicken-chickpea-curry-163942-1.jpg',
  //     [new Ingridient('Meat', 1), new Ingridient('Chips', 2)]
  //   ),
  //   new Recipe(
  //     'A Test Recipe 2',
  //     'Recipe Description',
  //     'https://img.delicious.com.au/ZCVFCYn_/del/2022/02/chicken-chickpea-curry-163942-1.jpg',
  //     [new Ingridient('Meat', 2), new Ingridient('Chips', 3)]
  //   ),
  // ];

  getRecipes() {
    return this.recipes.slice();
  }

  addIngeredientToShopingList(ingredients: Ingridient[]) {
    this.shoppingListService.addIngredients(ingredients);
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

import { EventEmitter } from '@angular/core';
import { Recipe } from './recipes.model';

export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'Recipe Description',
      'https://img.delicious.com.au/ZCVFCYn_/del/2022/02/chicken-chickpea-curry-163942-1.jpg'
    ),
    new Recipe(
      'A Test Recipe 2',
      'Recipe Description',
      'https://img.delicious.com.au/ZCVFCYn_/del/2022/02/chicken-chickpea-curry-163942-1.jpg'
    ),
  ];

  clickedRecipe = new EventEmitter<Recipe>();

  getRecipes() {
    return this.recipes.slice();
  }
}

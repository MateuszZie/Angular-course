import { EventEmitter } from '@angular/core';
import { Ingridient } from '../shered/ingredient.model';
import { Recipe } from './recipes.model';

export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'Recipe Description',
      'https://img.delicious.com.au/ZCVFCYn_/del/2022/02/chicken-chickpea-curry-163942-1.jpg',
      [new Ingridient('Meat', 1), new Ingridient('Chips', 2)]
    ),
    new Recipe(
      'A Test Recipe 2',
      'Recipe Description',
      'https://img.delicious.com.au/ZCVFCYn_/del/2022/02/chicken-chickpea-curry-163942-1.jpg',
      [new Ingridient('Meat', 2), new Ingridient('Chips', 3)]
    ),
  ];

  clickedRecipe = new EventEmitter<Recipe>();

  getRecipes() {
    return this.recipes.slice();
  }
}

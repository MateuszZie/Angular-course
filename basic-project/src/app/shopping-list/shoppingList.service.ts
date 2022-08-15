import { EventEmitter } from '@angular/core';
import { Ingridient } from '../shered/ingredient.model';

export class ShoppingListService {
  private ingredients: Ingridient[] = [
    new Ingridient('apples', 5),
    new Ingridient('tomatoes', 10),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient = new EventEmitter<Ingridient[]>();

  addIngredientAndEmit(ingredient: Ingridient) {
    this.ingredients.push(ingredient);
    this.addIngredient.emit(this.ingredients);
  }

  addIngredients(ingredients: Ingridient[]) {
    this.ingredients.push(...ingredients);
    this.addIngredient.emit(this.ingredients);
  }
}

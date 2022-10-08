import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Ingredient } from '../shered/ingredient.model';

export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient('apples', 5),
    new Ingredient('tomatoes', 10),
  ];

  editIndex = new Subject<number>();

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient = new Subject<Ingredient[]>();

  addIngredientAndEmit(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.addIngredient.next(this.ingredients);
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.addIngredient.next(this.ingredients);
  }

  updateIngredientByIndexId(index: number, ingredient: Ingredient): void {
    this.ingredients[index] = ingredient;
    this.addIngredient.next(this.ingredients);
  }

  getIngredientByindexId(index: number): Ingredient {
    return this.ingredients[index];
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.addIngredient.next(this.ingredients);
  }
}

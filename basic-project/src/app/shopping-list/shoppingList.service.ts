import { Subject } from 'rxjs';
import { Ingridient } from '../shered/ingredient.model';

export class ShoppingListService {
  private ingredients: Ingridient[] = [
    new Ingridient('apples', 5),
    new Ingridient('tomatoes', 10),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient = new Subject<Ingridient[]>();

  addIngredientAndEmit(ingredient: Ingridient) {
    this.ingredients.push(ingredient);
    this.addIngredient.next(this.ingredients);
  }

  addIngredients(ingredients: Ingridient[]) {
    this.ingredients.push(...ingredients);
    this.addIngredient.next(this.ingredients);
  }
}

import { Ingridient } from '../shered/ingredient.model';
import * as ShoppingActions from './shopping-list.actions';

const initialState = {
  ingredients: [new Ingridient('apples', 5), new Ingridient('tomatoes', 10)],
};

export function shoppingListReducer(
  state = initialState,
  action: ShoppingActions.AddIngredient
) {
  switch (action.type) {
    case ShoppingActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    default:
      return state;
  }
}

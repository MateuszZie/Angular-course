import { Ingridient } from '../shered/ingredient.model';
import { AddIngredient, ADD_INGREDIENT } from './shopping-list.actions';

const initialState = {
  ingredients: [new Ingridient('apples', 5), new Ingridient('tomatoes', 10)],
};

export function shoppingListReducer(
  state = initialState,
  action: AddIngredient
) {
  switch (action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    default:
      return state;
  }
}

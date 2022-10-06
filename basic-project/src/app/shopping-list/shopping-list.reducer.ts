import { Action } from '@ngrx/store';
import { Ingridient } from '../shered/ingredient.model';

const initialState = {
  ingredients: [new Ingridient('apples', 5), new Ingridient('tomatoes', 10)],
};

export function ShoppingListReducer(state = initialState, action: Action) {
  switch (action.type) {
    case 'ADD_INGREDIENT':
      return {
        ...state,
        ingredient: [...state.ingredients, action],
      };
  }
}

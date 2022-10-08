import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from '../shered/ingredient.model';
import { ShoppingListService } from './shoppingList.service';
import * as fromShoppingList from '../shopping-list/shopping-list.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: [],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  ingredientSubject: Subscription;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<fromShoppingList.AppState>
  ) {}

  // ngOnDestroy(): void {
  //   this.ingredientSubject.unsubscribe();
  // }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.ingredientSubject = this.shoppingListService.addIngredient.subscribe(
    //   (ingredients: Ingridient[]) => (this.ingredients = ingredients)
    // );
  }

  edit(index: number) {
    this.shoppingListService.editIndex.next(index);
  }
}

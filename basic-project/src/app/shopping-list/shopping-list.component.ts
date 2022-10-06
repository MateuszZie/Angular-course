import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Ingridient } from '../shered/ingredient.model';
import { ShoppingListService } from './shoppingList.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: [],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable<{ ingredients: Ingridient[] }>;
  ingredientSubject: Subscription;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<{ shoppingList: { ingredients: Ingridient[] } }>
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

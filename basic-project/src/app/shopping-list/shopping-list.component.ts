import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingridient } from '../shered/ingredient.model';
import { ShoppingListService } from './shoppingList.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: [],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingridient[] = [];

  ingredientSubject: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnDestroy(): void {
    this.ingredientSubject.unsubscribe();
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientSubject = this.shoppingListService.addIngredient.subscribe(
      (ingredients: Ingridient[]) => (this.ingredients = ingredients)
    );
  }
}

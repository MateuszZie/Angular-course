import { Component, OnInit } from '@angular/core';
import { Ingridient } from '../shered/ingredient.model';
import { ShoppingListService } from './shoppingList.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: [],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingridient[] = [];

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.shoppingListService.addIngredient.subscribe(
      (ingredients: Ingridient[]) => (this.ingredients = ingredients)
    );
  }
}

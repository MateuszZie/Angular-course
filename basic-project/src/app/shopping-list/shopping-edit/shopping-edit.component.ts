import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Ingridient } from 'src/app/shered/ingredient.model';
import { ShoppingListService } from '../shoppingList.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('inputAmount') inputAmount: ElementRef;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {}

  addIngredients(name: HTMLInputElement) {
    this.shoppingListService.addIngredient.emit(
      new Ingridient(name.value, this.inputAmount.nativeElement.value)
    );
  }
}

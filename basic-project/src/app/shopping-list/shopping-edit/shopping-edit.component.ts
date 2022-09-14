import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingridient } from 'src/app/shered/ingredient.model';
import { ShoppingListService } from '../shoppingList.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  constructor(private shoppingListService: ShoppingListService) {}
  editMode = false;
  editIndexNumber: number;

  ngOnInit(): void {
    this.shoppingListService.editIndex.subscribe((num) => {
      this.editMode = true;
      this.editIndexNumber = num;
    });
  }

  addIngredients(form: NgForm) {
    const value = form.value;
    this.shoppingListService.addIngredientAndEmit(
      new Ingridient(value.inputName, value.inputAmount)
    );
  }
}

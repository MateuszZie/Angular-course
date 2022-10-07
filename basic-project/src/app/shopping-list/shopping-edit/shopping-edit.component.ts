import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingridient } from 'src/app/shered/ingredient.model';
import { ShoppingListService } from '../shoppingList.service';
import * as ShoppingActions from '../shopping-list.actions';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('form') form: NgForm;
  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<{ shoppingList: { ingredients: Ingridient[] } }>
  ) {}
  editSubscryption: Subscription;
  editMode = false;
  editIndexNumber: number;
  editedIngredient: Ingridient;

  ngOnInit(): void {
    this.editSubscryption = this.shoppingListService.editIndex.subscribe(
      (index) => {
        this.editMode = true;
        this.editIndexNumber = index;
        this.editedIngredient =
          this.shoppingListService.getIngredientByindexId(index);
        this.form.setValue({
          inputName: this.editedIngredient.name,
          inputAmount: this.editedIngredient.amount,
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.editSubscryption.unsubscribe();
  }

  addOrUpdateIngredients() {
    const value = this.form.value;
    const newIngredient = new Ingridient(value.inputName, value.inputAmount);
    if (this.editMode) {
      this.shoppingListService.updateIngredientByIndexId(
        this.editIndexNumber,
        newIngredient
      );
    } else {
      this.store.dispatch(new ShoppingActions.AddIngredient(newIngredient));
      // this.shoppingListService.addIngredientAndEmit(newIngredient);
    }
    this.clear();
  }

  delete() {
    this.shoppingListService.deleteIngredient(this.editIndexNumber);
    this.clear();
  }

  clear() {
    this.editMode = false;
    this.form.reset();
  }
}

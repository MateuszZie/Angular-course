import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shered/ingredient.model';
import * as ShoppingActions from '../shopping-list.actions';
import * as fromShoppingList from '../shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('form') form: NgForm;
  constructor(private store: Store<fromShoppingList.AppState>) {}
  editSubscription: Subscription;
  editMode = false;
  editedIngredient: Ingredient;

  ngOnInit(): void {
    this.editSubscription = this.store
      .select('shoppingList')
      .subscribe((stateDate) => {
        if (stateDate.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editedIngredient = stateDate.editedIngredient;
          this.form.setValue({
            inputName: this.editedIngredient.name,
            inputAmount: this.editedIngredient.amount,
          });
        } else {
          this.editMode = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.editSubscription.unsubscribe();
  }

  addOrUpdateIngredients() {
    const value = this.form.value;
    const newIngredient = new Ingredient(value.inputName, value.inputAmount);
    if (this.editMode) {
      this.store.dispatch(new ShoppingActions.UpdateIngredient(newIngredient));
    } else {
      this.store.dispatch(new ShoppingActions.AddIngredient(newIngredient));
    }
    this.clear();
  }

  delete() {
    this.store.dispatch(new ShoppingActions.DeleteIngredient());
    this.clear();
  }

  clear() {
    this.editMode = false;
    this.form.reset();
    this.store.dispatch(new ShoppingActions.StopEdit());
  }
}

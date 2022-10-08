import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shered/ingredient.model';
import { ShoppingListService } from '../shoppingList.service';
import * as ShoppingActions from '../shopping-list.actions';
import * as fromShoppingList from '../shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('form') form: NgForm;
  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<fromShoppingList.AppState>
  ) {}
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

    // this.editSubscription = this.shoppingListService.editIndex.subscribe(
    //   (index) => {
    //     this.editMode = true;
    //     this.editIndexNumber = index;
    //     this.editedIngredient =
    //       this.shoppingListService.getIngredientByindexId(index);
    //     this.form.setValue({
    //       inputName: this.editedIngredient.name,
    //       inputAmount: this.editedIngredient.amount,
    //     });
    //   }
    // );
  }

  ngOnDestroy(): void {
    this.editSubscription.unsubscribe();
  }

  addOrUpdateIngredients() {
    const value = this.form.value;
    const newIngredient = new Ingredient(value.inputName, value.inputAmount);
    if (this.editMode) {
      // this.shoppingListService.updateIngredientByIndexId(
      //   this.editIndexNumber,
      //   newIngredient
      // );
      this.store.dispatch(new ShoppingActions.UpdateIngredient(newIngredient));
    } else {
      this.store.dispatch(new ShoppingActions.AddIngredient(newIngredient));
      // this.shoppingListService.addIngredientAndEmit(newIngredient);
    }
    this.clear();
  }

  delete() {
    this.store.dispatch(new ShoppingActions.DeleteIngredient());
    // this.shoppingListService.deleteIngredient(this.editIndexNumber);
    this.clear();
  }

  clear() {
    this.editMode = false;
    this.form.reset();
    this.store.dispatch(new ShoppingActions.StopEdit());
  }
}

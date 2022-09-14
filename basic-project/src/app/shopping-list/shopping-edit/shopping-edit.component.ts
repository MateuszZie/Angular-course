import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingridient } from 'src/app/shered/ingredient.model';
import { ShoppingListService } from '../shoppingList.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('form') form: NgForm;
  constructor(private shoppingListService: ShoppingListService) {}
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
    if (this.editMode) {
      this.shoppingListService.updateIngredientByIndexId(
        this.editIndexNumber,
        new Ingridient(value.inputName, value.inputAmount)
      );
    } else {
      this.shoppingListService.addIngredientAndEmit(
        new Ingridient(value.inputName, value.inputAmount)
      );
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

import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Ingridient } from 'src/app/shered/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  @Output() addedIngridients = new EventEmitter<Ingridient>();
  @ViewChild('inputAmount') inputAmount: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  addIngredients(name: HTMLInputElement) {
    this.addedIngridients.emit(
      new Ingridient(name.value, this.inputAmount.nativeElement.value)
    );
  }
}

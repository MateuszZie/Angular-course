import { Component, OnInit } from '@angular/core';
import { Ingridient } from '../shered/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingridient[] = [
    new Ingridient('apples', 5),
    new Ingridient('tomatoes', 10),
  ];

  constructor() {}

  ngOnInit(): void {}
}

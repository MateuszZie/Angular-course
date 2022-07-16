import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'Recipe Description',
      'https://img.delicious.com.au/ZCVFCYn_/del/2022/02/chicken-chickpea-curry-163942-1.jpg'
    ),
  ];

  constructor() {}

  ngOnInit(): void {}
}

import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipeChangeObservable: Subscription;
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) {}
  ngOnDestroy(): void {
    this.recipeChangeObservable.unsubscribe();
  }

  ngOnInit(): void {
    this.recipeChangeObservable = this.recipeService.recipeChanged.subscribe(
      (recipies) => (this.recipes = recipies)
    );
    this.recipes = this.recipeService.getRecipes();
  }
}

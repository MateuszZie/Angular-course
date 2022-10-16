import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipes.model';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';
import * as RecipeActions from '../store/recipes.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private recipeService: RecipeService,
    private rout: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.rout.params
      .pipe(
        map((params) => +params['id']),
        switchMap((id) => {
          this.id = id;
          return this.store.select('recipes');
        }),
        map((recipesStore) =>
          recipesStore.recipes.find((recipe, index) => index === this.id)
        )
      )
      .subscribe((recipe) => {
        this.recipe = recipe;
      });
  }

  addIngeredientToShopingList() {
    this.recipeService.addIngredientToShoppingList(this.recipe.ingredients);
  }

  deleteRecipe() {
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id));
  }
}

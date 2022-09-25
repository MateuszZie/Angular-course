import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipes.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  private RECIPES_ADRES =
    'https://ng-complete-guide-ce1ed-default-rtdb.europe-west1.firebasedatabase.app/recipes.json';
  constructor(
    private httpClient: HttpClient,
    private recipeServices: RecipeService
  ) {}

  storeRecipes() {
    const recipes = this.recipeServices.getRecipes();
    this.httpClient.put(this.RECIPES_ADRES, recipes).subscribe((response) => {
      console.log(response);
    });
  }

  fetchRecipes() {
    this.httpClient.get<Recipe[]>(this.RECIPES_ADRES).subscribe((data) => {
      this.recipeServices.setRecipes(data);
    });
  }
}

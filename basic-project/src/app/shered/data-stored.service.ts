import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipes.model';
import { exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  private RECIPES_ADRES =
    'https://ng-complete-guide-ce1ed-default-rtdb.europe-west1.firebasedatabase.app/recipes.json';
  constructor(
    private httpClient: HttpClient,
    private recipeServices: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipeServices.getRecipes();
    this.httpClient.put(this.RECIPES_ADRES, recipes).subscribe((response) => {
      console.log(response);
    });
  }

  fetchRecipes() {
    return this.httpClient.get<Recipe[]>(this.RECIPES_ADRES).pipe(
      map((recipes) =>
        recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        })
      ),
      tap((data) => this.recipeServices.setRecipes(data))
    );
  }
}

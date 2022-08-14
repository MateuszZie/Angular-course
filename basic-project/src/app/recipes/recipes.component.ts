import { Component, OnInit } from '@angular/core';
import { RecipeService } from './recipe.service';
import { Recipe } from './recipes.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService],
})
export class RecipesComponent implements OnInit {
  recipe: Recipe;

  constructor(private recipeServce: RecipeService) {}

  ngOnInit(): void {
    this.recipeServce.clickedRecipe.subscribe(
      (recipe: Recipe) => (this.recipe = recipe)
    );
  }
}

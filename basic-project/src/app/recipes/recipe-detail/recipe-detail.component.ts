import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;

  constructor(
    private recipeService: RecipeService,
    private rout: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.rout.params.subscribe((params: Params) => {
      this.recipe = this.recipeService.getRecipe(+params['id']);
    });
  }

  addIngeredientToShopingList() {
    this.recipeService.addIngeredientToShopingList(this.recipe.ingredients);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean;
  recipeForm: FormGroup;

  constructor(
    private rout: ActivatedRoute,
    private recipeServis: RecipeService
  ) {}

  ngOnInit(): void {
    this.rout.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = this.id || this.id === 0 ? true : false;
      this.initForm();
    });
  }

  onSubmit() {
    console.log(this.recipeForm.value);
  }

  initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';

    if (this.editMode) {
      const recipe = this.recipeServis.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imgPath;
      recipeDescription = recipe.description;
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName),
      imgPath: new FormControl(recipeImagePath),
      description: new FormControl(recipeDescription),
    });
  }
}

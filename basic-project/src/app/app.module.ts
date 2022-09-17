import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Header } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownDirective } from './shered/dropdown.directive';
import { ShoppingListService } from './shopping-list/shoppingList.service';
import { AppRoutModule } from './app-routing.module';
import { RecipeNoDetailComponent } from './recipes/recipe-no-detail/recipe-no-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    Header,
    RecipesComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective,
    RecipeNoDetailComponent,
    RecipeEditComponent,
  ],
  imports: [BrowserModule, FormsModule, AppRoutModule, ReactiveFormsModule],
  providers: [ShoppingListService],
  bootstrap: [AppComponent],
})
export class AppModule {}

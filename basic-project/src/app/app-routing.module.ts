import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const appRouts: Routes = [
  { path: '', redirectTo: '/recipies', pathMatch: 'full' },
  {
    path: 'recipies',
    component: RecipesComponent,
    children: [{ path: 'detail', component: RecipeDetailComponent }],
  },
  { path: 'shopping-list', component: ShoppingListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRouts)],
  exports: [RouterModule],
})
export class AppRoutModule {}

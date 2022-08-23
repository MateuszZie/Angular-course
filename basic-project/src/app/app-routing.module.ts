import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const appRouts: Routes = [
  { path: '', redirectTo: '/recipies', pathMatch: 'full' },
  { path: 'recipies', component: RecipesComponent },
  { path: 'shopping-list', component: ShoppingListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRouts)],
  exports: [RouterModule],
})
export class AppRoutModule {}

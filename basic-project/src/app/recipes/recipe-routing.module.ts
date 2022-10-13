import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeNoDetailComponent } from './recipe-no-detail/recipe-no-detail.component';
import { RecipesResolverService } from './recipe-resolver.service';
import { RecipesComponent } from './recipes.component';

const appRouts: Routes = [
  {
    path: '',
    component: RecipesComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: 'detail/:id',
        component: RecipeDetailComponent,
        resolve: [RecipesResolverService],
      },
      { path: 'new', component: RecipeEditComponent },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: [RecipesResolverService],
      },
      { path: '', component: RecipeNoDetailComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(appRouts)],
  exports: [RouterModule],
})
export class RecipeRoutingModule {}

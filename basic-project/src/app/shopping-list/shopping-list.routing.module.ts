import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from './shopping-list.component';

const appRout: Routes = [
  { path: 'shopping-list', component: ShoppingListComponent },
];

@NgModule({ imports: [RouterModule.forRoot(appRout)], exports: [RouterModule] })
export class ShoppingListRouter {}

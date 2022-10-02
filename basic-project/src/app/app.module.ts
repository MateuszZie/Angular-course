import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Header } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownDirective } from './shered/dropdown.directive';
import { ShoppingListService } from './shopping-list/shoppingList.service';
import { AppRoutModule } from './app-routing.module';
import { RecipeService } from './recipes/recipe.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { LoadingSppinerComponent } from './shered/loading-spiner/loading-spiner.component';
import { AuthInterceptorService } from './auth/authInterceptor.service';
import { AlertComponent } from './shered/alert/alert/alert.component';
import { PlaceHolderDirective } from './shered/placeholder.directive';
import { RecipeModule } from './recipes/recipe.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './shered/shared.module';

@NgModule({
  declarations: [AppComponent, Header, AuthComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutModule,
    ReactiveFormsModule,
    HttpClientModule,
    RecipeModule,
    ShoppingListModule,
    SharedModule,
  ],
  providers: [
    ShoppingListService,
    RecipeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

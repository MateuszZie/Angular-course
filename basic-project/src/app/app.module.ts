import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Header } from './header/header.component';
import { AppRoutModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shered/shared.module';
import { CoreModule } from './core.module';
import { StoreModule } from '@ngrx/store';
import * as fromAppStore from './store/app.reducer';
import { AuthEffects } from './auth/store/auth.effects';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [AppComponent, Header],
  imports: [
    BrowserModule,
    AppRoutModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    StoreModule.forRoot(fromAppStore.appReducer),
    EffectsModule.forRoot([AuthEffects]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

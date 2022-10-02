import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert/alert.component';
import { DropdownDirective } from './dropdown.directive';
import { LoadingSppinerComponent } from './loading-spiner/loading-spiner.component';
import { PlaceHolderDirective } from './placeholder.directive';

@NgModule({
  declarations: [
    DropdownDirective,
    LoadingSppinerComponent,
    AlertComponent,
    PlaceHolderDirective,
  ],
  imports: [CommonModule],
  exports: [
    DropdownDirective,
    LoadingSppinerComponent,
    AlertComponent,
    PlaceHolderDirective,
    CommonModule,
  ],
})
export class SharedModule {}

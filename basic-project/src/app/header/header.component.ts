import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class Header {
  @Output() display = new EventEmitter<string>();

  changeView(viewName: string): void {
    this.display.emit(viewName);
  }
}

import { state, style, trigger } from "@angular/animations";
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  animations: [
    trigger("divState", [
      state(
        "normal",
        style({ "background-color": "red", transform: "translateX(0)" })
      ),
      state(
        "highlight",
        style({ "background-color": "blue", transform: "translateX(100px)" })
      ),
    ]),
  ],
})
export class AppComponent {
  state = "normal";
  list = ["Milk", "Sugar", "Bread"];

  onAdd(item) {
    this.list.push(item);
  }
}

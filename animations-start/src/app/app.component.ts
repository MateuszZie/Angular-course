import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
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
        "highlighted",
        style({ "background-color": "blue", transform: "translateX(100px)" })
      ),
      transition("normal <=> highlighted", animate(500)),
    ]),
    trigger("wildState", [
      state(
        "normal",
        style({
          "background-color": "red",
          transform: "translateX(0)  scale(1)",
        })
      ),
      state(
        "highlighted",
        style({
          "background-color": "blue",
          transform: "translateX(100px)  scale(1)",
        })
      ),
      state(
        "shrunken",
        style({
          "background-color": "green",
          transform: "translateX(0px) scale(0.5)",
        })
      ),
      transition("normal => highlighted", animate(300)),
      transition("highlighted => normal", animate(800)),
      transition("shrunken <=> *", [
        style({ "background-color": "orange" }),
        animate(1000, style({ borderRadius: "50px" })),
        animate(500),
      ]),
    ]),
    trigger("list1", [
      state("in", style({ opacity: 1, transform: "translateX(0px)" })),
      transition("void => *", [
        style({ opacity: 0, transform: "translateX(-200px)" }),
        animate(2000),
      ]),
      transition("* => void", [
        animate(2000),
        style({ opacity: 0, transform: "translateX(200px)" }),
      ]),
    ]),
    trigger("list2", [
      state("in", style({ opacity: 1, transform: "translateX(0px)" })),
      transition("void => *", [
        animate(
          2000,
          keyframes([
            style({ opacity: 0, transform: "translateX(-200px)", offset: 0 }),
            style({
              opacity: 0.5,
              transform: "translateX(-100px)",
              offset: 0.3,
            }),
            style({
              opacity: 1,
              transform: "translateX(-20px)",
              offset: 0.8,
            }),
            style({ opacity: 1, transform: "translateX(0px)", offset: 1 }),
          ])
        ),
      ]),
      transition("* => void", [
        animate(2000),
        style({ opacity: 0, transform: "translateX(200px)" }),
      ]),
    ]),
  ],
})
export class AppComponent {
  state = "normal";
  wildState = "normal";
  list = ["Milk", "Sugar", "Bread"];

  onAnimation() {
    this.state = this.state === "normal" ? "highlighted" : "normal";
    this.wildState = this.wildState === "normal" ? "highlighted" : "normal";
  }

  onShrank() {
    this.wildState = "shrunken";
  }

  onAdd(item) {
    this.list.push(item);
  }

  onDelete(item) {
    this.list = this.list.filter((s) => s !== item);
  }
}

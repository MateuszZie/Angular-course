import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-game-control",
  templateUrl: "./game-control.component.html",
  styleUrls: ["./game-control.component.css"],
})
export class GameControlComponent implements OnInit {
  time: number = 0;
  evenNumbers: number[] = [];
  oddNumbers: number[] = [];
  myInterval;

  constructor() {}

  ngOnInit(): void {}

  start() {
    this.myInterval = setInterval(() => {
      this.time++;
      if (this.time % 2 === 0) {
        this.evenNumbers.push(this.time);
      } else {
        this.oddNumbers.push(this.time);
      }
    }, 1000);
  }

  stop() {
    clearInterval(this.myInterval);
    this.time = 0;
    this.evenNumbers = [];
    this.oddNumbers = [];
  }
}

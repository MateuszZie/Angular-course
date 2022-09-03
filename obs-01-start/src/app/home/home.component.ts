import { Component, OnDestroy, OnInit } from "@angular/core";
import { interval, Observable, Subscription } from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstSybscribe: Subscription;

  constructor() {}
  ngOnDestroy(): void {
    this.firstSybscribe.unsubscribe();
  }

  ngOnInit() {
    // this.firstSybscribe = interval(1000).subscribe((count) => {
    //   console.log(count);
    // });
    const customIntervalObsrevable = Observable.create((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        count++;
      }, 1000);
    });
    this.firstSybscribe = customIntervalObsrevable.subscribe((data) => {
      console.log(data);
    });
  }
}

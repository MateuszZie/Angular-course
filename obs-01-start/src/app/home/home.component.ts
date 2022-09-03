import { Component, OnDestroy, OnInit } from "@angular/core";
import { interval, Observable, Subscription } from "rxjs";
import { filter, map } from "rxjs/operators";

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
        if (count === 4) {
          observer.error(new Error("To mouch counting"));
        }
        if (count === 3) {
          observer.complete();
        }
        count++;
      }, 1000);
    });
    this.firstSybscribe = customIntervalObsrevable
      .pipe(
        filter((data) => data > 1),
        map((data: number) => "Round: " + (data + 1))
      )
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
          alert("4 is to much");
        },
        () => {
          console.log("Counting completed!");
        }
      );
  }
}

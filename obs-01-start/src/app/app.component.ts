import { Component, OnDestroy, OnInit } from "@angular/core";
import { UserService } from "./user.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  constructor(private userService: UserService) {}

  userActivated = false;

  ngOnInit() {
    this.userService.mySubject.subscribe((data) => (this.userActivated = data));
  }

  ngOnDestroy(): void {
    this.userService.mySubject.unsubscribe();
  }
}

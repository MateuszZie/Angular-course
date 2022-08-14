import { Component, OnInit } from "@angular/core";
import { CounterService } from "../counter.service";
import { UserService } from "../users.service";

@Component({
  selector: "app-active-users",
  templateUrl: "./active-users.component.html",
  styleUrls: ["./active-users.component.css"],
  providers: [CounterService],
})
export class ActiveUsersComponent implements OnInit {
  users: string[];

  constructor(
    private usersService: UserService,
    private counterService: CounterService
  ) {}

  ngOnInit(): void {
    this.users = this.usersService.activeUsers;
  }
  onSetToInactive(id: number) {
    this.usersService.onSetToInactive(id);
    this.counterService.incraseAndLogSwitch("active->inactive");
  }
}

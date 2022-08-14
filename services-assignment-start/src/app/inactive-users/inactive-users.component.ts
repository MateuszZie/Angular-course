import { Component, OnInit } from "@angular/core";
import { CounterService } from "../counter.service";
import { UserService } from "../users.service";

@Component({
  selector: "app-inactive-users",
  templateUrl: "./inactive-users.component.html",
  styleUrls: ["./inactive-users.component.css"],
  providers: [CounterService],
})
export class InactiveUsersComponent implements OnInit {
  users: string[];

  constructor(
    private usersService: UserService,
    private counterService: CounterService
  ) {}

  ngOnInit(): void {
    this.users = this.usersService.inactiveUsers;
  }

  onSetToActive(id: number) {
    this.usersService.onSetToActive(id);
    this.counterService.incraseAndLogSwitch("incative->active");
  }
}

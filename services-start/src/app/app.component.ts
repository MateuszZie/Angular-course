import { Component, OnInit } from "@angular/core";
import { AccountService } from "./accounts.services";
import { LoggingService } from "./logging.services";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [AccountService, LoggingService],
})
export class AppComponent implements OnInit {
  accounts: { name: string; status: string }[] = [];

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.accounts = this.accountService.accounts;
  }
}
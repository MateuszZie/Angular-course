import { Component, OnInit } from "@angular/core";
import { AccountService } from "./accounts.services";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  accounts: { name: string; status: string }[] = [];

  constructor(private accountService: AccountService) {
    accountService.updateStatus.subscribe((status: string) =>
      alert("New status " + status)
    );
  }

  ngOnInit(): void {
    this.accounts = this.accountService.accounts;
  }
}

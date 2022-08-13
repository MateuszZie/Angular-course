import { Component, EventEmitter, Output } from "@angular/core";
import { AccountService } from "../accounts.services";
import { LoggingService } from "../logging.services";

@Component({
  selector: "app-new-account",
  templateUrl: "./new-account.component.html",
  styleUrls: ["./new-account.component.css"],
  providers: [LoggingService],
})
export class NewAccountComponent {
  constructor(
    private loggingService: LoggingService,
    private accountService: AccountService
  ) {}

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountService.onAccountAdded({
      name: accountName,
      status: accountStatus,
    });
    this.loggingService.logStatusChange(accountStatus);
  }
}

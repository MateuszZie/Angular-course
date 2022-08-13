import { Component, EventEmitter, Input, Output } from "@angular/core";
import { AccountService } from "../accounts.services";
import { LoggingService } from "../logging.services";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.css"],
  providers: [LoggingService],
})
export class AccountComponent {
  @Input() account: { name: string; status: string };
  @Input() id: number;

  constructor(
    private loggingService: LoggingService,
    private accountService: AccountService
  ) {}

  onSetTo(status: string) {
    this.accountService.onStatusChanged({ id: this.id, newStatus: status });
    this.loggingService.logStatusChange(status);
  }
}

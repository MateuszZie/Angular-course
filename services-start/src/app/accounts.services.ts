import { Injectable } from "@angular/core";
import { LoggingService } from "./logging.services";

@Injectable()
export class AccountService {
  constructor(private loggingService: LoggingService) {}
  accounts = [
    {
      name: "Master Account",
      status: "active",
    },
    {
      name: "Testaccount",
      status: "inactive",
    },
    {
      name: "Hidden Account",
      status: "unknown",
    },
  ];

  onAccountAdded(newAccount: { name: string; status: string }) {
    this.accounts.push(newAccount);
    this.loggingService.logStatusChange(newAccount.status);
  }

  onStatusChanged(updateInfo: { id: number; newStatus: string }) {
    this.accounts[updateInfo.id].status = updateInfo.newStatus;
    this.loggingService.logStatusChange(updateInfo.newStatus);
  }
}

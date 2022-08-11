import { Component, EventEmitter, Input, Output } from "@angular/core";
import { LoggingService } from "../logging.services";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.css"],
})
export class AccountComponent {
  @Input() account: { name: string; status: string };
  @Input() id: number;
  @Output() statusChanged = new EventEmitter<{
    id: number;
    newStatus: string;
  }>();

  onSetTo(status: string) {
    this.statusChanged.emit({ id: this.id, newStatus: status });
    LoggingService.logStatusChange(status);
  }
}

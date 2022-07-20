import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-cockpit",
  templateUrl: "./cockpit.component.html",
  styleUrls: ["./cockpit.component.css"],
})
export class CockpitComponent implements OnInit {
  newServerName = "";
  newServerContent = "";
  @Output() addServer = new EventEmitter<{
    serverName: string;
    serverContent: string;
  }>();
  @Output("addBlue") addBluePrint = new EventEmitter<{
    serverName: string;
    serverContent: string;
  }>();
  constructor() {}

  ngOnInit(): void {}

  onAddServer() {
    this.addServer.emit({
      serverName: this.newServerName,
      serverContent: this.newServerContent,
    });
  }

  onAddBlueprint() {
    this.addBluePrint.emit({
      serverName: this.newServerName,
      serverContent: this.newServerContent,
    });
  }
}

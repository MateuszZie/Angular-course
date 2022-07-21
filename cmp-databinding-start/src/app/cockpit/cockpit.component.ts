import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";

@Component({
  selector: "app-cockpit",
  templateUrl: "./cockpit.component.html",
  styleUrls: ["./cockpit.component.css"],
})
export class CockpitComponent implements OnInit {
  // newServerName = "";
  // newServerContent = "";
  @ViewChild("serverContentInput") serverContent: ElementRef;
  @Output()
  addServer = new EventEmitter<{
    serverName: string;
    serverContent: string;
  }>();
  @Output("addBlue") addBluePrint = new EventEmitter<{
    serverName: string;
    serverContent: string;
  }>();
  constructor() {}

  ngOnInit(): void {}

  onAddServer(serverName: HTMLInputElement) {
    console.log(this.serverContent);
    this.addServer.emit({
      serverName: serverName.value,
      serverContent: this.serverContent.nativeElement.value,
    });
  }

  onAddBlueprint(serverName: HTMLInputElement) {
    this.addBluePrint.emit({
      serverName: serverName.value,
      serverContent: this.serverContent.nativeElement.value,
    });
  }
}

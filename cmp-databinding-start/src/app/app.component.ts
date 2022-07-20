import { Component, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  serverElements = [{ name: "Test", content: "conTest", type: "server" }];

  onServerAdded(serverTemplate: { serverName: string; serverContent: string }) {
    this.serverElements.push({
      type: "server",
      name: serverTemplate.serverName,
      content: serverTemplate.serverContent,
    });
  }

  onBlueprintAdded(bluePrintTemplate: {
    serverName: string;
    serverContent: string;
  }) {
    this.serverElements.push({
      type: "blueprint",
      name: bluePrintTemplate.serverName,
      content: bluePrintTemplate.serverContent,
    });
  }
}

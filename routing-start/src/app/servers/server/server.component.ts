import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Data, Params, Router } from "@angular/router";

import { ServersService } from "../servers.service";

@Component({
  selector: "app-server",
  templateUrl: "./server.component.html",
  styleUrls: ["./server.component.css"],
})
export class ServerComponent implements OnInit {
  server: { id: number; name: string; status: string };

  constructor(
    private serversService: ServersService,
    private rout: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // this.rout.params.subscribe((params: Params) => {
    //   this.server = this.serversService.getServer(+params["id"]);
    // });
    this.rout.data.subscribe((data: Data) => {
      this.server = data["server"];
    });
  }

  onEdit() {
    this.router.navigate(["edit"], {
      relativeTo: this.rout,
      queryParamsHandling: "preserve",
    });
  }
}

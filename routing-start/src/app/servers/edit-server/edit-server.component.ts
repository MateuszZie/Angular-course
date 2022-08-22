import { Component, OnInit } from "@angular/core";
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Params,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";

import { ServersService } from "../servers.service";
import {
  CanComponentDeactive,
  CanDeactivateGuard,
} from "./can-deactivate-guard-service";

@Component({
  selector: "app-edit-server",
  templateUrl: "./edit-server.component.html",
  styleUrls: ["./edit-server.component.css"],
})
export class EditServerComponent implements OnInit, CanDeactivateGuard {
  server: { id: number; name: string; status: string };
  serverName = "";
  serverStatus = "";
  allowEdit = false;
  savedChanged = false;

  constructor(
    private serversService: ServersService,
    private rout: ActivatedRoute,
    private router: Router
  ) {}

  canDeactivate(
    component: CanComponentDeactive,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (!this.allowEdit) {
      return true;
    }

    if (
      this.serverName !== this.server.name ||
      this.serverStatus !== this.server.status
    ) {
      return confirm("Do you want discharge without save??");
    } else {
      return true;
    }
  }

  ngOnInit() {
    // console.log(this.rout.snapshot.queryParams);
    // console.log(this.rout.snapshot.fragment);
    this.rout.fragment.subscribe();
    this.rout.queryParams.subscribe((queryParams: Params) => {
      this.allowEdit = queryParams["allowEdit"] === "1" ? true : false;
    });
    this.rout.params.subscribe((params: Params) => {
      this.server = this.serversService.getServer(+params["id"]);
    });
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {
      name: this.serverName,
      status: this.serverStatus,
    });
    this.savedChanged = true;
    this.router.navigate(["../"], { relativeTo: this.rout });
  }
}

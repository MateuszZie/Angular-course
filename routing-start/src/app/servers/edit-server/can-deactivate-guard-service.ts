import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs/Observable";

export interface CanComponentDeactive {
  canDeactivate: () =>
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>;
}

export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactive> {
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
    return component.canDeactivate();
  }
}

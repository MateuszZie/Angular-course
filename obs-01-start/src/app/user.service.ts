import { Injectable, OnInit } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class UserService {
  mySubject = new Subject<boolean>();
}

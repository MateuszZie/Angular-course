import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Data } from "@angular/router";

@Component({
  selector: "app-error-page",
  templateUrl: "./error-page.component.html",
  styleUrls: ["./error-page.component.css"],
})
export class ErrorPageComponent implements OnInit {
  errroMesage: string;

  constructor(private rout: ActivatedRoute) {}

  ngOnInit(): void {
    this.rout.data.subscribe((data: Data) => {
      this.errroMesage = data.messagge;
    });
  }
}

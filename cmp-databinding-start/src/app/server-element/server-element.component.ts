import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";

@Component({
  selector: "app-server-element",
  templateUrl: "./server-element.component.html",
  styleUrls: ["./server-element.component.css"],
})
export class ServerElementComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewChecked,
    AfterViewInit,
    OnDestroy
{
  @Input("srvElement") element: { name: string; content: string; type: string };
  @Input() name: string;

  constructor() {
    console.log("constructor called!");
  }
  ngOnDestroy(): void {
    console.log("On Destroy called");
  }
  ngAfterContentChecked(): void {
    console.log("AfterContentChecked called!");
  }
  ngAfterViewChecked(): void {
    console.log("AfterViewChecked called!");
  }
  ngAfterViewInit(): void {
    console.log("afterViewInit Called");
  }
  ngAfterContentInit(): void {
    console.log("afterContentInit Called");
  }
  ngDoCheck(): void {
    console.log("DoCheck called!");
  }

  ngOnInit(): void {
    console.log("ngOninit called!");
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("NgOnChanges called!");
    console.log(changes);
  }
}

import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
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

  @ViewChild("header", { static: true }) header: ElementRef;

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
    console.log("Header text: " + this.header.nativeElement.textContent);
  }

  ngAfterContentInit(): void {
    console.log("afterContentInit Called");
  }
  ngDoCheck(): void {
    console.log("DoCheck called!");
  }

  ngOnInit(): void {
    console.log("ngOninit called!");
    console.log("Header text: " + this.header.nativeElement.textContent);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("NgOnChanges called!");
    console.log(changes);
  }
}

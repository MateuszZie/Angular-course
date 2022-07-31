import { Directive, ElementRef, OnInit } from "@angular/core";

@Directive({
  selector: "[appHighLight]",
})
export class BasicHighlightDirective implements OnInit {
  constructor(private element: ElementRef) {}
  ngOnInit(): void {
    this.element.nativeElement.style.color = "red";
  }
}

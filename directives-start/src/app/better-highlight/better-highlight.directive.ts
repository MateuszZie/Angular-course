import {
  Directive,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
} from "@angular/core";

@Directive({
  selector: "[appBetterHighlight]",
})
export class BetterHighlightDirective implements OnInit {
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}
  ngOnInit(): void {
    // this.renderer.setStyle(this.elRef.nativeElement, "color", "green");
  }

  @HostListener("mouseenter") mouseOver(event: Event) {
    this.renderer.setStyle(this.elRef.nativeElement, "color", "green");
  }

  @HostListener("mouseleave") mouseLeave(event: Event) {
    this.renderer.setStyle(this.elRef.nativeElement, "color", "black");
  }
}

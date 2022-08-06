import {
  Directive,
  ElementRef,
  HostBinding,
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

  @HostBinding("style.color") textColor: string = "black";

  @HostListener("mouseenter") mouseOver(event: Event) {
    // this.renderer.setStyle(this.elRef.nativeElement, "color", "green");
    this.textColor = "green";
  }

  @HostListener("mouseleave") mouseLeave(event: Event) {
    // this.renderer.setStyle(this.elRef.nativeElement, "color", "black");
    this.textColor = "black";
  }
}

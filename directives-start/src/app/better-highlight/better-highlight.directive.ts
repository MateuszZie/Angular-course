import { getCurrencySymbol } from "@angular/common";
import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from "@angular/core";

@Directive({
  selector: "[appBetterHighlight]",
})
export class BetterHighlightDirective implements OnInit {
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}
  ngOnInit(): void {
    this.textColor = this.deafultColor;
    // this.renderer.setStyle(this.elRef.nativeElement, "color", "green");
  }
  @Input() deafultColor: string = "black";
  @Input("appBetterHighlight") highLightColor: string = "green";
  @HostBinding("style.color") textColor: string;

  @HostListener("mouseenter") mouseOver(event: Event) {
    // this.renderer.setStyle(this.elRef.nativeElement, "color", "green");
    this.textColor = this.highLightColor;
  }

  @HostListener("mouseleave") mouseLeave(event: Event) {
    // this.renderer.setStyle(this.elRef.nativeElement, "color", "black");
    this.textColor = this.deafultColor;
  }
}

import { Directive, Input, HostListener, Renderer, ElementRef } from '@angular/core';

@Directive({
  selector: '[mbHoverClass]'
})
export class HoverClassDirective {

  @Input() mbHoverClass: string;

  constructor(
    public elementRef: ElementRef,
    private renderer: Renderer
  ) { }

  @HostListener('mouseover') mouseover() {
    this.renderer.setElementClass(this.elementRef.nativeElement, this.mbHoverClass, true);
  }

  @HostListener('mouseout') mouseout() {
    this.renderer.setElementClass(this.elementRef.nativeElement, this.mbHoverClass, false);
  }
}

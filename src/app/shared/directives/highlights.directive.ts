import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlights]'
})
export class HighlightsDirective {

  constructor(el: ElementRef) {
    el.nativeElement.style.backgroundColor = 'gold';
   }

}

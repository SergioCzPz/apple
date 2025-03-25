import { Directive, ElementRef, inject } from '@angular/core';
import { HighlightService } from '../services/highlight.service';

@Directive({
  selector: '[appVideoDivRef]',
})
export class VideoDivRefDirective {
  private readonly highlightService = inject(HighlightService);

  constructor(videoDivRef: ElementRef<HTMLSpanElement>) {
    this.highlightService.htmlVideoDivRefs.push(videoDivRef);
  }
}

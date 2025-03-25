import { Directive, ElementRef, inject } from '@angular/core';
import { HighlightService } from '../services/highlight.service';

@Directive({
  selector: '[appVideoSpanRef]',
})
export class VideoSpanRefDirective {
  private readonly highlightService = inject(HighlightService);

  constructor(videoSpanRef: ElementRef<HTMLSpanElement>) {
    this.highlightService.htmlVideoSpanRefs.push(videoSpanRef);
  }
}

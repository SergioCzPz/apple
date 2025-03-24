import { Directive, ElementRef, inject } from '@angular/core';
import { HighlightService } from '../services/highlight.service';

@Directive({
  selector: '[appHighlightSlide]',
})
export class HighlightSlideDirective {
  private readonly highlightService = inject(HighlightService);

  constructor(slideVideo: ElementRef<HTMLVideoElement>) {
    this.highlightService.htmlVideos.push(slideVideo);
  }
}

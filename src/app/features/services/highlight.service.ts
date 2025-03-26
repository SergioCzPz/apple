import { ElementRef, Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class HighlightService {
  public htmlVideos: ElementRef<HTMLVideoElement>[];
  public htmlVideoSpanRefs: ElementRef<HTMLSpanElement>[];
  public htmlVideoDivRefs: ElementRef<HTMLSpanElement>[];

  constructor() {
    this.htmlVideos = [];
    this.htmlVideoSpanRefs = [];
    this.htmlVideoDivRefs = [];
  }
}

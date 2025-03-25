import { ElementRef, Injectable } from '@angular/core';
import { highlights } from '@constants/constants';
import {
  HightlightState,
  highlightAdapt,
} from 'src/app/shared/adapters/highlight.adapter';

@Injectable({
  providedIn: 'root',
})
export class HighlightService {
  public highlightStates: HightlightState[];
  public htmlVideos: ElementRef<HTMLVideoElement>[];
  public htmlVideoSpanRefs: ElementRef<HTMLSpanElement>[];
  public htmlVideoDivRefs: ElementRef<HTMLSpanElement>[];

  constructor() {
    this.highlightStates = highlightAdapt(highlights);
    this.htmlVideos = [];
    this.htmlVideoSpanRefs = [];
    this.htmlVideoDivRefs = [];
  }
}

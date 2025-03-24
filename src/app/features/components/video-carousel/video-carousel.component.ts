import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { HightlightState } from 'src/app/shared/adapters/highlight.adapter';
import { isPlatformBrowser } from '@angular/common';
import { HighlightSlideDirective } from '../../directives/highlight-slide.directive';
import { HighlightService } from '../../services/highlight.service';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-video-carousel',
  imports: [HighlightSlideDirective],
  templateUrl: './video-carousel.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoCarouselComponent implements AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly highlightService = inject(HighlightService);

  public highlightStates: HightlightState[];
  public activeHighlight!: HightlightState | undefined;
  public htmlVideos: ElementRef<HTMLVideoElement>[];

  constructor() {
    this.highlightStates = this.highlightService.highlightStates;
    this.htmlVideos = this.highlightService.htmlVideos;
    this.setActiveHighlight();
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    ScrollTrigger.create({
      trigger: '#slider',
      start: 'top center', // Ajusta según necesites
      end: 'bottom center', // Ajusta según necesites
      onEnter: () => {
        this.startPlay();
        console.log('Video play');
      },
    });
  }

  setActiveHighlight(): void {
    this.activeHighlight = this.highlightStates.find(
      highlight => highlight.startPlay === true
    );
  }

  startPlay(): void {
    const htmlvideo = this.htmlVideos.find(
      videoEl =>
        videoEl.nativeElement.id === `video-${this.activeHighlight?.id}`
    );
    htmlvideo?.nativeElement.play();
  }

  onPlay(event: Event): void {
    console.log('onPlay ', event);
    this.activeHighlight!.isPlaying = true;
  }

  onEnd(event: Event): void {
    console.log('onEnd ', event);
    this.moveSlide();
  }

  moveSlide(): void {
    if (this.activeHighlight?.isLastVideo) return;

    gsap.to(`#slider`, {
      transform: `translateX(${-100 * this.activeHighlight!.id}%)`,
      duration: 2,
      ease: 'power2.inOut',
      onComplete: () => {
        this.switchHighlightState();
        this.startPlay();
      },
    });
  }

  switchHighlightState(): void {
    this.desactiveHighligth();
    this.activateHighlight();
    this.setActiveHighlight();
  }

  // set startPlay to false to the past video
  desactiveHighligth(): void {
    const desactiveHighlight = this.highlightStates.find(
      highlight => highlight.id === this.activeHighlight!.id
    );

    desactiveHighlight!.isEnd = true;
    desactiveHighlight!.startPlay = false;
    desactiveHighlight!.isPlaying = false;
  }

  // set startPlay to true to the next video
  activateHighlight(): void {
    const activeHighlight = this.highlightStates.find(
      highlight => highlight.id === this.activeHighlight!.id + 1
    );

    activeHighlight!.startPlay = true;
  }
}

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
import { VideoDivRefDirective } from '../../directives/video-div-ref.directive';
import { VideoSpanRefDirective } from '../../directives/video-span-ref.directive';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-video-carousel',
  imports: [
    HighlightSlideDirective,
    VideoDivRefDirective,
    VideoSpanRefDirective,
  ],
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
  public htmlVideoSpanRefs: ElementRef<HTMLSpanElement>[];
  public htmlVideoDivRefs: ElementRef<HTMLSpanElement>[];

  constructor() {
    this.highlightStates = this.highlightService.highlightStates;
    this.htmlVideos = this.highlightService.htmlVideos;
    this.htmlVideoSpanRefs = this.highlightService.htmlVideoSpanRefs;
    this.htmlVideoDivRefs = this.highlightService.htmlVideoDivRefs;
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

    // this.animateSpan();
  }

  onPlay(event: Event): void {
    console.log('onPlay ', event);
    this.activeHighlight!.isPlaying = true;

    const spanId = `#${
      this.htmlVideoSpanRefs.find(
        span =>
          span.nativeElement.id === `videoSpanRef-${this.activeHighlight?.id}`
      )?.nativeElement.id
    }`;

    const videoDivRefId = `#${
      this.htmlVideoDivRefs.find(
        div =>
          div.nativeElement.id === `videoDivRef-${this.activeHighlight?.id}`
      )?.nativeElement.id
    }`;

    const htmlVideo = this.htmlVideos.find(
      video => video.nativeElement.id === `video-${this.activeHighlight?.id}`
    )?.nativeElement;

    let currentProgress = 0;

    const anim = gsap.to(videoDivRefId, {
      onUpdate: () => {
        const progress = Math.ceil(anim.progress() * 100);

        if (progress != currentProgress) {
          currentProgress = progress;

          gsap.to(videoDivRefId, {
            width:
              window.innerWidth < 760
                ? '10vw' // mobile
                : window.innerWidth < 1200
                  ? '10vw' // tablet
                  : '4vw', // laptop
          });

          gsap.to(spanId, {
            width: `${currentProgress}%`,
            backgroundColor: 'white',
          });
        }
      },

      onComplete: () => {
        if (this.activeHighlight?.isPlaying) {
          gsap.to(videoDivRefId, {
            width: '12px',
          });
          gsap.to(spanId, {
            backgroundColor: '#afafaf',
          });
        }
      },
    });

    const animUpdate = () => {
      anim.progress(htmlVideo!.currentTime / htmlVideo!.duration);
    };

    if (this.activeHighlight?.isPlaying) {
      gsap.ticker.add(animUpdate);
    } else {
      gsap.ticker.remove(animUpdate);
    }
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

  // animateSpan(): void {}
}

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  PLATFORM_ID,
  Signal,
  signal,
} from '@angular/core';
import { highlights } from '@constants/constants';
import { Highlight } from 'src/app/shared/types/constants.type';
import { HighlightSlideDirective } from '../../directives/highlight-slide.directive';
import { VideoDivRefDirective } from '../../directives/video-div-ref.directive';
import { VideoSpanRefDirective } from '../../directives/video-span-ref.directive';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { HighlightService } from '../../services/highlight.service';
import { isPlatformBrowser } from '@angular/common';
import { ActiveVideo } from 'src/app/shared/types/video.active.type';

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

  public highlights: Highlight[];
  public activeVideo: ActiveVideo;
  public activeVideoDivRef: Signal<ElementRef<HTMLSpanElement> | undefined>;
  public activeVideoSpanRef: Signal<ElementRef<HTMLSpanElement> | undefined>;
  public activeVideoHtml: Signal<ElementRef<HTMLVideoElement> | undefined>;
  public btnImgSrc: Signal<string>;
  public altBtnImg: Signal<string>;

  public htmlVideos: ElementRef<HTMLVideoElement>[];
  public htmlVideoSpanRefs: ElementRef<HTMLSpanElement>[];
  public htmlVideoDivRefs: ElementRef<HTMLSpanElement>[];

  constructor() {
    this.highlights = highlights;
    this.htmlVideos = this.highlightService.htmlVideos;
    this.htmlVideoSpanRefs = this.highlightService.htmlVideoSpanRefs;
    this.htmlVideoDivRefs = this.highlightService.htmlVideoDivRefs;
    this.activeVideo = {
      id: signal(1),
      isEnd: signal(false),
      isLastVideo: false,
      isPlaying: signal(false),
      wasPaused: false,
    };

    this.btnImgSrc = computed(() => {
      if (this.activeVideo.isLastVideo && this.activeVideo.isEnd()) {
        return 'assets/images/replay.svg';
      }

      if (this.activeVideo.isPlaying() === false) {
        return 'assets/images/play.svg';
      }

      return 'assets/images/pause.svg';
    });

    this.altBtnImg = computed(() => {
      if (this.activeVideo.isLastVideo && this.activeVideo.isEnd()) {
        return 'replay';
      }

      if (this.activeVideo.isPlaying() === false) {
        return 'play';
      }

      return 'pause';
    });

    this.activeVideoDivRef = computed(() => {
      return this.htmlVideoDivRefs.find(
        span => span.nativeElement.id === `videoDivRef-${this.activeVideo.id()}`
      );
    });

    this.activeVideoSpanRef = computed(() => {
      return this.htmlVideoSpanRefs.find(
        span =>
          span.nativeElement.id === `videoSpanRef-${this.activeVideo.id()}`
      );
    });

    this.activeVideoHtml = computed(() => {
      return this.htmlVideos.find(
        video => video.nativeElement.id === `video-${this.activeVideo.id()}`
      );
    });
  }
  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    ScrollTrigger.create({
      trigger: '#slider',
      start: 'top center',
      end: 'bottom center',
      onEnter: () => {
        this.startCarousel();
      },
    });
  }

  stateOnPlay(): void {
    this.activeVideo.isEnd.set(false);
    this.activeVideo.isPlaying.set(true);
    this.activeVideo.isLastVideo =
      this.activeVideo.id() === this.htmlVideos.length;
  }

  onPlay(): void {
    this.stateOnPlay();

    if (this.activeVideo.wasPaused) return;

    const widthDivRef =
      window.innerWidth < 760
        ? '10vw' // mobile
        : window.innerWidth < 1200
          ? '10vw' // tablet
          : '4vw'; // laptop

    gsap.to(`#${this.activeVideoDivRef()?.nativeElement.id}`, {
      width: widthDivRef,
    });

    gsap.to(`#${this.activeVideoSpanRef()?.nativeElement.id}`, {
      backgroundColor: 'white',
      width: '6.5%',
    });
  }

  resetSpans(): void {
    const spanId = `#${this.activeVideoSpanRef()?.nativeElement.id}`;
    const videoDivRefId = `#${this.activeVideoDivRef()?.nativeElement.id}`;

    gsap.to(videoDivRefId, {
      width: '12px',
    });

    gsap.to(spanId, {
      backgroundColor: '#afafaf',
      width: '12px',
    });
  }

  stateOnEnd(): void {
    this.activeVideo.isEnd.set(true);
    this.activeVideo.wasPaused = false;
    this.activeVideo.isPlaying.set(false);
  }

  onEnd(): void {
    this.stateOnEnd();
    this.resetSpans();

    const nextId = this.activeVideo.id() + 1;
    if (nextId > this.highlights.length) return;

    this.moveSlide(nextId - 1);
    this.activeVideo.id.set(nextId);
  }

  onPause(): void {
    this.activeVideo.isPlaying.set(false);
  }

  onTimeUpdate(): void {
    const spanId = `#${this.activeVideoSpanRef()?.nativeElement.id}`;
    const htmlVideo = this.activeVideoHtml()?.nativeElement;

    gsap.to(spanId, {
      width: `${(htmlVideo!.currentTime / htmlVideo!.duration) * 100}%`,
    });
  }

  startCarousel(): void {
    this.playVideo();
  }

  playVideo(): void {
    this.activeVideoHtml()?.nativeElement.play();
  }

  moveSlide(slide: number): void {
    if (this.activeVideo.isLastVideo) return;

    gsap.to(`#slider`, {
      transform: `translateX(${-100 * slide}%)`,
      duration: 2,
      ease: 'power2.inOut',
      onComplete: () => {
        this.playVideo();
      },
    });
  }

  initSlide(): void {
    gsap.to(`#slider`, {
      transform: `translateX(0px)`,
      duration: 2,
      ease: 'power2.inOut',
      onComplete: () => {
        this.playVideo();
      },
    });
  }

  changeSlide(spanId: number): void {
    if (spanId === this.activeVideo.id()) return;
    this.activeVideoHtml()!.nativeElement.pause();
    this.activeVideoHtml()!.nativeElement.currentTime = 0;
    this.stateOnEnd();
    this.resetSpans();

    this.activeVideo.id.set(spanId);

    if (spanId === 1) {
      this.initSlide();
    } else {
      this.activeVideo.isLastVideo = false;
      this.moveSlide(spanId - 1);
    }
  }

  changeVideoState(): void {
    if (this.activeVideo.isPlaying()) {
      this.activeVideoHtml()?.nativeElement.pause();
      this.activeVideo.wasPaused = true;
      return;
    }

    if (this.activeVideo.isEnd() && this.activeVideo.isLastVideo) {
      this.activeVideo.id.set(1);
      this.activeVideo.wasPaused = false;
      this.initSlide();
      return;
    }

    this.activeVideoHtml()?.nativeElement.play();
  }
}

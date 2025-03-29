import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  PLATFORM_ID,
  viewChild,
} from '@angular/core';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

import { animateWithGsap } from 'src/app/shared/utils/animations';

@Component({
  selector: 'app-features',
  imports: [],
  templateUrl: './features.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturesComponent implements AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);
  public videoRef =
    viewChild.required<ElementRef<HTMLVideoElement>>('videoRef');

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    gsap.to(this.videoRef().nativeElement, {
      scrollTrigger: {
        trigger: this.videoRef().nativeElement,
        toggleActions: 'play pause reverse restart',
        start: '-10% bottom',
      },
      onComplete: () => {
        this.videoRef().nativeElement.play();
      },
    });

    animateWithGsap('#features_title', { y: 0, opacity: 1 });
    animateWithGsap(
      '.g_grow',
      {
        scale: 1,
        opacity: 1,
        ease: 'power1',
      },
      {
        scrub: 5.5,
      }
    );
    animateWithGsap('.g_text', {
      y: 0,
      opacity: 1,
      ease: 'power2.inOut',
      duration: 1,
    });
  }
}

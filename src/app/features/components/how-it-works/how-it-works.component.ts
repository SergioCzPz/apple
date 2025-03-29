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
import { animateWithGsap } from 'src/app/shared/utils/animations';

@Component({
  selector: 'app-how-it-works',
  imports: [],
  templateUrl: './how-it-works.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HowItWorksComponent implements AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);

  public videoRef =
    viewChild.required<ElementRef<HTMLVideoElement>>('videoRef');

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    gsap.from('#chip', {
      scrollTrigger: {
        trigger: '#chip',
        start: '20% bottom',
      },
      opacity: 0,
      scale: 2,
      duration: 2,
      ease: 'power2.inOut',
    });

    animateWithGsap('.g_fadeIn', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.inOut',
    });
  }
}

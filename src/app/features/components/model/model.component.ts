import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  PLATFORM_ID,
} from '@angular/core';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { ModelViewComponent } from '../model-view/model-view.component';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-model',
  imports: [ModelViewComponent],
  templateUrl: './model.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModelComponent implements AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    gsap.to('#heading', {
      y: 0,
      opacity: 1,
    });
  }
}

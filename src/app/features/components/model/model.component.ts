import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { ModelViewComponent } from '../model-view/model-view.component';

import { NgtCanvas, extend } from 'angular-three';
import * as THREE from 'three';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';

extend(THREE);

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-model',
  imports: [NgtCanvas],
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
  protected modelView = ModelViewComponent;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    gsap.to('#heading', {
      y: 0,
      opacity: 1,
    });
  }
}

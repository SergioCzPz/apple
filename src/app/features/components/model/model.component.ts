import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { ModelViewComponent } from '../model-view/model-view.component';

import { NgtCanvas, extend } from 'angular-three';
import * as THREE from 'three';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { Model } from 'src/app/shared/types/constants.type';
import { sizes } from '@constants/constants';
import { ThreeModelService } from '../../services/three-model.service';

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
  private readonly threeModelService = inject(ThreeModelService);

  public sizes = sizes;
  public model: Model = {
    id: 4,
    title: 'iPhone 15 Pro in Black Titanium',
    color: ['#454749', '#3b3b3b', '#181819'],
    img: 'assets/images/black.jpg',
  };
  public activeSize = signal<string>('small');

  constructor() {
    this.threeModelService.size = this.activeSize;
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    gsap.to('#heading', {
      y: 0,
      opacity: 1,
    });
  }

  changeSize(): void {
    this.activeSize.update(value => (value === 'small' ? 'large' : 'small'));
  }
}

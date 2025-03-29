import {
  ChangeDetectionStrategy,
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  inject,
  signal,
  Signal,
} from '@angular/core';
import { NgtArgs, NgtVector3 } from 'angular-three';
import { Group, Object3DEventMap } from 'three';
import { injectGLTF } from 'angular-three-soba/loaders';
import { ThreeModelService } from '../../services/three-model.service';
import { gsap } from 'gsap';

@Component({
  selector: 'app-iphone',
  imports: [NgtArgs],
  templateUrl: './iphone.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IphoneComponent {
  public readonly modelThreeService = inject(ThreeModelService);

  public position = signal<NgtVector3>([10, 10, 10]);

  private gltf;
  protected model: Signal<Group<Object3DEventMap> | null>;

  constructor() {
    this.gltf = injectGLTF(() => 'assets/models/scene.glb');

    this.model = computed(() => {
      const gltf = this.gltf();
      if (!gltf) return null;
      return gltf.scene;
    });

    effect(() => {
      if (this.model()) {
        const model = this.model();
        if (model) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: '#scene',
              start: '-15% top',
              end: 'bottom center',
            },
            onStart: () => {
              console.log('onStart');
            },
            onComplete: () => {
              this.position.set([0, 0, 0]);
            },
          });

          tl.to(
            model.rotation,
            {
              duration: 1.5,
              y: 5,
              ease: 'power2.out',
            },
            0
          );

          tl.to(
            model.position,
            {
              duration: 3,
              x: 0,
              y: 0,
              z: 0,
              ease: 'power2.out',
            },
            0
          );

          tl.to(
            model.rotation,
            {
              duration: 1.5,
              y: 0,
              ease: 'power2.out',
            },
            1
          );
        }
      }
    });
  }
}

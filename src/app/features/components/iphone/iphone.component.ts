import {
  ChangeDetectionStrategy,
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  Signal,
  signal,
} from '@angular/core';
import { NgtArgs, NgtVector3 } from 'angular-three';
import { Group, Object3DEventMap } from 'three';
import { injectGLTF } from 'angular-three-soba/loaders';

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
  public position = signal<NgtVector3>([0, 0, 0]);

  private gltf;
  protected model: Signal<Group<Object3DEventMap> | null>;

  constructor() {
    this.gltf = injectGLTF(() => 'assets/models/scene.glb');

    this.model = computed(() => {
      const gltf = this.gltf();
      if (!gltf) return null;
      return gltf.scene;
    });
  }
}

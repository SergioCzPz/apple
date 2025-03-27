import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { injectBeforeRender, NgtVector3 } from 'angular-three';
import { Mesh } from 'three';

@Component({
  selector: 'app-cube',
  imports: [],
  templateUrl: './cube.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CubeComponent {
  position = input<NgtVector3>([0, 0, 0]);

  meshRef = viewChild.required<ElementRef<Mesh>>('mesh');

  hovered = signal(false);
  clicked = signal(false);

  constructor() {
    injectBeforeRender(({ delta }) => {
      const mesh = this.meshRef().nativeElement;
      mesh.rotation.x += delta;
      mesh.rotation.y += delta;
    });
  }
}

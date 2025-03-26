import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-model-view',
  imports: [],
  templateUrl: './model-view.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModelViewComponent {}

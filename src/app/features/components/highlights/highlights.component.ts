import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-highlights',
  imports: [],
  templateUrl: './highlights.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HighlightsComponent {}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { footerLinks } from '@constants/constants';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  protected footerLinks = footerLinks;
}

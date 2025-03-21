import { ChangeDetectionStrategy, Component } from '@angular/core';
import { navLists } from '@constants/constants';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  public navLinks: string[] = navLists;
}

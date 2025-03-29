import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroComponent } from '@features/components/hero/hero.component';
import { HighlightsComponent } from '@features/components/highlights/highlights.component';
import { NavbarComponent } from '@features/components/navbar/navbar.component';
import { ModelComponent } from '../../components/model/model.component';
import { FeaturesComponent } from '../../components/features/features.component';

@Component({
  selector: 'app-home',
  imports: [
    NavbarComponent,
    HeroComponent,
    HighlightsComponent,
    ModelComponent,
    FeaturesComponent,
  ],
  templateUrl: './home.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}

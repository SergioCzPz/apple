import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroComponent } from '@features/components/hero/hero.component';
import { HighlightsComponent } from '@features/components/highlights/highlights.component';
import { NavbarComponent } from '@features/components/navbar/navbar.component';
import { ModelComponent } from '../../components/model/model.component';
import { FeaturesComponent } from '../../components/features/features.component';
import { HowItWorksComponent } from '../../components/how-it-works/how-it-works.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-home',
  imports: [
    NavbarComponent,
    HeroComponent,
    HighlightsComponent,
    ModelComponent,
    FeaturesComponent,
    HowItWorksComponent,
    FooterComponent,
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

import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  signal,
  WritableSignal,
} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import gsap from 'gsap';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent implements AfterViewInit, OnInit, OnDestroy {
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly isSmallScreen: WritableSignal<boolean> = signal(false);
  public videoSrc = computed(() =>
    this.isSmallScreen()
      ? 'assets/videos/smallHero.mp4'
      : 'assets/videos/hero.mp4'
  );
  private destroyed = new Subject<void>();

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.breakpointObserver
      .observe(['(max-width: 759px)'])
      .pipe(takeUntil(this.destroyed))
      .pipe(tap(console.log))
      .subscribe(result => this.isSmallScreen.set(result.matches));
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    gsap.to('#hero', {
      opacity: 1,
      delay: 2,
    });

    gsap.to('#cta', {
      opacity: 1,
      translateY: '-80px',
      delay: 2,
    });
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}

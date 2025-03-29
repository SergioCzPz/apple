import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThreeModelService {
  public size = signal<string>('small');
  public scale = computed(() => (this.size() === 'small' ? 30 : 35));
}

import { WritableSignal } from '@angular/core';

export interface ActiveVideo {
  id: WritableSignal<number>;
  isEnd: WritableSignal<boolean>;
  isLastVideo: boolean;
  isPlaying: WritableSignal<boolean>;
  wasPaused: boolean;
}

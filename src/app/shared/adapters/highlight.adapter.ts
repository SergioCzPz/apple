import { Highlight } from '../types/constants.type';

export interface HightlightState {
  id: number;
  textLists: string[];
  video: string;
  videoDuration: number;
  isEnd: boolean;
  startPlay: boolean;
  isLastVideo: boolean;
  isPlaying: boolean;
}

export function highlightAdapt(hightlights: Highlight[]): HightlightState[] {
  return hightlights.map(highlight => ({
    id: highlight.id,
    textLists: highlight.textLists,
    video: highlight.video,
    videoDuration: highlight.videoDuration,
    isEnd: false,
    startPlay: highlight.id === 1,
    isLastVideo: highlight.id === hightlights.length,
    isPlaying: false,
  }));
}

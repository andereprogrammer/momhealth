import {create} from 'zustand';
import {PuzzleItem, StoreParams} from '../interface';

const useBrainActivityStore = create<StoreParams>(set => ({
  currentPuzzleItem: null,
  puzzles: [],
  resetState: false,
  setPuzzleItem: (currentPuzzleItem: PuzzleItem) =>
    set(() => ({currentPuzzleItem})),
  setPuzzles: (puzzles: Array<PuzzleItem>) => set(() => ({puzzles})),
  resetCardState: (resetState: boolean) => set(() => ({resetState})),
  todayPuzzle: null,
  setTodayPuzzle: (todayPuzzle: PuzzleItem | null) =>
    set(() => ({todayPuzzle})),
}));

export {useBrainActivityStore};

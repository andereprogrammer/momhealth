import {Animated} from 'react-native';

export interface PuzzleItem {
  activityId: string;
  answer: string;
  complete: boolean;
  id: number;
  image_link: string;
  name: string;
  question: string;
  status: string;
  type: string;
}

export interface StoreParams {
  currentPuzzleItem: PuzzleItem | null;
  puzzles: Array<PuzzleItem>;
  setPuzzleItem: (arg: PuzzleItem) => void;
  setPuzzles: (arg: Array<PuzzleItem>) => void;
  resetState: boolean;
  resetCardState: (arg: boolean) => void;
  todayPuzzle: PuzzleItem | null;
  setTodayPuzzle: (arg: PuzzleItem | null) => void;
}

export interface ImageContainerProps {
  loading: boolean;
  puzzle: PuzzleItem;
  onImagePress: () => void;
}

export interface TabViewProps {
  loading: boolean;
  data: Array<PuzzleItem | null>;
  onPuzzlePress: (item: PuzzleItem, loading: boolean) => void;
}

export interface AllPuzzlesProps {
  loading: boolean;
  data: Array<PuzzleItem | null>;
  onPuzzlePress: (item: PuzzleItem, loading: boolean) => void;
  showIcon?: boolean;
}

export interface PuzzleListItem {
  item: PuzzleItem | null;
  lastIndex: boolean;
  showIcon: boolean;
  onPuzzlePress: (item: PuzzleItem, loading: boolean) => void;
  loading: boolean;
}

export interface PuzzleViewProps {
  question: string;
  onShowAnswer: (status: boolean, id: number) => void;
  loading: boolean;
  onPreviousPuzzlePress: () => void;
  id: number;
  resetState: boolean;
  onReset: () => void;
  answer: string;
  uri: string;
  activityId: string;
  todayPuzzle: boolean;
}

export interface PuzzleFooterProps {
  id: number;
  frontFace: boolean;
  confirmation: boolean;
  showAnswer: boolean;
  onShowAnswerPress: () => void;
  hideConfirmation: boolean;
  onButtonPress: (status: number, frontFace: boolean) => void;
  onPreviousPuzzlePress: () => void;
  todayPuzzle: boolean;
}

export interface AnimatedPuzzleViewProps {
  frontFace: boolean;
  flipReverse: boolean;
  rotateVal: Animated.Value;
  showImage: boolean;
  showAnswer: boolean;
  answer: string;
  uri: string;
}

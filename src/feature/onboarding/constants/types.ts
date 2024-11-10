import {Animated, ImageProps} from 'react-native';

export type SlideProps = {
  heroText: string;
  secondaryText: string;
  imageValue: ImageProps['source'];
  animationValue: string;
  index?: number;
  scrollX: Animated.Value;
  id: number;
  onLongPress: () => void;
  onPressedOut: () => void;
};

export type Listslides = {
  slidesList: ArrayLike<SlideProps>;
};

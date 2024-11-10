import {ImageProps, StyleProp, ViewStyle} from 'react-native';
export type SuccessProps = {
  style: StyleProp<ViewStyle>;
  bg: string;
  imageVar: ImageProps['source'];
  successText: string;
  showExtraText?: boolean;
  shortText?: string;
  animationSource: any;
};

export type ProgressIndicator = {
  tile1: string;
  tile2: string;
  tile3: string;
};

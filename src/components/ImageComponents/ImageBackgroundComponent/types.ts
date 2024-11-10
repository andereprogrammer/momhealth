import {ReactNode} from 'react';
import {ImageBackgroundProps, StyleProp, ViewStyle} from 'react-native';

export type ImageBgProps = {
  children: ReactNode;
  source: ImageBackgroundProps['source'];
  style: StyleProp<ViewStyle> | null;
};

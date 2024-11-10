import {ReactNode} from 'react';
import {StyleProp, ViewStyle} from 'react-native';

export type CTAProps = {
  children: ReactNode;
  style: StyleProp<ViewStyle>;
  active: boolean | undefined;
  onClick?: () => void;
  loading?: boolean;
  colors?: Array<string>;
};

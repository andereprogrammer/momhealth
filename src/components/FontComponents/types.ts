import {ReactNode} from 'react';
import {StyleProp, TextStyle} from 'react-native';
export type ChildrenProps = {
  children: ReactNode;
  style: StyleProp<TextStyle>;
  numberLines?: number;
};

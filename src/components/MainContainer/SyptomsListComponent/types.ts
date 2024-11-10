import {StyleProp, TextStyle} from 'react-native';

export type listItem = {
  syptom: string;
  key: string | number;
  selected: boolean;
};
export type styleProp = {
  style: StyleProp<TextStyle>;
};

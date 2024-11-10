import {StyleProp, TextStyle} from 'react-native';

export type HeaderTextPRops = {
  mainText: string;
  callText?: string;
  callTextPresent: boolean;
  style?: StyleProp<TextStyle>;
  callFuntion?: () => void;
  mainTextStyle?: StyleProp<TextStyle>;
};

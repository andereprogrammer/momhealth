import {
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  ViewStyle,
} from 'react-native';
export type IllustrationProps = {
  source: ImageSourcePropType;
  Imagestyle: StyleProp<ImageStyle>;
  Viewstyle: StyleProp<ViewStyle>;
  animationSource: string;
};

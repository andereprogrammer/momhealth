import React, { ReactNode } from 'react';
import {
  ImageProps,
  ImageResizeMode,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import {
  horizontalScale,
  verticalScale,
} from '../../../helpers/layoutHelper';
import { BackBtn } from '../../../assets';
import { fonts, Pallete } from '../../../theme/enum';
import ImageWithView from '../../../components/ImageWithView';

interface DefaultProps {
  showGradient?: boolean;
  gradientColors?: string[];
  start?: { x: number, y: number };
  end?: { x: number, y: number };
  onIconPress?: () => void;
  headingStyles?: TextStyle;
  headingContainerStyle?: ViewStyle;
  iconColor?: string;
  resizeMode?: ImageResizeMode;
  isLocalImage?: boolean;
  imageSource?: string | undefined | '' | ImageProps;
  width?: number;
  height?: number;
  BackComponent?: any;
  customBackComponent?: boolean;
  childComponent?: ReactNode | null;
  customContainerStyle?: ViewStyle;
}

interface ScreenProps {
  heading: string;
}

type Props = DefaultProps & ScreenProps;

const Header: React.FC<Props> = (props: Props) => {
  const {
    showGradient = false,
    gradientColors = [
      Pallete.linearGradientDark,
      Pallete.linearGradientMedium,
      Pallete.linearGradientLight
    ],
    start = { x: 0, y: 0 },
    end = { x: 1, y: 0 },
    headingContainerStyle,
    resizeMode = 'cover',
    isLocalImage = true,
    iconColor = Pallete.whiteBackground,
    headingStyles,
    heading,
    imageSource = BackBtn,
    width = 24,
    height = 24,
    BackComponent,
    customBackComponent=false,
    childComponent=null,
    customContainerStyle,
  } = props;
  const navigation = useNavigation();
  const onIconPress = () => {
   props.onIconPress ? onIconPress() : navigation.goBack();
  }
  const Parent = showGradient ? LinearGradient : View;
  return (
    <Parent
      colors={gradientColors}
      start={start}
      end={end}
      style={[styles.textStyles,customContainerStyle]}>
      <View style={styles.rowView}>
        <TouchableOpacity
          onPress={onIconPress}
          style={[styles.buttonStyle, headingContainerStyle]}>
          {customBackComponent ? <BackComponent/> :
          <ImageWithView
            mode={resizeMode}
            isLocalImage={isLocalImage}
            width={width}
            height={height}
            imageSource={imageSource as ImageProps}
            tintColor={iconColor}
          />}
        </TouchableOpacity>
        <Text
          style={[styles.textStyle, headingStyles]}>
          {heading}
        </Text>
      </View>
      {childComponent}
    </Parent>
  );
};
const styles = StyleSheet.create({
  textStyles: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(20),
  },
  textStyle: {
    fontFamily: fonts.PrimaryJakartaBold,
    fontSize: 18,
    color: Pallete.whiteBackground,
    marginLeft: 16,
    textAlignVertical: 'center',
    lineHeight: 24
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    height: 24
  },
  rowView: {
    flexDirection:'row',
  },
});
export default Header;

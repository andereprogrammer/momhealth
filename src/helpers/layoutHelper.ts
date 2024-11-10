import {Dimensions, PixelRatio} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const {width: SCREEN_WIDTH_WINDOW, height: SCREEN_HEIGHT_WINDOW} =
  Dimensions.get('screen');
const widthBaseScale = SCREEN_WIDTH_WINDOW / 350;
const heightBaseScale = SCREEN_HEIGHT_WINDOW / 680;

const normalize = (size, based = 'width') => {
  const newSize =
    based === 'height' ? size * heightBaseScale : size * widthBaseScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

const horizontalScale = size => normalize(size, 'width');
const verticalScale = size => normalize(size, 'height');
const moderateScale = (size, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 350});

export {
  SCREEN_WIDTH_WINDOW,
  SCREEN_HEIGHT_WINDOW,
  horizontalScale,
  verticalScale,
  moderateScale,
  normalize,
};

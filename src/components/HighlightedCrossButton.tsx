import {
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {Cross} from '../assets';
import {verticalScale} from '../helpers/layoutHelper';

type Props = {
  navigationCall: () => void;
  style: any;
};

const HighlightedCrossButton = (props: Props) => {
  return (
    <TouchableOpacity
      onPress={() => props.navigationCall()}
      style={[styles.mainBtnStyle, props.style]}>
      <Image
        style={styles.imgAspect}
        resizeMethod="resize"
        resizeMode="contain"
        tintColor={'#fff'}
        source={Cross}
      />
    </TouchableOpacity>
  );
};

export default HighlightedCrossButton;
export const styles = StyleSheet.create({
  mainBtnStyle: {
    width: verticalScale(31),
    height: verticalScale(31),
    position: 'absolute',

    backgroundColor: '#00000070',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    padding: verticalScale(6),
    zIndex: 30,
  },
  imgAspect: {
    width: '100%',
    height: '100%',
  },
});

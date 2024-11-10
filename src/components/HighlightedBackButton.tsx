import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {verticalScale} from '../helpers/layoutHelper';
import {BackBtn} from '../assets';

type Props = {
  navigationCall: () => void;
};

const HighlightedBackButton = (props: Props) => {
  return (
    <TouchableOpacity
      onPress={props.navigationCall}
      style={styles.mainBtnStyle}>
      <Image
        style={styles.imgAspect}
        resizeMethod="resize"
        resizeMode="contain"
        tintColor={'#fff'}
        source={BackBtn}
      />
    </TouchableOpacity>
  );
};

export default HighlightedBackButton;

const styles = StyleSheet.create({
  mainBtnStyle: {
    width: verticalScale(31),
    height: verticalScale(31),
    backgroundColor: '#00000070',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    padding: verticalScale(6),
  },
  imgAspect: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    marginLeft: 5,
  },
});

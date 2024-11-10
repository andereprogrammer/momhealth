import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {fonts} from '../../../theme/enum';

type Props = {
  clickFn: () => void;
};

const NotActiveButton = ({clickFn}: Props) => {
  return (
    <LinearGradient
      style={styles.containerSpacing}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      colors={['#60009B', '#7200B8']}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={clickFn}
        style={styles.btnSpacing}>
        <Text style={styles.text}>Not Active</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default NotActiveButton;

const styles = StyleSheet.create({
  btnSpacing: {
    borderRadius: 4,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  text: {
    fontSize: 14,
    color: '#60009B',
    fontFamily: fonts.SecondaryDMSansBold,
  },
  containerSpacing: {
    borderRadius: 5,
    padding: 3,
  },
});

import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {commonStyles} from '../styles';
import {Cross} from '../../../assets';
import {SCREEN_WIDTH_WINDOW} from '../../../helpers/layoutHelper';

type CloseBtnProps = {
  close: () => void;
};

const CloseBtn = ({close}: CloseBtnProps) => {
  return (
    <View style={[styles.closeBtnSpacing, styles.closeBtn]}>
      <TouchableOpacity onPress={close} style={styles.btn}>
        <Image
          source={Cross}
          style={commonStyles.imageAspect}
          resizeMethod="resize"
          resizeMode="cover"
          tintColor={'#000'}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CloseBtn;

const styles = StyleSheet.create({
  closeBtn: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'row',
    zIndex: 20000000,
  },
  closeBtnSpacing: {
    paddingVertical: 5,
    marginHorizontal: 20,
    marginTop: SCREEN_WIDTH_WINDOW / 11,
    marginBottom: 15,
  },
  btn: {
    width: 30,
    height: 30,
  },
});

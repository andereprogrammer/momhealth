import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {fonts} from '../../../theme/enum';
import {stringLiterals} from '../constants';
import ImageWithView from '../../../components/ImageWithView';
import {InfoIcon} from '../../../assets';

type KnowMoreCtaProps = {
  clickFn: () => void;
};

const KnowMoreCta = ({clickFn}: KnowMoreCtaProps) => {
  return (
    <TouchableOpacity onPress={clickFn} style={styles.btnContainer}>
      <ImageWithView
        width={20}
        height={20}
        imageSource={InfoIcon}
        isLocalImage
      />
      <Text style={styles.text}>{stringLiterals.KNOW_MORE}</Text>
    </TouchableOpacity>
  );
};

export default KnowMoreCta;

const styles = StyleSheet.create({
  btnContainer: {
    borderRadius: 20,
    position: 'absolute',
    top: 10,
    zIndex: 1000000,
    backgroundColor: 'rgba(255,215,229,0.9)',
    shadowColor: '#c3c3c3',
    shadowOpacity: 1,
    shadowRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    gap: 5,
  },
  text: {
    paddingVertical: 6,
    color: '#222',
    fontFamily: fonts.SecondaryDMSansBold,
    fontSize: 13,
  },
});

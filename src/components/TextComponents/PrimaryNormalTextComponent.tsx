import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {fonts} from '../../theme/enum';

type PrimaryNormalTextProps = {
  color: string;
  text: string;
};

const PrimaryNormalTextComponent = (props: PrimaryNormalTextProps) => {
  return (
    <>
      <Text style={[styles.primaryText, {color: props.color}]}>
        {props.text}
      </Text>
    </>
  );
};

export default PrimaryNormalTextComponent;

const styles = StyleSheet.create({
  primaryText: {
    fontFamily: fonts.SecondaryDMSansMedium,
    fontSize: 14,
  },
});

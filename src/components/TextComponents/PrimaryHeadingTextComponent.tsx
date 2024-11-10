import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {fonts} from '../../theme/enum';

type PrimaryHeadingTextProps = {
  text: string;
  color: string;
  fontSize?: number;
};

const PrimaryHeadingTextComponent = (props: PrimaryHeadingTextProps) => {
  return (
    <>
      <Text
        style={[
          {color: props.color},
          styles.primaryFont,
          props.fontSize ? {fontSize: props.fontSize} : {},
        ]}>
        {props.text}
      </Text>
    </>
  );
};

export default PrimaryHeadingTextComponent;

const styles = StyleSheet.create({
  primaryFont: {
    fontFamily: fonts.PrimaryJakartaBold,
    fontSize: 18,
  },
});

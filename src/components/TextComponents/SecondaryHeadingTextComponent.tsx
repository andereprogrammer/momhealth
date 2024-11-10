import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {fonts} from '../../theme/enum';

type SecondaryHeadingTextProps = {
  text: string;
  color: string;
  fontSize?: number;
};

const SecondaryHeadingTextComponent = (props: SecondaryHeadingTextProps) => {
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

export default SecondaryHeadingTextComponent;

const styles = StyleSheet.create({
  primaryFont: {
    fontFamily: fonts.SecondaryDMSansBold,
    fontSize: 18,
  },
});

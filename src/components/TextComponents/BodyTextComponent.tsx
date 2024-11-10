import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {fonts} from '../../theme/enum';

type BodyTextProps = {
  color: string;
  numberOfLines: number;
  text: string;
};

const BodyTextComponent = (props: BodyTextProps) => {
  return (
    <>
      <Text
        numberOfLines={props.numberOfLines}
        style={[styles.body, {color: props.color}]}>
        {props.text}
      </Text>
    </>
  );
};

export default BodyTextComponent;

const styles = StyleSheet.create({
  body: {
    fontFamily: fonts.SecondaryDMSansRegular,
    fontSize: 12,
  },
});

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {fonts} from '../../../../../theme/enum';

type Props = {};

const PageTurnBtn = (props: Props) => {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 95,
        right: 30,
      }}>
      <Text
        style={{
          textDecorationLine: 'underline',
          fontFamily: fonts.PrimaryJakartaBold,
          fontSize: 17,
        }}>
        Next
      </Text>
    </View>
  );
};

export default PageTurnBtn;

const styles = StyleSheet.create({});

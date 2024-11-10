import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {fonts, Pallete} from '../../../theme/enum';

type Props = {};

const TitleText = (props: Props) => {
  return (
    <View style={styles.viewStyle}>
      <Text style={styles.textStyle}>Limited period offer!</Text>
    </View>
  );
};

export default TitleText;

const styles = StyleSheet.create({
  viewStyle: {
    marginTop: 20,
    alignSelf: 'center',
    marginBottom: 10,
  },
  textStyle: {
    color: Pallete.black,
    fontSize: 24,
    fontFamily: fonts.SecondaryDMSansBold,
    alignSelf: 'center',
  },
  mainTitle: {
    color: Pallete.black,
    fontSize: 14,
    fontFamily: fonts.SecondaryDMSansBold,
  },
});

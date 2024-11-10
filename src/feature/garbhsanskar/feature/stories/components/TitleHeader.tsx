import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {fonts, Pallete} from '../../../../../theme/enum';

type Props = {};

const TitleHeader = (props: Props) => {
  return (
    <View
      style={{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 10,
      }}>
      <Text
        style={{
          fontFamily: fonts.PrimaryJakartaBold,
          fontSize: 22,
          color: Pallete.Eggplant,
        }}>
        Mind full body
      </Text>
    </View>
  );
};

export default TitleHeader;

const styles = StyleSheet.create({});

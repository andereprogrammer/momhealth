import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {fonts, Pallete} from '../../../../../theme/enum';

type Props = {};

const MostPopularTag = (props: Props) => {
  return (
    <View
      style={{
        backgroundColor: '#CB84FF',
        borderRadius: 30,
        position: 'absolute',
        top: -4,
        left: 30,
        zIndex: 100,
        paddingHorizontal: 10,
        paddingVertical: 3,
      }}>
      <Text
        style={{
          color: Pallete.whiteBackground,
          fontFamily: fonts.PrimaryJakartaExtraBold,
          fontSize: 10,
        }}>
        Most popular
      </Text>
    </View>
  );
};

export default MostPopularTag;

const styles = StyleSheet.create({});

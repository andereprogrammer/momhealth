import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {fonts, Pallete} from '../../../../theme/enum';

type Props = {
  text: string;
};

const MainHeading = ({text}: Props) => {
  return (
    <View style={{paddingHorizontal: 5}}>
      <Text
        style={{
          color: Pallete.black,
          fontSize: 20,
          fontFamily: fonts.PrimaryJakartaExtraBold,
        }}>
        {text}
      </Text>
    </View>
  );
};

export default MainHeading;

const styles = StyleSheet.create({});

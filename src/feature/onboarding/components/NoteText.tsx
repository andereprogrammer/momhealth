import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {fonts, Pallete} from '../../../theme/enum';

type Props = {};

const NoteText = (props: Props) => {
  return (
    <View style={styles.viewStyle}>
      <Text style={{fontSize: 15, fontFamily: fonts.PrimaryJakartaMedium}}>
        30 days money back guarantee!
      </Text>
    </View>
  );
};

export default NoteText;

const styles = StyleSheet.create({
  viewStyle: {
    alignSelf: 'center',

    color: Pallete.EbonyGray,
    paddingTop: 15,
  },
});

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {fonts} from '../../../theme/enum';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';

type Props = {
  description: string;
};

const TextDescriptionComponent = (props: Props) => {
  return (
    <View style={styles.mainView}>
      <Text style={styles.mainText}>{props.description}</Text>
    </View>
  );
};

export default TextDescriptionComponent;

const styles = StyleSheet.create({
  mainView: {
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(10),
  },
  mainText: {
    fontSize: 16,
    fontFamily: fonts.SecondaryDMSansRegular,
    paddingHorizontal: 5,
  },
});

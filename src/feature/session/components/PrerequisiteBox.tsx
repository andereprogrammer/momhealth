import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {horizontalScale} from '../../../helpers/layoutHelper';
import {fonts} from '../../../theme/enum';

type Props = {
  requisite: string;
};

const PrerequisiteBox = (props: Props) => {
  return (
    <View style={styles.mainView}>
      <Text style={styles.textStyle}>{props.requisite}</Text>
    </View>
  );
};

export default PrerequisiteBox;

const styles = StyleSheet.create({
  mainView: {
    paddingHorizontal: horizontalScale(10),
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    borderRadius: horizontalScale(5),
  },
  textStyle: {
    fontFamily: fonts.SecondaryDMSansMedium,
    color: '#000',
    fontSize: 14,
  },
});

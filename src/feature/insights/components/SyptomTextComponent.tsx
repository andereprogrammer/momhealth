import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {horizontalScale} from '../../../helpers/layoutHelper';
import {Pallete, fonts} from '../../../theme/enum';
import {MoodValue} from '../../session/typings';

type SyptomTextProps = {
  syptom: MoodValue;
};

const SyptomTextComponent = (props: SyptomTextProps) => {
  return (
    <View
      style={[
        styles.commonText,
        props.syptom.selected ? styles.selected : styles.notSelected,
      ]}>
      <Text
        key={props.syptom.id}
        style={[
          styles.valueTextStyle,
          props.syptom.selected
            ? {color: Pallete.darkBlack}
            : {color: Pallete.darkBlack},
        ]}>
        {props.syptom.value}
      </Text>
    </View>
  );
};

export default SyptomTextComponent;

const styles = StyleSheet.create({
  selected: {
    width: '100%',
    height: '100%',
    borderWidth: 1,
    backgroundColor: 'rgba(255, 118, 225, 0.1)',
    borderColor: 'rgba(255, 118, 225, 1)',
  },
  commonText: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f3f3',
    borderRadius: horizontalScale(10),
    borderWidth: 1,
    borderColor: '#c3c3c3',
    opacity: 0.8,
  },
  notSelected: {
    width: '100%',
    height: '100%',
    // shadowColor: '#c3c3c3',
    // shadowOffset: {
    //   width: 4,
    //   height: 4,
    // },
    // shadowRadius: 3,
    // shadowOpacity: 0.3,
  },
  valueTextStyle: {
    fontFamily: fonts.SecondaryDMSansMedium,
    fontSize: 12,
    textAlign: 'center',
  },
});

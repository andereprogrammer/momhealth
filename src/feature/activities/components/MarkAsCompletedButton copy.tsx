import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {verticalScale} from '../../../helpers/layoutHelper';
import {fonts} from '../../../theme/enum';

type Props = {
  status: string;
};

const MarkAsCompletedButton = (props: Props) => {
  return (
    <View
      style={{
        width: '90%',
        height: verticalScale(40),
        backgroundColor: '#FFDE91',
        borderRadius: 14,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: verticalScale(10),
      }}>
      <Text
        style={{
          fontSize: 16,
          fontFamily: fonts.SecondaryDMSansBold,
        }}>
        {props.status}
      </Text>
    </View>
  );
};

export default MarkAsCompletedButton;

const styles = StyleSheet.create({});

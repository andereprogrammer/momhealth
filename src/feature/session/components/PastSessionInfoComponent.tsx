import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {verticalScale} from '../../../helpers/layoutHelper';
import {fonts} from '../../../theme/enum';

type Props = {
  headingMessage: string;
  infoMessage: string;
  time: string;
};

const PastSessionInfoComponent = (props: Props) => {
  return (
    <View
      style={{
        height: verticalScale(90),
        width: '100%',
          marginTop: 10,
      }}>
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          borderRadius: 20,
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: '#F6F6F6',
          borderWidth: 1,
          paddingHorizontal: 10,
          paddingVertical: verticalScale(10),
          borderColor: '#E9E7EA',
            gap: 5,
        }}>
        <Text
          style={{
            fontFamily: fonts.SecondaryDMSansMedium,
            fontSize: 14,
            color: '#000',
          }}>
          {props.headingMessage}
        </Text>
          <Text
            style={{
              fontFamily: fonts.SecondaryDMSansBold,
              fontSize: 16,
              color: '#000',
              textAlign: 'left',
            }}>
            {props.time}
          </Text>
        <Text
          style={{
            fontFamily: fonts.SecondaryDMSansMedium,
              fontSize: 14,
            color: '#777',
              textAlign: 'left',
          }}>
          {props.infoMessage}
        </Text>
      </View>
    </View>
  );
};

export default PastSessionInfoComponent;

const styles = StyleSheet.create({});

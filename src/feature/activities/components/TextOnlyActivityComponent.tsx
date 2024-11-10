import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {verticalScale} from '../../../helpers/layoutHelper';
import {fonts} from '../../../theme/enum';

type Props = {
  title: string;
  description: string;
};

const TextOnlyActivityComponent = (props: Props) => {
  return (
    <View
      style={{
        width: '95%',
        height: verticalScale(150),
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#e3e3e3',
        backgroundColor: '#e3e3e3',
        marginVertical: verticalScale(10),
        flexDirection: 'column',
        alignItems: 'center',
        padding: verticalScale(5),
      }}>
      <View
        style={{
          width: '100%',
          height: '30%',
          alignItems: 'flex-start',
          padding: 3,
        }}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: fonts.SecondaryDMSansBold,
          }}>
          {props.title}
        </Text>
      </View>
      <View
        style={{
          width: '100%',
          height: 'auto',
        }}>
        <Text
          numberOfLines={5}
          style={{
            padding: 5,
          }}>
          {props.description}
        </Text>
      </View>
    </View>
  );
};

export default TextOnlyActivityComponent;

const styles = StyleSheet.create({});

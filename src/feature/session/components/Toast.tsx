import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {GreenTick} from '../../../assets';

type Props = {};

const Toast = (props: Props) => {
  return (
    <View
      style={{
        width: '100%',
        height: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: verticalScale(10),
      }}>
      <View
        style={{
          width: '90%',
          height: '100%',
          flexDirection: 'row',
          backgroundColor: '#ABEBC6',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: horizontalScale(15),
          borderRadius: 20,
        }}>
        <Image
          resizeMethod="resize"
          resizeMode="contain"
          source={GreenTick}
          style={{width: '40%', height: '40%'}}
        />

        <Text style={{fontFamily: 'DMSans-Bold'}}>
          Your Session is confirmed
        </Text>
      </View>
    </View>
  );
};

export default Toast;

const styles = StyleSheet.create({});

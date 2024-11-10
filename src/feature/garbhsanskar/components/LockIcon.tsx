import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Lock} from '../../../assets';

type Props = {};

const LockIcon = (props: Props) => {
  return (
    <View
      style={{
        width: 25,
        height: 25,
        borderRadius: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        style={{
          width: '100%',
          height: '100%',
        }}
        resizeMethod="resize"
        resizeMode="contain"
        source={Lock}
      />
    </View>
  );
};

export default LockIcon;

const styles = StyleSheet.create({});

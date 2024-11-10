import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {BackBtn} from '../../../assets';
import {NavigationProp, useNavigation} from '@react-navigation/native';

type Props = {};

const CustomHeader = (props: Props) => {
  const navigation = useNavigation<NavigationProp<any, any>>();
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('HomeScreen')}
        style={{
          width: '40%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingHorizontal: 5,
        }}>
        <Image
          resizeMethod="resize"
          resizeMode="contain"
          style={{
            width: '24%',
            height: '100%',
          }}
          source={BackBtn}
        />
        <Text
          style={{
            fontSize: 18,
            fontFamily: 'PlusJakartaSans-Bold',
          }}>
          Sessions
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({});

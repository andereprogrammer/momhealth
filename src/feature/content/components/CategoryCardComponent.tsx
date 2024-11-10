import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import {ContentCard} from '../../../assets';

type Props = {};

const CategoryCardComponent = (props: Props) => {
  return (
    <View
      style={{
        width: horizontalScale(150),
        height: verticalScale(120),
        borderRadius: horizontalScale(20),
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
      <View
        style={{
          width: '100%',
          height: '85%',
          backgroundColor: 'pink',
          borderRadius: horizontalScale(20),
        }}>
        <Image
          resizeMethod="resize"
          resizeMode="contain"
          source={ContentCard}
          style={{width: '100%', height: '100%'}}
        />
      </View>
      <Text style={{color: '#000'}}>Yoga</Text>
    </View>
  );
};

export default CategoryCardComponent;

const styles = StyleSheet.create({});

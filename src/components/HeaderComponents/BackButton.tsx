import {Image, StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import {BackBtn} from '../../assets';
import React from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import s from '../../styles/GlobalStyles';

const BackButton = ({style}: {style: StyleProp<ViewStyle>}) => {
  const navigation = useNavigation<NavigationProp<any, any>>();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={style}>
      <Image
        style={[s.m2, s.ml4, {width: 30, height: 30}]}
        resizeMethod="resize"
        resizeMode="contain"
        tintColor={'#000'}
        source={BackBtn}
      />
    </TouchableOpacity>
  );
};

export default BackButton;

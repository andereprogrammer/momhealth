import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import ImageWithView from './ImageWithView';
import {Cross} from '../assets';
import s from '../styles/GlobalStyles';
import {NavigationProp, useNavigation} from '@react-navigation/native';

type Props = {};

const CloseBtn = (props: Props) => {
  const navigation = useNavigation<NavigationProp<any, any>>();
  const close = () => {
    navigation.goBack();
  };
  return (
    <TouchableOpacity
      onPress={close}
      style={[s.positionAbsolute, s.z50, {top: '10%', left: '2%'}]}>
      <ImageWithView isLocalImage imageSource={Cross} width={30} height={20} />
    </TouchableOpacity>
  );
};

export default CloseBtn;

const styles = StyleSheet.create({});

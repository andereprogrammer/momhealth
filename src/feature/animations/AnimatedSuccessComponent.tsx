import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

type Props = {};

const AnimatedSuccessComponent = (props: Props) => {
  return (
    <LottieView
      autoPlay
      speed={1}
      source={require('../../assets/animations/success.json')}
      style={{backgroundColor: '#000', flex: 1}}></LottieView>
  );
};

export default AnimatedSuccessComponent;

const styles = StyleSheet.create({});

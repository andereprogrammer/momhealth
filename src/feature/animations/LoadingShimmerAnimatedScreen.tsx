import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

type Props = {};

const LoadingShimmerAnimatedScreen = (props: Props) => {
  return (
    <LottieView
      autoPlay
      speed={2}
      style={{
        backgroundColor: 'transparent',
        flex: 1,
      }}
      source={{
        uri: 'https://lottie.host/edaf40e3-686f-4ec2-9a30-841b899684a8/Pjz7rO5THS.json',
      }}></LottieView>
  );
};

export default LoadingShimmerAnimatedScreen;

const styles = StyleSheet.create({});

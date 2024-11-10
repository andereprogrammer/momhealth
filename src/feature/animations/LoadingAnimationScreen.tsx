import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

type Props = {};

const LoadingAnimationScreen = (props: Props) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <LottieView
        autoPlay
        speed={2}
        style={{
          backgroundColor: 'transparent',
          width: 300,
          height: 100,
        }}
        source={{
          uri: 'https://lottie.host/edaf40e3-686f-4ec2-9a30-841b899684a8/Pjz7rO5THS.json',
        }}></LottieView>
    </View>
  );
};

export default LoadingAnimationScreen;

const styles = StyleSheet.create({});

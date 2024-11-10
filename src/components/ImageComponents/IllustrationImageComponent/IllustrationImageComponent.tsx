import React from 'react';
import {styled} from 'styled-components/native';
import {IllustrationProps} from './types';
import {Image, View} from 'react-native';
import {horizontalScale} from '../../../helpers/layoutHelper';
import LottieView from 'lottie-react-native';
import Animated from 'react-native';

const IllustrationImageComponent: React.FC<IllustrationProps> = props => {
  return (
    <Animated.View
      style={[props.Viewstyle, {borderRadius: horizontalScale(140)}]}>
      <LottieView
        style={props.Imagestyle}
        autoPlay
        speed={0.8}
        source={props.animationSource}
        loop
        resizeMode="cover"
      />
      {/* <View style={props.Imagestyle}></View> */}
    </Animated.View>
  );
};

export default IllustrationImageComponent;

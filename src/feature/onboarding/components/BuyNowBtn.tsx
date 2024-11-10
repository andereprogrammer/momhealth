import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fonts, Pallete} from '../../../theme/enum';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import ButtonRing from './ButtonRing';

type Props = {onClickFn: () => void};

const BuyNowBtn = ({onClickFn}: Props) => {
  const ring = useSharedValue(1.25);
  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(ring.value, [1.2, 0, 1], [0.3, 0.5, 1]),
        },
      ],
    };
  });

  useEffect(() => {
    ring.value = withRepeat(withTiming(1, {duration: 2000}), -1, true);
  }, []);
  return (
    <Animated.View
      style={[
        {
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}>
      {/* <ButtonRing /> */}

      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        useAngle
        angle={65}
        colors={['#fcb045', '#c721cd', '#9f0dfb']}
        style={{
          width: '86%',
          height: 40,
          borderRadius: 50,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}>
        <TouchableOpacity
          onPress={onClickFn}
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: Pallete.plainWhite,
              fontFamily: fonts.PrimaryJakartaExtraBold,
              fontSize: 16,
            }}>
            Buy now
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </Animated.View>
  );
};

export default BuyNowBtn;

const styles = StyleSheet.create({});

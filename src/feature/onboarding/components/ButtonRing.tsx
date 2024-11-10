import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  delay: number;
};

const Ring = ({delay}: Props) => {
  const ring = useSharedValue(0.3);
  const style = useAnimatedStyle(() => {
    return {
      opacity: 0.8 - ring.value,
      transform: [
        {
          scale: interpolate(ring.value, [0.3, 0.5, 1], [0, 1, 1.15]),
        },
      ],
    };
  });
  useEffect(() => {
    ring.value = withRepeat(
      withDelay(delay, withTiming(1, {duration: 2000})),
      -1,
    );
  }, []);
  return <Animated.View style={[styles.ringStyle, style]} />;
};

const ButtonRing = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 30,
        right: 0,
        bottom: 0,
        width: '86%',
      }}>
      <Ring delay={800} />
      <Ring delay={1050} />
      <Ring delay={1250} />
      <Ring delay={1400} />
      <Ring delay={1800} />
    </View>
  );
};

export default ButtonRing;

const styles = StyleSheet.create({
  ringStyle: {
    width: '100%',
    height: 50,
    borderRadius: 50,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    borderColor: '#9f0dfb',
    borderWidth: 5,
  },
});

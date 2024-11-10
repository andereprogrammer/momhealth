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

type Props = {};
const Ring = ({delay}) => {
  const ring = useSharedValue(0);
  const style = useAnimatedStyle(() => {
    return {
      opacity: 0.8 - ring.value,
      transform: [
        {
          scale: interpolate(ring.value, [0, 1], [0, 4]),
        },
      ],
    };
  });
  useEffect(() => {
    ring.value = withDelay(
      delay,
      withRepeat(
        withTiming(1, {
          duration: 6000,
        }),
        -1,
      ),
    );
  }, []);
  return <Animated.View style={[styles.ring, style]} />;
};

const RingAnimation = (props: Props) => {
  return (
    <View style={styles.container}>
      <Ring delay={0} />
      <Ring delay={1200} />
      <Ring delay={2200} />
      <Ring delay={3200} />
      <Ring delay={4200} />
    </View>
  );
};

export default RingAnimation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    width: 100,
    height: 100,
    borderRadius: 50,
    position: 'absolute',
    borderWidth: 20,
    borderColor: 'rgba(0,0,0,0.3)',
  },
});

import {StyleSheet, View, Dimensions, Platform} from 'react-native';
import React, {useCallback, useImperativeHandle} from 'react';
import {Gesture} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  withTiming,
  useAnimatedProps,
} from 'react-native-reanimated';

type BottomSheetProps = {
  children: React.ReactNode;
  maxCardHeight: number;
};
export type BottomSheetRefProps = {
  scrollTo: (destinaton: number) => void;
  isActive: () => boolean;
};

const {height: SCREEN_HEIGHT} = Dimensions.get('screen');

const BottomSheetFilterFixedHeight = React.forwardRef<
  BottomSheetRefProps,
  BottomSheetProps
>(({children, maxCardHeight}, ref) => {
  const scrollTo = useCallback((destination: number) => {
    'worklet';
    active.value = destination !== 0;
    translateY.value = withSpring(destination, {damping: 50});
  }, []);
  const MAX_TRANSLATE_Y = maxCardHeight;
  const translateY = useSharedValue(0);
  const context = useSharedValue({y: 0});
  const opacity = useSharedValue({opacity: 0});
  const active = useSharedValue(false);
  const style = useAnimatedStyle(() => {
    return {transform: [{translateY: translateY.value}]};
  });
  const gestureHandler = Gesture.Pan()
    .onStart(() => {
      context.value = {y: translateY.value};
    })
    .onUpdate(event => {
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
    })
    .onEnd(() => {
      if (translateY.value > -SCREEN_HEIGHT / 3) {
        translateY.value = withSpring(0, {damping: 50});
      }
    });
  const isActive = useCallback(() => {
    return active.value;
  }, []);
  useImperativeHandle(ref, () => ({scrollTo, isActive}), [scrollTo, isActive]);
  const backDropAnimations = useAnimatedStyle(() => {
    return {
      opacity: withTiming(
        active.value && translateY.value !== 0 ? 1 : opacity.value.opacity,
      ),
    };
  });
  const rPointer = useAnimatedProps(() => {
    return {
      pointerEvents: active.value ? 'auto' : 'none',
    } as any;
  });

  return (
    <>
      <Animated.View
        animatedProps={rPointer}
        onTouchStart={() => {
          scrollTo(0);
        }}
        style={[
          {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(0,0,0,0.4)',
          },
          backDropAnimations,
          styles.elevate,
        ]}
      />
      {/* <GestureDetector gesture={gestureHandler}> */}
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: Platform.OS === 'ios' ? SCREEN_HEIGHT : maxCardHeight,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            width: '100%',
            height: SCREEN_HEIGHT,
            backgroundColor: '#fff',
            zIndex: 100,
          },
          style,
        ]}>
        <View style={styles.line} />
        {children}
      </Animated.View>
    </>
  );
});

export default BottomSheetFilterFixedHeight;

const styles = StyleSheet.create({
  line: {
    width: 75,
    height: 4,
    backgroundColor: '#000',
    alignSelf: 'center',
    marginVertical: 15,
  },
  elevate: {
    zIndex: 100,
  },
});

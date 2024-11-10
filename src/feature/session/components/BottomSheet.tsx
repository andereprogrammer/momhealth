import {
  StyleSheet,
  View,
  Dimensions,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useCallback, useImperativeHandle} from 'react';
import {Gesture} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  withTiming,
  useAnimatedProps,
  interpolate,
} from 'react-native-reanimated';

type BottomSheetProps = {
  children: React.ReactNode;
  maxCardHeight: string;
  backcolor?: string;
};
export type BottomSheetRef = {
  expand: () => void;
  close: () => void;
};

const {height: SCREEN_HEIGHT} = Dimensions.get('screen');

const BottomSheet = React.forwardRef<BottomSheetRef, BottomSheetProps>(
  ({children, maxCardHeight, backcolor = '#fff'}, ref) => {
    const scrollTo = useCallback((destination: number) => {
      'worklet';
      active.value = destination !== 0;
      translateY.value = withSpring(destination, {damping: 50});
    }, []);
    const MAX_TRANSLATE_Y = maxCardHeight;
    const context = useSharedValue({y: 0});
    const active = useSharedValue(false);

    const gestureHandler = Gesture.Pan()
      .onStart(() => {
        context.value = {y: translateY.value};
      })
      .onUpdate(event => {
        translateY.value = event.translationY + context.value.y;
        // translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
      })
      .onEnd(() => {
        if (translateY.value > -SCREEN_HEIGHT / 3) {
          translateY.value = withSpring(0, {damping: 50});
        }
      });
    const isActive = useCallback(() => {
      return active.value;
    }, []);
    useImperativeHandle(ref, () => ({scrollTo, isActive}), [
      scrollTo,
      isActive,
    ]);

    const {height} = Dimensions.get(
      Platform.OS === 'ios' ? 'screen' : 'window',
    );
    const closeHeight = height;
    const percentage = parseFloat(maxCardHeight.replace('%', '')) / 100;
    const openHeight = height - percentage * height;
    const translateY = useSharedValue(closeHeight);

    const style = useAnimatedStyle(() => {
      return {top: translateY.value};
    });
    const backDropAnimations = useAnimatedStyle(() => {
      const opacityV = interpolate(
        translateY.value,
        [closeHeight, openHeight],
        [0, 0.5],
      );
      const display = opacityV === 0 ? 'none' : 'flex';
      return {
        opacity: withTiming(opacityV),
        display,
      };
    });

    const expand = useCallback(() => {
      'worklet';
      translateY.value = withTiming(openHeight);
    }, [openHeight, translateY]);
    const close = useCallback(() => {
      'worklet';
      translateY.value = withTiming(closeHeight);
    }, [closeHeight, translateY]);
    useImperativeHandle(ref, () => ({expand, close}), [expand, close]);

    return (
      <>
        <TouchableWithoutFeedback onPress={() => close()}>
          <Animated.View
            style={[
              {
                ...StyleSheet.absoluteFillObject,
                backgroundColor: 'rgba(0,0,0,0.4)',
                display: 'none',
              },
              backDropAnimations,
              styles.elevate,
            ]}
          />
        </TouchableWithoutFeedback>

        {/* <GestureDetector gesture={gestureHandler}> */}
        <Animated.View
          style={[
            {
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              backgroundColor: backcolor,
              zIndex: 105,
              position: 'absolute',
              width: '100%',
              height: SCREEN_HEIGHT,
            },
            style,
          ]}>
          <View style={styles.line} />
          {children}
        </Animated.View>
      </>
    );
  },
);

export default BottomSheet;

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

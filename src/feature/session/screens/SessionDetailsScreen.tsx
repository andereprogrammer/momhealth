import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import BottomSheetFilter, {
  BottomSheetRefProps,
} from '../components/BottomSheetFilter';
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import theme from '../../../theme/Theme';
import {Slider} from '@miblanchard/react-native-slider';

type Props = {};
const {height: SCREEN_HEIGHT} = Dimensions.get('screen');
const SessionDetailsScreen = (props: Props) => {
  const dimensions = useWindowDimensions();
  const bottomSheetRef = useRef<BottomSheetRefProps>(null);
  const top = useSharedValue(dimensions.height);
  const style = useAnimatedStyle(() => {
    return {
      top: withSpring(top.value, {
        damping: 80,
        overshootClamping: true,
        restDisplacementThreshold: 0.1,
        restSpeedThreshold: 0.1,
        stiffness: 500,
      }),
    };
  });
  const gestureHandler = useAnimatedGestureHandler({
    onStart(_, context) {
      context.startTop = top.value;
    },
    onActive(event, context) {
      top.value = context.startTop + event.translationY;
    },
    onEnd() {
      if (top.value > dimensions.height / 2 + 2) {
        top.value = dimensions.height;
      } else {
        top.value = dimensions.height / 2;
      }
    },
  });
  const [value, setValue] = useState(15);
  const onPress = useCallback(() => {
    const isActive = bottomSheetRef?.current?.isActive();
    if (isActive) {
      bottomSheetRef?.current?.scrollTo(0);
    } else {
      bottomSheetRef?.current?.scrollTo(-200);
    }
  }, []);
  return (
    <View
      style={{
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center',
      }}>
      <View style={styles.container}>
        <Slider value={value} onValueChange={newValue => setValue(newValue)} />
        <Text>Value of slider is : {value}</Text>
      </View>
      <TouchableOpacity onPress={onPress}>
        <Text style={{color: '#000'}}>Click</Text>
      </TouchableOpacity>
      {/* <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View
          style={[
            {
              position: 'absolute',
              left: 0,
              right: 0,
              // top:0,
              bottom: 0,
              borderColor: 'red',
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              elevation: 5,
              shadowColor: '#c3c3c3',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff',
            },
            style,
          ]}>
          <Text>Bottom</Text>
        </Animated.View>
      </PanGestureHandler> */}
      <BottomSheetFilter
        maxCardHeight={-SCREEN_HEIGHT + 300}
        ref={bottomSheetRef}>
        <View
          style={{flex: 1, backgroundColor: theme.colors.cardPrimaryBackground}}
        />
      </BottomSheetFilter>
    </View>
  );
};

export default SessionDetailsScreen;

const styles = StyleSheet.create({
  container: {
    width: '60%',
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});

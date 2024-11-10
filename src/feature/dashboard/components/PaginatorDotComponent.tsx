import React from 'react';
import {View, useWindowDimensions, StyleSheet} from 'react-native';
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {SessionObject} from '../../../constants/types';

type PaginatorDotProps = {
  scrollX: SharedValue<number>;
  data: SessionObject[];
};

const PaginatorDotComponent: React.FC<PaginatorDotProps> = ({
  scrollX,
  data,
}) => {
  const {width} = useWindowDimensions();

  const dotStyle = useAnimatedStyle(() => {
    return {
      width: interpolate(
        scrollX.value,
        data.map((_, i) => i * width),
        [10, 30, 10],
      ),
      height: 8, // or whatever height you want
      borderRadius: 4,
      backgroundColor: 'white',
      marginHorizontal: 4,
    };
  });

  return (
    <View style={styles.dotContainer}>
      {data.map((_, index) => {
        return <Animated.View key={index} style={[styles.dot, dotStyle]} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  dotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'white',
    marginHorizontal: 4,
  },
});

export default PaginatorDotComponent;

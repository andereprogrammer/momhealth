import React from 'react';
import {View, useWindowDimensions, StyleSheet} from 'react-native';
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {SessionObject} from '../../../constants/types';
import {Pallete} from '../../../theme/enum';

type PaginatorProps = {
  scrollX: SharedValue<number>;
  data: SessionObject[];
};

const PaginatorComponent: React.FC<PaginatorProps> = ({scrollX, data}) => {
  const {width} = useWindowDimensions();

  return (
    <View style={styles.dotContainer}>
      {data.map((_, index) => {
        const dotStyle = useAnimatedStyle(() => {
          const widthScale = interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [10, 30, 10],
            Extrapolate.CLAMP,
          );

          return {
            width: widthScale,
          };
        });
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
    width: '30%',
    alignSelf: 'center',
    // backgroundColor: 'rgba(255,255,255,0.5)',
    // padding: 5,
    // borderRadius: 20,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 4,
    backgroundColor: Pallete.Eggplant,
    marginHorizontal: 4,
    opacity: 1,
  },
});

export default PaginatorComponent;

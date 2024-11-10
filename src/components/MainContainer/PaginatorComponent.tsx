import React from 'react';
import {View, useWindowDimensions, Animated, StyleSheet} from 'react-native';
import {SlideProps} from '../../feature/onboarding/constants/types';
import theme from '../../theme/Theme';
import {slides} from '../../feature/onboarding/constants/onboardingSlidesData';

// import { Container } from './styles';
type Scroll = {
  scrollX: Animated.Value;
  slides?: SlideProps[];
};
const PaginatorComponent: React.FC<Scroll> = (props: Scroll) => {
  const {width} = useWindowDimensions();
  return (
    <>
      <View style={styles.viewStyle}>
        {slides.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
          const dataWidth = props.scrollX.interpolate({
            inputRange,
            outputRange: [15, 30, 15],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={i}
              style={{
                width: dataWidth,
                backgroundColor: theme.colors.cardPrimaryBackground,
                borderRadius: 5,
                height: 5,
                marginHorizontal: 8,
              }}
            />
          );
        })}
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  viewStyle: {flexDirection: 'row', height: 40},
});
export default PaginatorComponent;

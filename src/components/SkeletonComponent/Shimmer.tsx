import {
  Animated,
  DimensionValue,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
type SkeletonProps = {
  width: any;
  height: DimensionValue;
  variant?: 'circle' | 'box';
  customStyle?: ViewStyle;
  customBorderRadius?: number;
  backgroundColor?: `#${string}`;
};
const Shimmer = ({
  width,
  height,
  variant = 'box',
  customStyle,
  customBorderRadius = -1,
  backgroundColor = '#c3c3c3',
}: SkeletonProps) => {
  const opacity = useRef(new Animated.Value(0.3));
  let borderRadius = 0;
  if (variant === 'circle') {
    borderRadius =
      typeof height === 'string' ? parseInt(height, 10) / 2 : height / 2;
  } else {
    borderRadius = 20;
  }
  if (customBorderRadius !== -1) {
    borderRadius = customBorderRadius;
  }

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity.current, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(opacity.current, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [opacity]);
  return (
    <Animated.View
      style={[
        {
          opacity: opacity.current,
          height: height,
          width: width,
          borderRadius: borderRadius,
        },
        {backgroundColor: backgroundColor},
        customStyle,
      ]}
    />
  );
};

export default Shimmer;

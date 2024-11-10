import React, {ReactNode, useEffect} from 'react';
import {View, StyleSheet, useWindowDimensions} from 'react-native';
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Path,
  ClipPath,
  G,
} from 'react-native-svg';

type GradientBackgroundProps = {
  startColor: string;
  endColor: string;
  children: ReactNode;
  height: number;
};

const GradientBackground = ({
  startColor,
  endColor,
  children,
  height,
}: GradientBackgroundProps) => {
  const {width} = useWindowDimensions();
  const baseHeight = 441;
  const baseScaleY = 1.35;
  const currentHeight = height + 130;
  const scaleY = (currentHeight / baseHeight) * baseScaleY;

  useEffect(() => {
    console.log(height + 120, scaleY);
  }, [height, scaleY]);

  return (
    <View style={styles.container}>
      <Svg
        width={width}
        height={currentHeight}
        viewBox={`0 0 ${width} ${currentHeight}`}
        fill="none">
        <G scaleX={1.1} scaleY={scaleY} clipPath="url(#clip0_2_846)">
          <Path
            d="M0-3.7h-.5V269.238l.185.15L0 269l-.314.389.001.002.006.004.019.015.074.059c.065.05.161.124.29.219.255.192.639.469 1.153.819 1.029.7 2.58 1.691 4.685 2.862 4.208 2.342 10.623 5.403 19.474 8.3 17.703 5.793 45.143 10.925 84.145 8.33 19.507-1.297 35.065-4.336 48.887-7.355 2.259-.493 4.47-.985 6.644-1.47 11.138-2.48 21.293-4.742 31.803-5.77 25.065-2.451 52.178 2.119 99.136 27.798l.009.004.009.006.026.016.049.029.296.17c.262.149.652.366 1.169.641a88.562 88.562 0 004.612 2.27c4.075 1.874 10.135 4.36 18.09 6.82 15.91 4.921 39.4 9.739 69.744 9.342l.493-.006V-3.7H0z"
            fill="url(#paint0_linear_2_846)"
            stroke={startColor}
          />
          <Path
            d="M376.886 324.922c-48.546 3.539-78.46-10.114-78.781-10.273-59.838-27.607-94.658-18.973-142.836-7.01-12.778 3.172-26.005 6.455-41.138 9.503-73.958 14.91-112.7-9.954-113.089-10.213l.867-.645c.376.251 38.7 24.789 111.927 10.028 15.108-3.046 28.299-6.318 41.065-9.489 48.518-12.039 83.568-20.734 143.904 7.098.371.173 36.668 16.721 94.255 8.363l.185.847a225.942 225.942 0 01-16.359 1.791z"
            fill={startColor}
          />
        </G>
        <Defs>
          <LinearGradient
            id="paint0_linear_2_846"
            x1={width / 2}
            y1={0}
            x2={width / 2}
            y2={height + 120}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor={startColor} />
            <Stop offset={1} stopColor={endColor} />
          </LinearGradient>
          <ClipPath id="clip0_2_846">
            <Path fill="#fff" d={`M0 0H${width}V${currentHeight + 60}H0z`} />
          </ClipPath>
        </Defs>
        {children}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});

export default GradientBackground;

import type {SkiaValue} from '@shopify/react-native-skia';

import {
  BoxShadow,
  rect,
  rrect,
  Group,
  translate,
  Circle,
  Skia,
  vec,
  Path,
  SweepGradient,
  useFont,
  Text,
  useComputedValue,
  LinearGradient,
  Canvas,
  Box,
} from '@shopify/react-native-skia';
import React from 'react';
import {horizontalScale, verticalScale} from '../../../../helpers/layoutHelper';

const r1 = 40;
const path = Skia.Path.Make();
path.addCircle(12 + r1, 12 + r1, r1);
const c = vec(12 + r1, 12 + r1);

const fromCircle = (cx: number, cy: number, r: number) =>
  rrect(rect(cx - r, cy - r, 2 * r, 2 * r), r, r);

interface ProgressBarProps {
  progress: SkiaValue<number>;
}

const colors = ['#451B69', '#451B69'];

const CircleDemo = () => {
  const font = useFont(require('../../../../assets/fonts/DMSans-Bold.ttf'), 16);

  if (font === null) {
    return null;
  }
  const textWidth = font.getTextWidth('00°C');
  return (
    <Canvas
      style={{
        width: '100%',
        height: '100%',
        zIndex: 10,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Group>
        <Group>
          {/* <LinearGradient
            start={vec(12, 12)}
            end={vec(200, 200)}
            colors={['#451B69', '#451B69']}
          /> */}

          {/* <Box box={fromCircle(37 + 60, 37 + 60, 60)} color="#451B69">
            <BoxShadow
              dx={25}
              dy={25}
              blur={60}
              color="rgba(59, 68, 81, 0.5)"
              inner
            />
            <BoxShadow
              dx={-25}
              dy={-25}
              blur={80}
              color="rgba(0, 0, 0, 0.55)"
              inner
            />
          </Box> */}

          <Box box={fromCircle(12 + 40, 12 + 40, 40)} color="#451B69">
            {/* <BoxShadow
              dx={25}
              dy={25}
              blur={60}
              color="rgba(59, 68, 81, 0.5)"
              inner
            />
            <BoxShadow
              dx={-25}
              dy={-25}
              blur={80}
              color="rgba(0, 0, 0, 0.55)"
              inner
            /> */}
          </Box>
          {/* <SweepGradient
            c={vec(12 + 20, 12 + 20)}
            colors={['#FFCAA4', '#FFCAA4']}
          />
          <Path
            path={path}
            style="stroke"
            strokeWidth={15}
            end={30}
            strokeCap="round"
          /> */}
          <Circle cx={12 + 2 * 20} cy={12 + 40} r={60 / 2} color="#532778" />
        </Group>

        <Text
          x={c.x - 26 / 2}
          y={c.y + 18 / 2}
          font={font}
          text={'0%'}
          color="white"
        />

        <Group />
      </Group>
    </Canvas>
  );
};
export default CircleDemo;

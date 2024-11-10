import * as React from 'react';
import Svg, {
  Path,
  Defs,
  LinearGradient,
  Stop,
  SvgProps,
} from 'react-native-svg';
import {
  horizontalScale,
  verticalScale,
} from '../../../../../helpers/layoutHelper';
import {StyleProp, ViewStyle} from 'react-native';

type Props = {
  gradientColors1: string[];
  gradientColors2: string[];
  style: StyleProp<ViewStyle>;
};
function SvgComponent({gradientColors1, gradientColors2, style}: Props) {
  return (
    <Svg
      width={horizontalScale(250)}
      height={verticalScale(150)}
      viewBox={`0 0 ${horizontalScale(250)} ${verticalScale(150)}`}
      style={style}
      fill="none">
      <Path
        d="M59.5 182.5c-28.547 2.039-40.867 17.492-47.283 28.27-3.256 5.471-4.885 8.207-4.31 9.218C8.483 221 11.661 221 18.017 221H293c1.886 0 2.828 0 3.414-.586.586-.586.586-1.529.586-3.414V16.762c0-.891 0-1.337-.185-1.736-.184-.4-.529-.692-1.218-1.279-35.395-30.116-27.796 32.22-43.097 29.753-15.244-2.459-19.365 34.254-7.012 54.493.335.549.502.823.576 1.118.075.294.059.574.028 1.134-1.233 22.402-37.162-22.984-64.592 14.884-62.5 86.28-64.282 63.248-122 67.371z"
        fill="url(#paint0_linear_2_837)"
      />
      <Path
        d="M50.5 178.5c-33.178 6.173-44.031 28.334-47.258 38.136-.656 1.992-.983 2.988-.357 3.854.627.866 1.756.866 4.014.866h285.637c1.92 0 2.879 0 3.488-.59.609-.591.639-1.55.697-3.468l6.212-203.107c.033-1.083.05-1.624-.186-2.096-.235-.471-.684-.788-1.581-1.421C256.696-20.706 263.8 40.02 249 41.5c-14.911 1.492-19.94 32.132-7.721 52.633h.001c.117.197.175.295.22.392.046.098.082.203.154.412l.001.001c8.804 25.504-39.073-23.604-65.655 18.413C121.5 199.5 103.125 168.71 50.5 178.5z"
        stroke="url(#paint1_linear_2_837)"
        strokeWidth={2}
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_2_837"
          x1={286.001}
          y1={-6.73512}
          x2={150.571}
          y2={220.446}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor={gradientColors1[0]} />
          <Stop offset={0.437586} stopColor={gradientColors1[1]} />
          <Stop offset={0.97846} stopColor={gradientColors1[2]} />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_2_837"
          x1={149.5}
          y1={0.999511}
          x2={149.5}
          y2={223}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor={gradientColors2[0]} />
          <Stop offset={0.966809} stopColor={gradientColors2[1]} />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;

import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

const PuzzleComplete = () => (
  <Svg width={25} height={25} fill="none">
    <Circle cx={12.5} cy={12.5} r={12.5} fill="#04CC00" />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeWidth={3}
      d="m5.833 12.063 4.783 4.658 8.608-8.385"
    />
  </Svg>
);
export default PuzzleComplete;

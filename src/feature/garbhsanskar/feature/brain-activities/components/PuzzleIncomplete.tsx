import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

const PuzzleIncomplete = () => (
  <Svg width={25} height={25} fill="none">
    <Circle cx={12.5} cy={12.5} r={12.5} fill="#FFCA2C" />
    <Path
      fill="#fff"
      d="M7.848 5.386c-.302-.463-.174-1.088.317-1.34A9.5 9.5 0 1 1 4.393 7.55l2.019 1.233a7.134 7.134 0 1 0 3.057-2.74c-.5.234-1.117.112-1.42-.35l-.2-.306Z"
    />
    <Path
      fill="#fff"
      d="m4.392 7.549 2.019 1.233 4.253 3.05a.978.978 0 1 0 1.1-1.617L6.246 6.66a1 1 0 0 0-1.327.221l-.528.669Z"
    />
  </Svg>
);
export default PuzzleIncomplete;

import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

const BackButton = () => (
  <Svg width={30} height={30} fill="none">
    <Circle cx={15} cy={15} r={15} fill="#878787" fillOpacity={0.91} />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m17 9-7 5.793L17 21"
    />
  </Svg>
);

export default BackButton;

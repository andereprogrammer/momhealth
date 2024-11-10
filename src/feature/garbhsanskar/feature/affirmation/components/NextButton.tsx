import React from 'react';
import Svg, { Path } from "react-native-svg";

const NextButton = () => (
    <Svg
      width={15}
      height={23}
      fill="none"
    >
      <Path
        stroke="#9611FE"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={4}
        d="m2 20.857 11-9.103L2 2"
      />
    </Svg>
)

  export default NextButton;
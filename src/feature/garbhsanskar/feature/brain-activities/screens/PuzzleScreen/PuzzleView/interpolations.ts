import {Animated} from 'react-native';

export const flipFace = (rotateVal: Animated.Value) => {
  return {
    transform: [
      {
        rotateY: rotateVal.interpolate({
          inputRange: [0, 0.5],
          outputRange: ['0deg', '90deg'],
        }),
      },
    ],
  };
};

export const flipFaceReverse = (rotateVal: Animated.Value) => {
  return {
    transform: [
      {
        rotateY: rotateVal.interpolate({
          inputRange: [0.5, 1],
          outputRange: ['-90deg', '-180deg'],
        }),
      },
    ],
  };
};

export const flipAnswerStyle = (rotateVal: Animated.Value) => {
  return {
    transform: [
      {
        rotateY: rotateVal.interpolate({
          inputRange: [0.5, 1],
          outputRange: ['90deg', '180deg'],
        }),
      },
    ],
  };
};

export const flipAnswerReverse = (rotateVal: Animated.Value) => {
  return {
    transform: [
      {
        rotateY: rotateVal.interpolate({
          inputRange: [0, 0.5],
          outputRange: ['0deg', '-90deg'],
        }),
      },
    ],
  };
};

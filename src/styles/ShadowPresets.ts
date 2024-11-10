type ShadowLevelType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

type ShadowOffsetType = [number, ShadowLevelType];

type ShadowPresets = {
  shadowLevel?: ShadowLevelType | undefined;
  shadowColor?: `#${string}`;
  shadowOffset?: ShadowOffsetType;
  shadowOpacity?: number;
  shadowRadius?: number;
};

// Default values for shadow properties
const DEFAULT_SHADOW_COLOR: `#${string}` = '#000';
const DEFAULT_SHADOW_OFFSET: ShadowOffsetType = [0, 2];
const DEFAULT_SHADOW_OPACITY: number = 0.32;
const DEFAULT_SHADOW_RADIUS: number = 3;

// Function to generate shadow styles
const getDefaultShadow = ({
  shadowLevel = undefined,
  shadowColor = DEFAULT_SHADOW_COLOR,
  shadowOffset = DEFAULT_SHADOW_OFFSET,
  shadowOpacity = DEFAULT_SHADOW_OPACITY,
  shadowRadius = DEFAULT_SHADOW_RADIUS,
}: ShadowPresets = {}) => {
  let height;
  if (shadowLevel !== undefined) {
    height = shadowLevel;
  } else {
    height = shadowOffset[1];
  }
  const opacity = shadowOpacity === -1 ? (height / 12) * 0.58 : shadowOpacity;
  const radius = shadowRadius === -1 ? (height / 12) * 16 : shadowRadius;
  return {
    shadowColor: shadowColor,
    shadowOffset: {
      width: shadowOffset[0],
      height: height,
    },
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation: height * 2,
  };
};

export default getDefaultShadow;

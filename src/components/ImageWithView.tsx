import {
  DimensionValue,
  Image,
  ImageProps,
  ImageResizeMode,
  ImageStyle,
  StyleProp,
  StyleSheetProperties,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {commonStyles} from '../feature/pog/styles/pogStyles';
import {Placeholder} from '../assets';

type ImageWithViewProps = {
  width: DimensionValue | undefined;
  height: DimensionValue | undefined;
  imageSource: string | undefined | '' | ImageProps;
  mode?: ImageResizeMode | undefined;
  isLocalImage: boolean;
  customStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  tintColor?: string;
};

const ImageWithView = ({
  width,
  height,
  imageSource = '',
  mode = 'cover',
  isLocalImage = true,
  customStyle,
  imageStyle,
  tintColor = '',
}: ImageWithViewProps) => {
  return (
    <View
      style={[
        {
          width: width,
          height: height,
        },
        customStyle,
      ]}>
      <Image
        tintColor={tintColor}
        source={
          imageSource
            ? isLocalImage
              ? imageSource
              : {uri: imageSource}
            : Placeholder
        }
        resizeMode={mode}
        style={[commonStyles.imageAspect, imageStyle]}
      />
    </View>
  );
};

export default ImageWithView;

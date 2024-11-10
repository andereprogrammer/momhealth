import {
  ImageResizeMode,
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {CachedImage} from '@georstat/react-native-image-cache';

type Props = {
  source: string;
  imageStyle: StyleProp<ImageStyle>;
  resizeCacheMode: ImageResizeMode | undefined;
};

const CachedImageWrapperComponent = (props: Props) => {
  return (
    <>
      <CachedImage
        source={props.source}
        resizeMode={props.resizeCacheMode}
        style={props.imageStyle}
      />
    </>
  );
};

export default CachedImageWrapperComponent;

const styles = StyleSheet.create({});

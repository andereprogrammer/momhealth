import {
  Image,
  ImageProps,
  ImageResizeMode,
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {CacheManager, CachedImage} from '@georstat/react-native-image-cache';
import {Placeholder} from '../../assets';

type CachedImageBgProps = {
  source: string;
  viewStyle: StyleProp<ViewStyle>;
  imageStyle: StyleProp<ImageStyle>;
  resizeModeCache: ImageResizeMode | undefined;
  imageLocal?: boolean;
};

const CachedImageBackgroundComponent = (props: CachedImageBgProps) => {
  return (
    <View style={props.viewStyle}>
      <CachedImage
        source={props.source}
        style={props.imageStyle}
        resizeMode={props.resizeModeCache}
        thumbnailSource={props.source}
      />
    </View>
  );
};

export default CachedImageBackgroundComponent;

const styles = StyleSheet.create({});

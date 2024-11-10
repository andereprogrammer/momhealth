import {
  Dimensions,
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {ReactNode} from 'react';

type Props = {
  children: ReactNode;
  sourceImage: ImageSourcePropType;
  paddingStyle?: any;
};
const {width, height} = Dimensions.get('screen');

const FullPageImageBg = ({children, sourceImage, paddingStyle}: Props) => {
  return (
    <View
      style={[
        {
          flex: 1,
          position: 'relative',
        },
        paddingStyle,
      ]}>
      <ImageBackground
        style={styles.imageView}
        imageStyle={{
          width: '100%',
          height: '100%',
        }}
        source={sourceImage}>
        {children}
      </ImageBackground>
    </View>
  );
};

export default FullPageImageBg;

const styles = StyleSheet.create({
  imageView: {
    flex: 1,
    minWidth: width,
    minHeight: height,
  },
});

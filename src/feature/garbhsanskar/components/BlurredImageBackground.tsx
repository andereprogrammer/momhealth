import {
  Dimensions,
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  View,
} from 'react-native';
import React, {ReactNode} from 'react';

type Props = {
  children: ReactNode;
  sourceImage: ImageSourcePropType;
};
const {width, height} = Dimensions.get('screen');

const BlurredImageBackground = (props: Props) => {
  return (
    <View
      style={{
        flex: 1,
      }}>
      <ImageBackground
        style={styles.imageView}
        imageStyle={{
          width: '100%',
          height: '100%',
        }}
        source={props.sourceImage}
        blurRadius={90}>
        {props.children}
      </ImageBackground>
    </View>
  );
};

export default BlurredImageBackground;

const styles = StyleSheet.create({
  imageView: {
    flex: 1,
    minWidth: width,
    minHeight: height,
  },
});

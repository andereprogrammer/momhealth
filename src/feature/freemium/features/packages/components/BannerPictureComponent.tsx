import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {LadyPicturePackagePage} from '../../../../../assets';

type Props = {};

const BannerPictureComponent = (props: Props) => {
  return (
    <View style={styles.container}>
      <Image
        source={LadyPicturePackagePage}
        resizeMethod="resize"
        resizeMode="contain"
        style={styles.imageAspect}
      />
    </View>
  );
};

export default BannerPictureComponent;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 250,
    height: 270,
    zIndex: Platform.OS === 'ios' ? -1 : 1,
  },
  imageAspect: {
    width: '100%',
    height: '100%',
  },
});

import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BgPackage1} from '../../../../../assets';
import {verticalScale} from '../../../../../helpers/layoutHelper';

type Props = {};

const BackgroundCover = (props: Props) => {
  return (
    <>
      <Image
        source={BgPackage1}
        resizeMethod="resize"
        resizeMode="cover"
        style={{
          position: 'absolute',
          top: verticalScale(300),
          width: '100%',
          height: 150,
          zIndex: 10,
          opacity: 0.3,
        }}
      />
      <Image
        source={BgPackage1}
        resizeMethod="resize"
        resizeMode="cover"
        style={{
          position: 'absolute',
          top: verticalScale(300),
          width: '100%',
          height: 150,
          zIndex: 10,
          opacity: 0.3,
          left: 0,
        }}
      />
    </>
  );
};

export default BackgroundCover;

const styles = StyleSheet.create({});

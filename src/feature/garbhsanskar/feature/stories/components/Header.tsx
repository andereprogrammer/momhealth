import {Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import React from 'react';

type HeaderProps = {
  image: ImageSourcePropType;
  position: any;
};

const Header = ({image, position}: HeaderProps) => {
  let positionCss = position === 'top' ? {top: 0} : {bottom: 0};
  return (
    <View
      style={[
        {
          width: '100%',
          height: 70,
          position: 'absolute',
        },
        positionCss,
      ]}>
      <Image
        style={{
          width: '100%',
          height: '100%',
        }}
        resizeMethod="resize"
        resizeMode="cover"
        source={image}
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});

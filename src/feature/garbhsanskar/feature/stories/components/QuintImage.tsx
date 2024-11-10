import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {StoryQuint} from '../../../../../assets';

type Props = {};

const QuintImage = (props: Props) => {
  return (
    <View
      style={{
        width: 100,
        height: 100,
        position: 'absolute',
        bottom: 60,
        left: 4,
      }}>
      <Image
        style={{
          width: '100%',
          height: '100%',
        }}
        resizeMode="cover"
        resizeMethod="resize"
        source={StoryQuint}
      />
    </View>
  );
};

export default QuintImage;

const styles = StyleSheet.create({});

import {StyleSheet, View} from 'react-native';
import React from 'react';
import Slider from '@react-native-community/slider';
type Props = {};

const SeekBar = (props: Props) => {
  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
      }}>
      <Slider
        style={{width: '100%', height: 40}}
        minimumValue={10}
        maximumValue={100}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
      />
    </View>
  );
};

export default SeekBar;

const styles = StyleSheet.create({});

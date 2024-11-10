import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Slider} from 'react-native-elements';

type Props = {
  changeVolume: (volume: number) => void;
  volume: number;
};

const VolumeSlider = ({volume, changeVolume}: Props) => {
  return (
    <View style={styles.seekBarView}>
      <View style={styles.seekBar}>
        <Slider
          style={styles.seekBarDimension}
          value={volume}
          minimumValue={0}
          maximumValue={1}
          thumbTintColor="#FFD369"
          minimumTrackTintColor="#FFD369"
          maximumTrackTintColor="#fff"
          onSlidingComplete={value => {
            changeVolume(value);
          }}
        />
      </View>
    </View>
  );
};

export default VolumeSlider;

const styles = StyleSheet.create({
  seekBarDimension: {width: '100%', height: 40},
  seekBar: {
    width: '100%',
    alignItems: 'center',
  },
  seekBarView: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
});

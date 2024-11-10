import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import LottieView from 'lottie-react-native';
import {MoodValue} from '../../session/typings';
import {Pallete, fonts} from '../../../theme/enum';

type MoodProps = {
  onAnimationClick: (params: MoodValue[], name: string) => void;
  moodsAnimationList: any;
  mood: string;
  id: number;
  values: any;
  selected?: boolean;
};

const AnimationMoodComponent = (moodValue: MoodProps) => {
  useEffect(() => {
    console.log(moodValue.selected);
  }, [moodValue.selected]);
  const onPress = (values: any, moodnameV: string) => {
    moodValue.onAnimationClick(values, moodValue.mood);
  };
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => onPress(moodValue.values, moodValue.mood)}
      style={[styles.container]}>
      <View
        style={[styles.animationView, moodValue.selected && styles.selected]}>
        <LottieView
          containerProps={{style: {paddingHorizontal: 5}}}
          cacheComposition={false}
          autoPlay
          source={moodValue.moodsAnimationList[moodValue.mood]}
          style={[styles.animationViewLottie]}
        />
      </View>
      <Text style={[styles.text, moodValue.selected && styles.selectedText]}>
        {moodValue.mood}
      </Text>
    </TouchableOpacity>
  );
};

export default AnimationMoodComponent;

const styles = StyleSheet.create({
  container: {
    width: '25%',
    height: '49%',
    alignItems: 'center',
    gap: 10,
  },
  animationView: {
    width: '90%',
    height: '70%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  animationViewLottie: {
    width: '100%',
    height: '100%',
    transform: [{scaleY: 1}],
    objectFit: 'cover',
  },
  text: {textAlign: 'center'},
  selected: {
    borderWidth: 1,
    borderColor: Pallete.Eggplant,
    borderRadius: 60,
  },
  selectedText: {
    fontFamily: fonts.SecondaryDMSansBold,
    fontSize: 15,
  },
});

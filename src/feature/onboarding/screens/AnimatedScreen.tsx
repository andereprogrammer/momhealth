import {BackHandler, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import AnimatedText from './AnimatedText';
import {useRoute} from '@react-navigation/native';

type Props = {};

const AnimatedScreen = (props: Props) => {
  const route = useRoute();

  useEffect(() => {
    const onBackPress = () => {
      return route.name === 'AnimatedScreen';
    };
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  }, []);

  return (
    <AnimatedText
      text={`You’re in the perfect place!`}
      secondText="Eveheal is here to support you every step of the way"
    />
  );
};

export default AnimatedScreen;

const styles = StyleSheet.create({});

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {commonStyles} from '../styles/pogStyles';

type Props = {
  ctaText: string;
  screenName: string;
};

const PogBtn = ({ctaText, screenName}: Props) => {
  const navigation = useNavigation<NavigationProp<any, any>>();
  const navigateTo = () => {
    navigation.navigate(screenName);
  };
  return (
    <LinearGradient
      style={[
        commonStyles.spacing,
        styles.stylingBtn,
        commonStyles.marginInnerSpacing,
      ]}
      colors={['#BC5DFF', '#7A03D2']}>
      <TouchableOpacity onPress={navigateTo}>
        <Text style={[commonStyles.headingText, styles.textColor]}>
          {ctaText}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default PogBtn;

const styles = StyleSheet.create({
  stylingBtn: {
    borderRadius: 20,
  },
  textColor: {
    color: '#fff',
  },
});

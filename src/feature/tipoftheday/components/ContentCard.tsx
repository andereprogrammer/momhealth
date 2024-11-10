import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {commonStyles} from '../styles';

type ContentCardProps = {
  content: string;
};

const ContentCard = ({content = ''}: ContentCardProps) => {
  return (
    <LinearGradient
      style={[styles.contentCard, styles.contentCardSpacing]}
      colors={['rgba(255, 255, 255, 0.7)', 'rgba(255, 255, 255, 0.8)']}>
      <Text style={[commonStyles.headingText, {letterSpacing: 1.2}]}>
        {content}
      </Text>
    </LinearGradient>
  );
};

export default ContentCard;

const styles = StyleSheet.create({
  contentCardSpacing: {
    minHeight: 300,
    paddingHorizontal: 15,
    paddingVertical: 25,
    marginHorizontal: 20,
    borderRadius: 20,
  },
  contentCard: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

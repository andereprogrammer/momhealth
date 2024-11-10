import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FullPageImageBg from '../../../components/FullPageImageBg';
import {
  StoryBg,
  StoryBook,
  StoryBottom,
  StoryQuint,
  StoryTop,
} from '../../../../../assets';
import Header from '../components/Header';
import HighlightedBackButton from '../../../../../components/HighlightedBackButton';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {fonts, Pallete} from '../../../../../theme/enum';
import StoryBody from '../components/StoryBody';
import TitleHeader from '../components/TitleHeader';
import PageTurnBtn from '../components/PageTurnBtn';
import QuintImage from '../components/QuintImage';
import BookHeader from '../components/BookHeader';

type Props = {
  title: string;
};

const GarbhSanskarStory = ({title = 'random story for the dat'}: Props) => {
  const navigation = useNavigation<NavigationProp<any, any>>();
  return (
    <View style={styles.screen}>
      <FullPageImageBg sourceImage={StoryBg}>
        <Header image={StoryTop} position={'top'} />
        <View style={styles.spacer} />
        <BookHeader title="Random story " />
        <TitleHeader />
        <StoryBody />
        <PageTurnBtn />
        <QuintImage />
        <Header image={StoryBottom} position={'bottom'} />
      </FullPageImageBg>
    </View>
  );
};

export default GarbhSanskarStory;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  spacer: {
    height: 100,
  },
});

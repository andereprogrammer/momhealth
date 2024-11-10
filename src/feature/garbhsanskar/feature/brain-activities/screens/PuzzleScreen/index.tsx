import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PuzzleImage, PuzzleScreenBackground} from '../../../../../../assets';
import Header from '../../../../components/Header';
import BackButton from '../../components/BackButton';
import {fonts, Pallete} from '../../../../../../theme/enum';
import {horizontalScale} from '../../../../../../helpers/layoutHelper';
import PuzzleView from './PuzzleView';
import Shimmer from '../../../../../../components/SkeletonComponent/Shimmer';
import {useBrainActivityStore} from '../../store/useBrainActivities';
import PreviousPuzzle from './components/PreviousPuzzle';
import {PuzzleItem} from '../../interface';
import {RouteProp, useRoute} from '@react-navigation/native';

const {height} = Dimensions.get('window');

const PuzzleScreen = () => {
  const insets = useSafeAreaInsets();
  const {
    currentPuzzleItem,
    puzzles,
    setPuzzleItem,
    resetCardState,
    resetState,
  } = useBrainActivityStore();
  const params = useRoute<RouteProp<any>>()?.params as {hidePrevious: boolean};
  const [showPreviousCTA, setShowPreviousCTA] = useState(
    currentPuzzleItem?.id !== 1,
  );
  const [loading, setLoading] = useState(false);

  const onShowAnswer = (status: boolean, id?: number) => {
    if (params?.hidePrevious) {
      setShowPreviousCTA(false);
    } else {
      setShowPreviousCTA(id === 1 ? false : !status);
    }
  };

  const onResetState = () => resetCardState(false);

  const onPreviousPuzzlePress = () => {
    if (currentPuzzleItem !== null) {
      const puzzleItem = puzzles.find(item => {
        return item.id === currentPuzzleItem.id - 1;
      });
      setPuzzleItem(puzzleItem as PuzzleItem);
    }
  };

  useEffect(() => {
    setLoading(true);
    resetCardState(true);
    setLoading(false);
  }, [currentPuzzleItem?.id]);

  return (
    <ImageBackground source={PuzzleScreenBackground} style={styles.screen}>
      <View style={styles.container}>
        <View
          style={[
            styles.screen,
            {paddingTop: insets.top, height: height * 0.65},
          ]}>
          <Header
            heading="Brain Activity"
            headingStyles={styles.headingStyle}
            customBackComponent={true}
            BackComponent={BackButton}
            childComponent={
              <PreviousPuzzle
                onPreviousPuzzlePress={onPreviousPuzzlePress}
                loading={loading}
                showPreviousCTA={showPreviousCTA}
              />
            }
            customContainerStyle={styles.customContainerStyle}
          />
          <View style={styles.body}>
            <View style={styles.headingDescription}>
              {loading ? (
                <Shimmer width={'60%'} height={28} />
              ) : (
                <Text style={styles.descriptionHeading}>
                  Lets Solve for today!
                </Text>
              )}
              <View style={{height: loading ? 8 : 4}} />
              {loading ? (
                <Shimmer width={'30%'} height={20} />
              ) : (
                <Text style={styles.description}>
                  Puzzles develop left brain of the baby
                </Text>
              )}
            </View>
            <PuzzleView
              loading={loading}
              question={currentPuzzleItem?.question as string}
              onShowAnswer={onShowAnswer}
              onPreviousPuzzlePress={onPreviousPuzzlePress}
              id={currentPuzzleItem?.id as number}
              resetState={resetState}
              onReset={onResetState}
              answer={currentPuzzleItem?.answer as string}
              uri={currentPuzzleItem?.image_link as string}
              activityId={currentPuzzleItem?.activityId as string}
              todayPuzzle={params.hidePrevious}
            />
          </View>
        </View>
        <View style={{height: 0.15 * height}}>
          <Image
            resizeMode="contain"
            source={PuzzleImage}
            style={styles.footerImage}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    justifyContent: 'space-between',
    height: '100%',
  },
  headingStyle: {
    color: Pallete.darkBlack,
    marginLeft: 8,
  },
  body: {
    flex: 1,
    paddingHorizontal: 16,
  },
  customContainerStyle: {
    justifyContent: 'space-between',
    paddingRight: horizontalScale(16),
    paddingLeft: horizontalScale(8),
  },
  headingDescription: {
    marginTop: 16,
    marginBottom: 24,
  },
  description: {
    color: Pallete.darkBlack,
    fontSize: 12,
    fontFamily: fonts.SecondaryDMSansMedium,
    marginTop: 4,
  },
  descriptionHeading: {
    color: Pallete.darkBlack,
    fontSize: 18,
    fontFamily: fonts.SecondaryDMSansBold,
  },
  footerImage: {
    height: '100%',
    aspectRatio: 1.15,
  },
});

export default PuzzleScreen;

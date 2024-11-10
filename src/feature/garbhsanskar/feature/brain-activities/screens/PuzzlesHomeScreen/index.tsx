import React, {useCallback, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useFocusEffect} from '@react-navigation/native';
import TabView from './TabView';
import BackButton from '../../components/BackButton';
import ImageContainer from '../../components/ImageContainer';
import Header from '../../../../components/Header';
import {useBrainActivityStore} from '../../store/useBrainActivities';
import {fonts, Pallete} from '../../../../../../theme/enum';
import {
  getMidBrainPuzzles,
  setPuzzleStatus,
} from '../../../../../../api/homeapis';
import {PuzzleItem} from '../../interface';

const {width} = Dimensions.get('window');

const BrainActivitiesHomeScreen = ({navigation}: any) => {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const {setPuzzleItem, setPuzzles, puzzles, todayPuzzle, setTodayPuzzle} =
    useBrainActivityStore();

  const onPuzzlePress = (item: PuzzleItem, loading: boolean) => {
    if (!loading) {
      setPuzzleItem(item);
      setPuzzleStatus({id: item?.activityId, status: 'INCOMPLETE'}).then(() => {
        navigation.navigate('PuzzleScreen', {hidePrevious: false});
      });
    }
  };

  const onImagePress = useCallback(() => {
    setPuzzleItem(todayPuzzle as PuzzleItem);
    navigation.navigate('PuzzleScreen', {hidePrevious: true});
  }, [todayPuzzle]);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      getMidBrainPuzzles().then(resp => {
        const activities: PuzzleItem[] = (
          resp.data.activities as Array<any>
        ).map((item, index) => {
          return {
            ...item,
            activityId: item.id,
            id: index + 1,
            complete:
              item?.status === 'PENDING' ? null : item?.status === 'COMPLETED',
          };
        });
        let puzzleData = activities.filter(item => {
          if (item?.status !== 'COMPLETED') {
            return item;
          }
        });

        if (puzzleData.length === 0) {
          setPuzzles(activities);
          setTodayPuzzle(activities[0] ?? null);
        } else if (puzzleData.length > 0) {
          const firstItem = puzzleData.shift() as PuzzleItem;
          setTodayPuzzle(firstItem);
          setPuzzles(
            activities.filter(
              item => item.activityId !== firstItem?.activityId,
            ),
          );
        }
        setLoading(false);
      });
    }, []),
  );

  return (
    <View style={styles.container}>
      <View style={[styles.screen, {paddingTop: insets.top}]}>
        <Header
          heading="Brain Activity"
          headingStyles={styles.headingStyle}
          customBackComponent={true}
          BackComponent={BackButton}
          headingContainerStyle={styles.headingContainerStyle}
          customContainerStyle={styles.customContainerStyle}
        />
        <View style={[styles.header, {marginTop: todayPuzzle ? 24 : 0}]}>
          {todayPuzzle && (
            <>
              <Text style={styles.puzzleText}>Today's Puzzle</Text>
              <ImageContainer
                onImagePress={onImagePress}
                puzzle={todayPuzzle as PuzzleItem}
                loading={loading}
              />
            </>
          )}
          <TabView
            loading={loading}
            data={loading ? [null, null] : puzzles}
            onPuzzlePress={onPuzzlePress}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Pallete.whiteBackground,
    paddingBottom: 24,
  },
  screen: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    flex: 1,
  },
  puzzleText: {
    fontFamily: fonts.SecondaryDMSansBold,
    fontSize: 18,
    color: Pallete.darkBlack,
    marginBottom: 16,
  },
  crosswordText: {
    fontFamily: fonts.SecondaryDMSansBold,
    fontSize: 24,
    color: Pallete.darkBlack,
    marginBottom: 8,
  },
  dayText: {
    fontFamily: fonts.SecondaryDMSansRegular,
    fontSize: 16,
    color: Pallete.darkBlack,
  },
  background: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width - 32,
    aspectRatio: 3.4,
  },
  imageStyle: {
    width: 38,
    maxHeight: 38,
  },
  headingStyle: {
    color: Pallete.darkBlack,
  },
  headingContainerStyle: {
    paddingHorizontal: 0,
  },
  customContainerStyle: {
    paddingHorizontal: 16,
  },
});

export default BrainActivitiesHomeScreen;

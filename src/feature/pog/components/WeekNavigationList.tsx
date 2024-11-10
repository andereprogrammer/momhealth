import React, {useRef, useState, useEffect, useCallback, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  FlatList,
  ListRenderItemInfo,
  Platform,
} from 'react-native';
import {commonStyles} from '../styles/pogStyles';
import {fonts, Pallete} from '../../../theme/enum';
import {
  horizontalScale,
  SCREEN_HEIGHT_WINDOW,
  verticalScale,
} from '../../../helpers/layoutHelper';
import {stringLiterals} from '../constants';
import s from '../../../styles/GlobalStyles';
import usePogStore from '../../freemium/store/usePogDataStore';
import {trigger} from 'react-native-haptic-feedback';
import {options} from '../../dashboard/navigation/BottomTabNavigation/HomeTabNavigator';
import ImageWithView from '../../../components/ImageWithView';
import {BackBtn} from '../../../assets';
import getDefaultShadow from '../../../styles/ShadowPresets';

const {width, height} = Dimensions.get('window');
const ITEM_WIDTH = width / 6;

const WeekNavigationList = ({selectedWeekNumber, pog_week}) => {
  if (pog_week <= 5) {
    pog_week = 5;
  }
  const weeks = useMemo(() => Array.from({length: 36}, (_, i) => i + 5), []);
  const [selectedWeek, setSelectedWeek] = useState(pog_week);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList<number>>(null);
  const [currentIndex, setCurrentIndex] = useState(pog_week - 5);

  const {currentWeek} = usePogStore();

  useEffect(() => {
    setTimeout(() => {
      scrollToIndex(pog_week < 5 ? 0 : pog_week - 5);
    }, 100);
  }, [pog_week]);

  useEffect(() => {
    setSelectedWeek(pog_week);
  }, [pog_week]);

  const scrollToIndex = useCallback((index: number) => {
    flatListRef.current?.scrollToIndex({index, animated: true});
  }, []);

  const handleWeekSelect = useCallback(
    (week: number) => {
      const newWeek = week < 5 ? 5 : week;
      setSelectedWeek(newWeek);
      selectedWeekNumber(newWeek);
    },
    [selectedWeekNumber],
  );

  const renderWeek = useCallback(
    ({item: week, index}: ListRenderItemInfo<number>) => {
      const inputRange = [
        (index - 2) * ITEM_WIDTH,
        (index - 1) * ITEM_WIDTH,
        index * ITEM_WIDTH,
        (index + 1) * ITEM_WIDTH,
        (index + 2) * ITEM_WIDTH,
      ];

      const opacity = scrollX.interpolate({
        inputRange,
        outputRange: [0.35, 0.65, 1, 0.65, 0.35],
        extrapolate: 'clamp',
      });

      const scaleHeight = scrollX.interpolate({
        inputRange,
        outputRange: [0.66, 0.86, 1, 0.86, 0.66],
        extrapolate: 'clamp',
      });

      const fontSizes = scrollX.interpolate({
        inputRange,
        outputRange: [15.5, 18, 20, 18, 15.5],
        extrapolate: 'clamp',
      });
      const perspective = scrollX.interpolate({
        inputRange,
        outputRange: [700, 800, 1000, 800, 700],
        extrapolate: 'clamp',
      });

      const colorInterpolation = scrollX.interpolate({
        inputRange,
        outputRange: [
          Pallete.Eggplant,
          Pallete.Eggplant,
          Pallete.plainWhite,
          Pallete.Eggplant,
          Pallete.Eggplant,
        ],
      });

      return (
        <Animated.View
          style={[
            styles.weekContainer,
            getDefaultShadow(),
            {
              opacity,
              transform: [{scaleX: scaleHeight}, {perspective: perspective}],
            },
            s.positionRelative,
          ]}>
          <TouchableOpacity
            hitSlop={{top: 50, bottom: 50, left: 20, right: 20}}
            style={styles.touchable}
            onPress={() => handleWeekSelect(week)}>
            <Animated.Text
              style={[
                styles.weekText,
                {color: colorInterpolation, fontSize: fontSizes},
                s.z30,
              ]}>
              {week}
            </Animated.Text>
          </TouchableOpacity>
        </Animated.View>
      );
    },
    [scrollX, handleWeekSelect],
  );

  const handleScroll = useCallback(
    event => {
      const xOffset = event.nativeEvent.contentOffset.x;
      const newIndex = Math.round(xOffset / ITEM_WIDTH);

      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
        trigger('selection', options);
      }
    },
    [currentIndex],
  );

  const handleMomentumScrollEnd = useCallback(() => {
    const index = Math.round(currentIndex);
    handleWeekSelect(weeks[index]);
    scrollToIndex(index);
  }, [currentIndex, weeks, scrollToIndex, handleWeekSelect]);

  const handleNext = () => {
    const index = Math.round(currentIndex);
    if (index < weeks.length - 1) {
      handleWeekSelect(weeks[index + 1]);
    }
  };

  const handlePrev = () => {
    const index = Math.round(currentIndex);
    if (index > 0) {
      handleWeekSelect(weeks[index - 1]);
    }
  };

  return (
    <>
      <View
        style={{
          position: 'absolute',
          left: width / 2.3,
          top: width / 2.3,
          zIndex: 100,
        }}>
        <Text
          style={[
            styles.weekText,
            styles.selectedWeekText,
            {
              color: Pallete.Eggplant,
              fontSize: 13,
            },
          ]}>
          {true ? stringLiterals.WEEK : ''}
        </Text>
      </View>

      <View style={styles.container}>
        <View
          style={[
            styles.selectedWeekContainer,
            {
              alignItems: 'flex-start',
              justifyContent: 'center',
            },
            {
              position: 'absolute',
              left: width / 2.53,
              top:
                Platform.OS === 'ios'
                  ? SCREEN_HEIGHT_WINDOW * 0.00235
                  : SCREEN_HEIGHT_WINDOW * 0.0085,
            },
          ]}
        />

        <Animated.View style={[commonStyles.flexRow, {position: 'relative'}]}>
          <TouchableOpacity
            onPress={handlePrev}
            style={{
              position: 'absolute',
              left: '2%',
              top: '14%',
              zIndex: 20,
            }}>
            <ImageWithView
              isLocalImage
              width={20}
              height={20}
              imageSource={BackBtn}
              tintColor={Pallete.Eggplant}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleNext}
            style={{
              position: 'absolute',
              right: '2%',
              top: '14%',
              transform: [{rotate: '180deg'}],
              zIndex: 20,
            }}>
            <ImageWithView
              isLocalImage
              width={20}
              height={20}
              imageSource={BackBtn}
              tintColor={Pallete.Eggplant}
            />
          </TouchableOpacity>
          <Animated.FlatList
            data={weeks}
            ref={flatListRef}
            horizontal
            keyExtractor={item => item.toString()}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatListContent}
            scrollEventThrottle={16}
            onMomentumScrollEnd={handleMomentumScrollEnd}
            renderItem={renderWeek}
            bounces={false}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: false, listener: handleScroll},
            )}
            decelerationRate="fast"
            initialScrollIndex={pog_week - 5}
            getItemLayout={(data, index) => ({
              length: ITEM_WIDTH,
              offset: ITEM_WIDTH * index,
              index,
            })}
          />
        </Animated.View>
      </View>
    </>
  );
};

export default WeekNavigationList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: verticalScale(108),
    zIndex: 10,
    height: 40,
    overflow: 'hidden',
    width: width / 1.08,
    alignSelf: 'center',
  },
  flatListContent: {
    paddingHorizontal: width / 2 - ITEM_WIDTH / 2,
    alignSelf: 'center',
  },
  weekContainer: {
    width: ITEM_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
  selectedWeekContainer: {
    backgroundColor: Pallete.Eggplant,
    borderRadius: 30,
    width: ITEM_WIDTH / 1.1,
    height: ITEM_WIDTH / 2.3,
  },
  weekText: {
    fontFamily: fonts.PrimaryJakartaBold,
    paddingLeft: horizontalScale(10),
  },
  selectedWeekText: {
    color: 'white',
  },
  touchable: {
    width: '100%',
    height: '100%',
  },
});

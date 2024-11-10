import React, {useRef, useState, useEffect, useCallback, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import {commonStyles} from '../styles/pogStyles';
import {fonts, Pallete} from '../../../theme/enum';
import {
  SCREEN_HEIGHT_WINDOW,
  verticalScale,
} from '../../../helpers/layoutHelper';
import {stringLiterals} from '../constants';
import s from '../../../styles/GlobalStyles';
import usePogStore from '../../freemium/store/usePogDataStore';

const {width} = Dimensions.get('window');
const ITEM_WIDTH = width / 4.35;

type WeekNavigatorProps = {
  selectedWeekNumber: (week: number) => void;
  pog_week: number;
};

const WeekNavigator = ({selectedWeekNumber, pog_week}: WeekNavigatorProps) => {
  if (pog_week <= 5) {
    pog_week = 5;
  }
  const weeks = useMemo(() => Array.from({length: 36}, (_, i) => i + 5), []);
  const [selectedWeek, setSelectedWeek] = useState(pog_week);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
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
    const xOffset = ITEM_WIDTH * index;
    scrollViewRef.current?.scrollTo({x: xOffset, animated: true});
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
    (week: number, index: number) => {
      const inputRange = [
        (index - 2) * ITEM_WIDTH,
        (index - 1) * ITEM_WIDTH,
        index * ITEM_WIDTH,
        (index + 1) * ITEM_WIDTH,
        (index + 2) * ITEM_WIDTH,
      ];

      const opacity = scrollX.interpolate({
        inputRange,
        outputRange: [0.3, 0.6, 1, 0.6, 0.3],
        extrapolate: 'clamp',
      });

      const scaleHeight = scrollX.interpolate({
        inputRange,
        outputRange: [0.8, 0.9, 1, 0.9, 0.8],
        extrapolate: 'clamp',
      });

      const isCenter = pog_week === week;

      return (
        <Animated.View
          key={index}
          style={[
            styles.weekContainer,
            styles.shadow,
            {opacity, transform: [{scale: scaleHeight}]},
            isCenter && styles.selectedWeekContainer,
            s.positionRelative,
          ]}>
          <TouchableOpacity
            hitSlop={{top: 50, bottom: 50, left: 20, right: 20}}
            style={styles.touchable}
            onPress={() => handleWeekSelect(week)}>
            <Text
              style={[styles.weekText, isCenter && styles.selectedWeekText]}>
              {isCenter ? stringLiterals.WEEK : ''} {week}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      );
    },
    [scrollX, handleWeekSelect, pog_week],
  );

  return (
    <View style={styles.container}>
      <Animated.View style={commonStyles.flexRow}>
        <ScrollView
          horizontal
          ref={scrollViewRef}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}
          scrollEventThrottle={16}
          snapToAlignment="start"
          decelerationRate="fast"
          snapToInterval={ITEM_WIDTH}>
          {weeks.map(renderWeek)}
        </ScrollView>
        {/* {pog_week - currentWeek !== 0 && (
          <Text
            style={{
              color: Pallete.black,
              fontSize: 13,
              position: 'absolute',
              top: verticalScale(32),
              zIndex: 10000,
              left: '40%',
              fontFamily: fonts.PrimaryJakartaBold,
            }}>
            {pog_week - currentWeek} week ahead
          </Text>
        )} */}
      </Animated.View>
    </View>
  );
};

export default WeekNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: verticalScale(108),
    zIndex: 10,
    height: 40,
  },
  scrollViewContent: {
    alignItems: 'flex-start',
    paddingHorizontal: width / 2 - ITEM_WIDTH / 2,
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
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  weekText: {
    fontSize: 15,
    color: Pallete.Eggplant,
    fontFamily: fonts.PrimaryJakartaBold,
  },
  selectedWeekText: {
    color: 'white',
  },
  shadow: {
    shadowOpacity: 0.5,
    shadowRadius: 4,
    shadowOffset: {
      width: 3,
      height: 2,
    },
    shadowColor: '#888',
  },
  touchable: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
  },
});

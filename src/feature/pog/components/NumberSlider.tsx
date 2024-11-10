import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Animated, Dimensions, FlatList, StyleSheet, View} from 'react-native';

type Props = {
  defaultWeek?: number;
  weekUpdate: (week: number) => void;
};

const NumberSlider: React.FC<Props> = ({defaultWeek, weekUpdate}) => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList<number>>(null);
  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 20}).current;
  const SCREEN_WIDTH = useMemo(() => Dimensions.get('window').width, []);

  const weeks = useMemo(() => Array.from({length: 36}, (_, i) => i + 5), []);

  useEffect(() => {
    if (
      flatListRef.current &&
      defaultWeek !== undefined &&
      defaultWeek >= 5 &&
      defaultWeek <= 40
    ) {
      flatListRef.current.scrollToIndex({
        index: defaultWeek - 5,
        animated: true,
      });
      setCurrentIndex(defaultWeek);
    } else if (defaultWeek === undefined) {
      setCurrentIndex(5); // Default to the first week if undefined
    }
  }, [defaultWeek]);

  const getItemLayout = useCallback(
    (_, index) => ({
      length: SCREEN_WIDTH,
      offset: SCREEN_WIDTH * index,
      index,
    }),
    [SCREEN_WIDTH],
  );

  const debounce = useCallback((func: Function, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }, []);

  const debouncedWeekUpdate = useMemo(
    () => debounce(weekUpdate, 180),
    [weekUpdate, debounce],
  );

  const onViewableItemsChanged = useRef(({viewableItems}) => {
    if (viewableItems && viewableItems.length > 0) {
      const index = viewableItems[0].index || 0;
      if (currentIndex !== index + 5) {
        setCurrentIndex(index + 5);
        debouncedWeekUpdate(index + 5);
      }
    }
  }).current;

  const renderItem = useCallback(() => {
    return <View style={styles.slide} />;
  }, []);

  return (
    <FlatList
      data={weeks}
      horizontal
      style={{flex: 1}}
      initialScrollIndex={defaultWeek !== undefined ? defaultWeek - 5 : 0}
      showsHorizontalScrollIndicator={false}
      bounces={true}
      pagingEnabled
      maxToRenderPerBatch={5}
      viewabilityConfig={viewConfig}
      onViewableItemsChanged={onViewableItemsChanged}
      scrollEventThrottle={16}
      keyExtractor={item => item.toString()}
      ref={flatListRef}
      onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
        useNativeDriver: false,
      })}
      getItemLayout={getItemLayout}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  slide: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width / 1.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NumberSlider;

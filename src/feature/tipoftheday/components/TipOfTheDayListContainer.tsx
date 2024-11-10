import React from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

import {SCREEN_WIDTH_WINDOW} from '../../../helpers/layoutHelper';
import {TipOfTheDayItem} from '../../../constants/types';

import TipOfTheCard from './TipOfTheCard';
import PaginatorComponent from '../../dashboard/components/PaginatorComponent';

type TipOfTheDayListContainerProps = {
  handleCard: () => void;
  tipOfTheDayContent: TipOfTheDayItem[];
};

const TipOfTheDayListContainer = ({
  handleCard,
  tipOfTheDayContent,
}: TipOfTheDayListContainerProps) => {
  let isTipPresent = tipOfTheDayContent.length !== 0;
  const scrollX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: e => {
      scrollX.value = e.contentOffset.x;
    },
  });
  return (
    <>
      {tipOfTheDayContent.length !== 0 ? (
        <>
          <View style={styles.container}>
            <Animated.FlatList
              data={tipOfTheDayContent}
              horizontal
              onScroll={scrollHandler}
              scrollEventThrottle={32}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              style={styles.flex}
              contentContainerStyle={styles.spacing}
              renderItem={({item}: {item: TipOfTheDayItem}) => {
                return <TipOfTheCard {...item} />;
              }}
            />
          </View>
          {isTipPresent && (
            <PaginatorComponent data={tipOfTheDayContent} scrollX={scrollX} />
          )}
        </>
      ) : null}
    </>
  );
};

export default TipOfTheDayListContainer;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  spacing: {
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  container: {
    height: SCREEN_WIDTH_WINDOW / 3.2,
  },
});

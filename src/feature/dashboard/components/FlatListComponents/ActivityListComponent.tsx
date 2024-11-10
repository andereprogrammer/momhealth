import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ViewToken,
  useWindowDimensions,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SlideProps} from '../../../onboarding/constants/types';
import UpcomingSessionCardComponent, {
  CARD_SIZE,
} from './UpcomingSessionCardComponent';
import {cards} from '../../../../constants/dummyList';
import {
  AssignedActivity,
  CardsPropsSession,
  SessionObject,
} from '../../../../constants/types';
import theme from '../../../../theme/Theme';
import {horizontalScale, verticalScale} from '../../../../helpers/layoutHelper';
import {getAllBookedSessions} from '../../../../api/sessionBooking';
import {extractSessionInfo} from '../../../session/helpers/sessionObjectDestructuring';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import ActivityCardComponent from './ActivityCardComponent';
import it from 'date-fns/esm/locale/it/index.js';
import PaginatorComponent from '../PaginatorComponent';

// import { Container } from './styles';
type SessionList = {
  sessionList: AssignedActivity[];
  showCta?: boolean;
};

const ActivityListComponent: React.FC<SessionList> = props => {
  const onboardingRef = useRef(null);
  const {width} = useWindowDimensions();
  const viewableItemsShared = useSharedValue<ViewToken[]>([]);
  const scrollX = useSharedValue(0);
  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 100}).current;
  useEffect(() => {}, []);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: e => {
      scrollX.value = e.contentOffset.x;
    },
  });
  let listItem = [{key: ''}, ...props.sessionList, {key: ''}];

  return (
    <View style={styles.mainView}>
      <Animated.FlatList
        data={listItem}
        horizontal
        centerContent
        style={styles.flatList}
        contentContainerStyle={styles.contentView}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        pagingEnabled
        snapToInterval={CARD_SIZE}
        viewabilityConfig={viewConfig}
        scrollEventThrottle={16}
        decelerationRate={Platform.OS === 'ios' ? 0.0 : 0.9}
        keyExtractor={item => item.id}
        onScroll={scrollHandler}
        ref={onboardingRef}
        renderItem={({
          item,
          index,
        }: {
          item: AssignedActivity;
          index: number;
        }) => {
          if (item.id === undefined) {
            return (
              <View
                key={index}
                style={{
                  width: (width - CARD_SIZE) / 2,
                }}></View>
            );
          } else {
            return (
              <ActivityCardComponent
                key={index}
                {...item}
                itemsViewed={viewableItemsShared}
                isAnimated={false}
                scrollX={scrollX}
                index={index}
              />
            );
          }
        }}
      />
      {props.sessionList !== undefined && props.sessionList.length > 1 && (
        <PaginatorComponent data={props.sessionList} scrollX={scrollX} />
      )}
    </View>
  );
};

export default ActivityListComponent;
export const styles = StyleSheet.create({
  mainView: {
    flex: 2,
  },
  flatList: {
    flex: 1,
  },
  contentView: {
    paddingVertical: verticalScale(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

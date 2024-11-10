import React, {useEffect, useRef} from 'react';
import {
  Platform,
  StyleSheet,
  View,
  ViewToken,
  useWindowDimensions,
} from 'react-native';
import UpcomingSessionCardComponent, {
  CARD_SIZE,
} from './UpcomingSessionCardComponent';
import {SessionObject} from '../../../../constants/types';
import {verticalScale} from '../../../../helpers/layoutHelper';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import PaginatorDotComponent from '../PaginatorDotComponent';
import PaginatorComponent from '../PaginatorComponent';
import {listItem} from '../../../../components/MainContainer/SyptomsListComponent/types';
import SpacerComponent from './SpacerComponent';

type SessionList = {
  sessionList: SessionObject[];
  showCta: boolean;
};

const UpcomingSessionListComponent: React.FC<SessionList> = props => {
  const onboardingRef = useRef(null);
  const {width} = useWindowDimensions();

  const viewableItemsShared = useSharedValue<ViewToken[]>([]);
  const scrollX = useSharedValue(0);
  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 20}).current;
  useEffect(() => {}, []);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: e => {
      scrollX.value = e.contentOffset.x;
    },
  });
  let listItem = [
    {_id: 'spacing_start_card'},
    ...props.sessionList,
    {_id: 'spacing_end_card'},
  ];

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
        initialNumToRender={2}
        viewabilityConfig={viewConfig}
        getItemLayout={(data, index) => ({
          length: CARD_SIZE,
          offset: CARD_SIZE * index,
          index,
        })}
        disableIntervalMomentum={true}
        maxToRenderPerBatch={3}
        scrollEventThrottle={32}
        snapToInterval={CARD_SIZE}
        onScroll={scrollHandler}
        keyExtractor={item => item._id}
        ref={onboardingRef}
        decelerationRate={Platform.OS === 'ios' ? 0 : 0.9}
        renderItem={({item, index}: {item: SessionObject; index: number}) => {
          if (item.cancellation_allowed === undefined) {
            return <SpacerComponent key={index} />;
          } else {
            return (
              <UpcomingSessionCardComponent
                {...item}
                showCta={true}
                itemsViewed={viewableItemsShared}
                isAnimated={false}
                key={'Session_' + item._id}
                scrollX={scrollX}
                index={index}
                item={item}
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

export default UpcomingSessionListComponent;

export const styles = StyleSheet.create({
  mainView: {
    flex: 4,
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

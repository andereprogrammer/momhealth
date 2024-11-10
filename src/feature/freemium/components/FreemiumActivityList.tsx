import React, {useEffect, useRef} from 'react';
import {StyleSheet, View, ViewToken} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useSharedValue} from 'react-native-reanimated';
import {AssignedActivity} from '../../../constants/types';
import {verticalScale} from '../../../helpers/layoutHelper';
import FreemiumActivityCard from './FreemiumActivityCard';

type SessionList = {
  sessionList: AssignedActivity[];
  showCta?: boolean;
};

const FreemiumActivityList: React.FC<SessionList> = props => {
  const onboardingRef = useRef(null);
  const viewableItemsShared = useSharedValue<ViewToken[]>([]);
  const scrollX = useSharedValue(0);
  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 100}).current;
  useEffect(() => {}, []);

  return (
    <View style={styles.mainView}>
      <FlatList
        data={props.sessionList}
        horizontal
        style={styles.flatList}
        contentContainerStyle={styles.contentView}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        pagingEnabled
        viewabilityConfig={viewConfig}
        scrollEventThrottle={16}
        keyExtractor={item => item.id}
        ref={onboardingRef}
        renderItem={({
          item,
          index,
        }: {
          item: AssignedActivity;
          index: number;
        }) => {
          return (
            <FreemiumActivityCard
              key={index}
              {...item}
              itemsViewed={viewableItemsShared}
              isAnimated={false}
              scrollX={scrollX}
              index={index}
            />
          );
          //   }
        }}
      />
    </View>
  );
};

export default FreemiumActivityList;
export const styles = StyleSheet.create({
  mainView: {
    flex: 3,
  },
  flatList: {
    flex: 2,
  },
  contentView: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingRight: 20,
    marginVertical: 10,
  },
});

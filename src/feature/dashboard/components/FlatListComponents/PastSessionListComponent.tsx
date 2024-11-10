import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {Text, View, ViewToken, useWindowDimensions} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SlideProps} from '../../../onboarding/constants/types';
import {cards} from '../../../../constants/dummyList';
import {CardsPropsSession, SessionObject} from '../../../../constants/types';
import theme from '../../../../theme/Theme';
import {horizontalScale, verticalScale} from '../../../../helpers/layoutHelper';
import {getAllBookedSessions} from '../../../../api/sessionBooking';
import {extractSessionInfo} from '../../../session/helpers/sessionObjectDestructuring';
import PastSessionCardComponent from './PastSessionCardComponent';
import PaginatorComponent from '../PaginatorComponent';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

// import { Container } from './styles';
type SessionList = {
  sessionList: SessionObject[];
};

const PastSessionListComponent: React.FC<SessionList> = props => {
  const navigation = useNavigation<NavigationProp<any, any>>();
  const [currentIndex, setCurrentIndex] = useState<number | null>();
  const onboardingRef = useRef(null);
  const {width} = useWindowDimensions();
  const viewabilityConfig = {
    waitForInteraction: true,
    viewAreaCoveragePercentThreshold: 95,
    itemVisiblePercentThreshold: 75,
  };
  // const scrollX = useRef(new Animated.Value(20)).current;
  function takeMetoInput() {
    navigation.navigate('InputMobileNumberScreen');
  }
  const viewAbleItemChanged = useRef(
    ({viewableItems, changed}: {viewableItems: ViewToken[]}) => {
      console.log('changes viewable', viewableItems);
      setCurrentIndex(3);
    },
  ).current;
  const scrollX = useSharedValue(0);

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 100}).current;
  useEffect(() => {
    console.log(props.sessionList);
  }, []);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: e => {
      scrollX.value = e.contentOffset.x;
    },
  });
  return (
    <View
      style={{
        flex: 3,
      }}>
      <Animated.FlatList
        data={props.sessionList}
        horizontal
        centerContent
        style={{
          flex: 1,
        }}
        contentContainerStyle={{}}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        pagingEnabled
        viewabilityConfig={viewConfig}
        scrollEventThrottle={16}
        keyExtractor={item => item.unique_key}
        onScroll={scrollHandler}
        onViewableItemsChanged={viewAbleItemChanged}
        ref={onboardingRef}
        renderItem={({item}: {item: SessionObject}) => (
          <PastSessionCardComponent
            key={item._id}
            sessionCarePerson={item.sessionCarePerson}
            sessionCategory={item.sessionCategory}
            sessionCarePersonId={item.sessionCarePersonId}
            sessionName={item.sessionName}
            sessionTime={item.sessionTime}
            sessionType={item.sessionType}
            sessionImage={item.sessionImage}
            sessionStatus={item.sessionStatus}
            _id={item._id}
            unique_key={item.unique_key}
            description={item.description}
            prerequisites={item.prerequisites}
            duration={item.duration}
            status={item.status}
            sessionState={item.sessionState}
            notes={item.notes}
            cancellation_allowed={item.cancellation_allowed}
          />
        )}
      />
      {props.sessionList !== undefined && (
        <View style={{paddingVertical: verticalScale(10)}}>
          <PaginatorComponent data={props.sessionList} scrollX={scrollX} />
        </View>
      )}
    </View>
  );
};

export default PastSessionListComponent;

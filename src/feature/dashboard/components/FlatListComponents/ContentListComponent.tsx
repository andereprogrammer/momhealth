import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {
  Animated,
  Text,
  View,
  ViewToken,
  useWindowDimensions,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SlideProps} from '../../../onboarding/constants/types';
import UpcomingSessionCardComponent from './UpcomingSessionCardComponent';
import {cards} from '../../../../constants/dummyList';
import {CardsPropsSession, SessionObject} from '../../../../constants/types';
import theme from '../../../../theme/Theme';
import {horizontalScale} from '../../../../helpers/layoutHelper';
import {getAllBookedSessions} from '../../../../api/sessionBooking';
import {extractSessionInfo} from '../../../session/helpers/sessionObjectDestructuring';
import ContentCardComponent from './ContentCardComponent';

// import { Container } from './styles';
type SessionList = {
  sessionList: SessionObject[];
};

const ContentListComponent: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any, any>>();
  const [currentIndex, setCurrentIndex] = useState<number | null>();
  const onboardingRef = useRef(null);
  const {width} = useWindowDimensions();
  const scrollX = useRef(new Animated.Value(0)).current;
  function takeMetoInput() {
    navigation.navigate('InputMobileNumberScreen');
  }
  const viewAbleItemChanged = useRef(
    ({viewableItems, changed}: {viewableItems: ViewToken[]}) => {
      console.log(changed);
      setCurrentIndex(viewableItems[0].index);
    },
  ).current;
  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 100}).current;
  return (
    <View
      style={{
        flex: 3,
      }}>
      <FlatList
        data={cards}
        horizontal
        centerContent
        style={{
          paddingHorizontal: horizontalScale(10),
          flex: 1,
        }}
        contentContainerStyle={{
          gap: 10,
          paddingRight: 20,
          height: width - 60,
        }}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        pagingEnabled
        viewabilityConfig={viewConfig}
        scrollEventThrottle={32}
        keyExtractor={item => item.heroText}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        // onViewableItemsChanged={viewAbleItemChanged}
        ref={onboardingRef}
        renderItem={({item}: {item: CardsPropsSession}) => (
          <ContentCardComponent
            heroText={item.heroText}
            secondaryText={item.secondaryText}
            imageValue={item.imageValue}
          />
        )}
      />
    </View>
  );
};

export default ContentListComponent;

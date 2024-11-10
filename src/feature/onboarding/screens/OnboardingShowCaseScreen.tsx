import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
  Text,
  Animated,
  ViewToken,
  View,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';
import HeaderComponent from '../../../components/MainContainer/HeaderComponent/HeaderComponent';
import MainCtaComponent from '../../../components/ButtonComponents/MainCtaComponent/MainCtaComponent';
import {slides} from '../constants/onboardingSlidesData';
import OnboardingComponent from '../../../components/MainContainer/OnboardingComponent';
import {SlideProps} from '../constants/types';
import PaginatorComponent from '../../../components/MainContainer/PaginatorComponent';
import {useNavigation} from '@react-navigation/native';
import {navigationProps} from './types';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SharedValue} from 'react-native-reanimated';
import {isAuthenticated} from '../../../api/useAuth';
import {getPatientBasic} from '../../../api/homeapis';
import {navigationOnLoad} from '../../../components/InputComponent/PressableOTPComponent';
import useDataProvider from '../../../context-store/useDataProvider';
import {Pallete} from '../../../theme/enum';
import {track} from '@amplitude/analytics-react-native';
import {trackEvent} from '../../../helpers/product_analytics';
import {trigger} from 'react-native-haptic-feedback';
import {options} from '../../dashboard/navigation/BottomTabNavigation/HomeTabNavigator';
import {Pen} from '../../../assets';
import HeadingFontComponent from '../../../components/FontComponents/HeadingFontComponent/HeadingFontComponent';
import SecondaryHeadingComponent from '../../../components/FontComponents/SecondaryHeadingComponent/SecondaryHeadingComponent';

// import { Container } from './styles';
type Slides = {
  [key: string]: SlideProps;
};
const {width} = Dimensions.get('screen');
const bgs = ['#2E0D47', '#5C198D', Pallete.Eggplant, '#FFD6F6'];
const Backdrop = ({scrollX}: {scrollX: Animated.Value}) => {
  const bgsV = scrollX.interpolate({
    inputRange: bgs.map((_, i) => i * width),
    outputRange: bgs,
  });
  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,

        {
          backgroundColor: bgsV,
          height: '30%',
          top: width <= 375 ? 60 : 100,
          width: width + 200,
          transform: [
            {
              rotate: '170deg',
            },
            {
              translateX: 40,
            },
          ],
        },
      ]}
    />
  );
};
const OnboardingShowCaseScreen: React.FC = () => {
  //   const OnboardingScreenView = styled.View``;
  const navigation = useNavigation<navigationProps>();
  const {setIsLogged, setPatientBasicDetails, setFreemium} = useDataProvider();
  const [currentIndex, setCurrentIndex] = useState<number | null>();
  const checkUserState = async () => {
    isAuthenticated().then(value => {
      if (value) {
        getPatientBasic().then(res => {
          let status = res.data.status;
          let name = res.data.name;
          console.log('basic', res.data);
          setPatientBasicDetails(res.data);
          navigationOnLoad(status, setIsLogged, navigation, setFreemium);
        });
      }
    });
  };
  useLayoutEffect(() => {
    checkUserState().then(() => {
      console.log('Got User state');
    });
  }, []);
  const onboardingRef = useRef<FlatList>();
  const scrollX = useRef(new Animated.Value(0)).current;
  function takeMetoInput() {
    trigger('impactLight', options);
    trackEvent('onboard', 'getstarted', 'clicked');
    navigation.navigate('InputMobileNumberScreen');
  }
  const viewAbleItemChanged = useRef(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      setCurrentIndex(viewableItems[0].index);
    },
  ).current;
  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 20}).current;
  const insets = useSafeAreaInsets();
  useEffect(() => {
    setInterval(() => {
      increment();
    }, 1000);
  }, []);
  const increment = () => {
    if (currentIndex !== slides.length) {
      setCurrentIndex(current => current + 1);
    } else {
      setCurrentIndex(0);
    }
  };
  useEffect(() => {
    onboardingRef?.current?.scrollToIndex({
      index: currentIndex,
      animated: true,
    });
  }, [currentIndex]);

  return (
    <View
      style={{
        backgroundColor: '#fff',
        flex: 1,
        paddingTop: insets.top,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        paddingBottom: insets.bottom,
        alignItems: 'center',
        marginBottom: verticalScale(5),
      }}>
      <Backdrop scrollX={scrollX} />

      <View
        style={{
          flex: 0.75,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: '5%',
          position: 'relative',
        }}>
        <HeaderComponent />
        <View style={{flex: 1}}>
          <Animated.FlatList
            data={slides}
            horizontal
            centerContent
            style={{flex: 1}}
            showsHorizontalScrollIndicator={false}
            bounces={true}
            pagingEnabled
            viewabilityConfig={viewConfig}
            scrollEventThrottle={42}
            keyExtractor={item => item.heroText}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: false},
            )}
            ref={onboardingRef}
            renderItem={({item, index}: {item: SlideProps; index: number}) => {
              return (
                <OnboardingComponent
                  heroText={item.heroText}
                  secondaryText={item.secondaryText}
                  imageValue={item.imageValue}
                  animationValue={item.animationValue}
                  scrollX={scrollX}
                  index={index}
                  key={index}
                />
              );
            }}
          />
        </View>

        <PaginatorComponent slides={slides} scrollX={scrollX} />
      </View>
    </View>
  );
};

export default OnboardingShowCaseScreen;

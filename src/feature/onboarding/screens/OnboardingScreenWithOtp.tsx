import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
  Animated,
  View,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Text,
  Keyboard,
  ImageBackground,
  FlatList,
} from 'react-native';
import HeaderComponent from '../../../components/MainContainer/HeaderComponent/HeaderComponent';
import {slides} from '../constants/onboardingSlidesData';
import OnboardingComponent from '../../../components/MainContainer/OnboardingComponent';
import {SlideProps} from '../constants/types';
import PaginatorComponent from '../../../components/MainContainer/PaginatorComponent';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  horizontalScale,
  SCREEN_WIDTH_WINDOW,
  verticalScale,
} from '../../../helpers/layoutHelper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {isAuthenticated} from '../../../api/useAuth';
import {getPatientBasic} from '../../../api/homeapis';
import {navigationOnLoad} from '../../../components/InputComponent/PressableOTPComponent';
import useDataProvider from '../../../context-store/useDataProvider';
import {Pallete} from '../../../theme/enum';
import {trackEvent} from '../../../helpers/product_analytics';
import {trigger} from 'react-native-haptic-feedback';
import {options} from '../../dashboard/navigation/BottomTabNavigation/HomeTabNavigator';
import MainCtaComponent from '../../../components/ButtonComponents/MainCtaComponent/MainCtaComponent';
import PhoneInput from 'react-native-international-phone-number';
import {register} from '../../../api/userCreationHelper';
import {ErrorMappings} from '../../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {STAGES} from '../constants';

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
          minHeight: SCREEN_WIDTH_WINDOW / 1.4,
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
const OnboardingScreenWithOtp: React.FC = () => {
  let [inputs, setInputs] = useState({
    loginMobileNumber: '',
  });
  const navigation = useNavigation();
  const [height, setHeight] = useState(5);
  const [loading, setLoading] = useState(false);
  const {mobile, setMobileNumber, setStatus} = useDataProvider();
  const {setIsLogged, setPatientBasicDetails, setFreemium} = useDataProvider();
  const [currentIndex, setCurrentIndex] = useState<number | null>();
  const [elevationHeight, setElevationHeight] = useState(0);
  const [country, setCountry] = useState<string>();
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [enableVerify, setEnableVerify] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [longPress, setLongPress] = useState(false);
  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 20}).current;
  const [mobileNo, setMobileNo] = useState('');
  const onboardingRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const validateMobileNumber = async () => {
    let valid = true;
    let response;
    console.log('validateMobileNumber', mobileNo);
    if (!mobileNo) {
      valid = false;
      handleError(ErrorMappings.INVALID_MOBILE);
    } else if (!mobileNo.match(/^[0-9]{10}$/)) {
      valid = false;
      handleError(ErrorMappings.INVALID_MOBILE);
    }
    if (valid) {
      const finalMob = country.callingCode + mobileNo;
      handleOnChange(finalMob, 'loginMobileNumber');
      setLoadingBtn(true);
      await register(finalMob)
        .then(res => {
          response = res.data;
          console.log('response', res.data);
          setStatus(response?.status);
          setStatus(response?.status);
          setEnableVerify(true);
          setLoadingBtn(false);
          trackEvent('onboard', 'otp', 'init');
          takeMetoInput();
          navigation.navigate('OTPVerificationScreen');
          setMobileNumber(finalMob);
        })
        .catch(e => {
          setLoading(false);
          console.log(e);
        });
    }
  };
  const keyboardDidShowF = (event: any) => {
    setHeight(event.endCoordinates.height);
    setElevationHeight(verticalScale(130));
  };
  const keyboardDidHideF = (event: any) => {
    setHeight(0);
    setElevationHeight(0);
  };

  const handleOnChange = (text: string, input: string) => {
    setInputs(previousState => ({...previousState, [input]: text}));
  };

  const handleError = (errorMessageSelected: string) => {
    setIsError(true);
    setErrorMessage(errorMessageSelected);
  };

  function handleSelectedCountry(countrySelected: string) {
    setCountry(countrySelected);
  }

  function handleInputValue(phoneNumber: string) {
    setMobileNo(phoneNumber.replace(/ /g, ''));
  }

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
  useFocusEffect(
    React.useCallback(() => {
      const interval = setInterval(() => {
        if (
          onboardingRef.current &&
          currentIndex !== null &&
          !isNaN(currentIndex) &&
          currentIndex !== undefined &&
          !longPress
        ) {
          let nextIndex = currentIndex + 1;
          if (nextIndex >= slides.length) {
            nextIndex = 0;
          }
          onboardingRef.current.scrollToIndex({
            index: nextIndex,
            animated: true,
          });
          setCurrentIndex(nextIndex);
        }
      }, 3000);

      return () => clearInterval(interval);
    }, [currentIndex, longPress]),
  );
  useLayoutEffect(() => {
    checkUserState().then(() => {
      console.log('Got User state');
    });
  }, []);
  useEffect(() => {
    let keyboardDidshow = Keyboard.addListener('keyboardDidShow', e =>
      keyboardDidShowF(e),
    );
    let keyboardDidHide = Keyboard.addListener('keyboardDidHide', e =>
      keyboardDidHideF(e),
    );
    setCurrentIndex(0);
  }, []);

  function takeMetoInput() {
    trigger('impactLight', options);
    trackEvent('onboard', 'getstarted', 'clicked');
    navigation.navigate('InputMobileNumberScreen');
  }

  const insets = useSafeAreaInsets();
  const pressed = () => {
    console.log('object');
    setLongPress(true);
  };
  const pressedOut = () => {
    console.log('object');
    setLongPress(false);
  };
  return (
    <View
      style={[
        {
          paddingTop: insets.top,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          paddingBottom: insets.bottom,
        },
        styles.container,
      ]}>
      <Backdrop scrollX={scrollX} />

      <View style={styles.cardsViewStyle}>
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
                  id={item.id}
                  onLongPress={pressed}
                  onPressedOut={pressedOut}
                />
              );
            }}
          />
        </View>
        <PaginatorComponent slides={slides} scrollX={scrollX} />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'height' : 'position'}
        keyboardVerticalOffset={Platform.OS === 'android' ? 40 : 0}
        style={styles.keyboardViewStyle}>
        <ImageBackground
          blurRadius={90}
          source={require('../../../assets/images/white.png')}
          style={styles.blurBackGroundViewStyle}>
          <Text style={inputStyle.secondaryText}>
            Enter your phone number to get started
          </Text>
          <View style={styles.inputViewStyle}>
            <PhoneInput
              value={mobileNo}
              onChangePhoneNumber={handleInputValue}
              selectedCountry={country}
              defaultCountry="IN"
              onChangeSelectedCountry={handleSelectedCountry}
            />
            <Text style={styles.otpPlaceholderText}>
              {'An OTP will be sent to your phone number'}
            </Text>
            <Text style={styles.otherCountryNote}>
              {country?.cca2 === 'US' &&
                'By clicking on get otp, you are agreeing to receive text messages from Everheal'}
            </Text>
            {isError && <Text style={styles.errorText}>{errorMessage}</Text>}
          </View>
          <View style={styles.btnSpacing}>
            <MainCtaComponent
              onClick={() => validateMobileNumber()}
              active={true}
              loading={loadingBtn}
              style={inputStyle.ctaStyles}>
              Continue
            </MainCtaComponent>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </View>
  );
};

export default OnboardingScreenWithOtp;

const inputStyle = StyleSheet.create({
  ctaStyles: {
    marginBottom: 20,
    alignSelf: 'center',
  },
  viewInput: {padding: 10},
  helperText: {
    textAlign: 'left',
    color: '#000',
  },
  secondaryText: {
    textAlign: 'left',
    paddingVertical: verticalScale(10),
    color: '#000',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
  },
  containerSafeArea: {
    paddingHorizontal: horizontalScale(10),
    position: 'relative',
  },
});
const styles = StyleSheet.create({
  container: {
    backgroundColor: Pallete.backgroundPink,
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  errorText: {
    color: 'red',
    paddingVertical: 8,
    paddingLeft: 10,
  },
  cardsViewStyle: {
    flex: Platform.OS === 'android' ? 0.75 : 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '5%',
    position: 'relative',
  },
  keyboardViewStyle: {
    position: 'absolute',
    bottom: verticalScale(0),
    left: 0,
    right: 0,
    zIndex: 10,
    minHeight: Platform.OS === 'android' ? 200 : 100,
  },
  blurBackGroundViewStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingBottom: 20,
    opacity: 0.95,
    flex: 1,
  },
  inputViewStyle: {
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  otpPlaceholderText: {
    textAlign: 'left',
    fontSize: 12,
    color: '#000',
    paddingVertical: 10,
  },
  otherCountryNote: {
    textAlign: 'left',
    fontSize: 12,
    color: '#000',
  },
  btnSpacing: {
    paddingHorizontal: 12,
    width: '100%',
  },
});

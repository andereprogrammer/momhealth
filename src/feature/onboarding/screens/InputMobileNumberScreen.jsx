import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
} from 'react-native';
import HeadingFontComponent from '../../../components/FontComponents/HeadingFontComponent/HeadingFontComponent';
import SecondaryHeadingComponent from '../../../components/FontComponents/SecondaryHeadingComponent/SecondaryHeadingComponent';
import InputComponent from '../../../components/InputComponent/InputComponent';
import MainCtaComponent from '../../../components/ButtonComponents/MainCtaComponent/MainCtaComponent';
import {useNavigation} from '@react-navigation/native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import theme from '../../../theme/Theme';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import {register} from '../../../api/userCreationHelper';
import {ErrorMappings} from '../../../constants';
import useDataProvider from '../../../context-store/useDataProvider';
import BackHeader, {
  backHeaderStyles,
} from '../../../components/MainContainer/BackHeader';
import PhoneInput from 'react-native-international-phone-number';
import {Pallete, fonts} from '../../../theme/enum';
import {Pen} from '../../../assets';
import PressableOTPComponent from '../../../components/InputComponent/PressableOTPComponent';
import {Appbar} from 'react-native-paper';
import {track} from '@amplitude/analytics-react-native';
import {trackEvent} from '../../../helpers/product_analytics';

const InputMobileNumberScreen = () => {
  const {width} = useWindowDimensions();
  let [inputs, setInputs] = useState({
    loginMobileNumber: '',
  });

  const navigation = useNavigation();
  const [height, setHeight] = useState(5);
  const [loading, setLoading] = useState(false);
  const {mobile, setMobileNumber, setActive, setStatus} = useDataProvider();
  const [elevationHeight, setElevationHeight] = useState(0);
  const [country, setCountry] = useState();
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [enableVerify, setEnableVerify] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);

  const [mobileNo, setMobileNo] = useState('');

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
          setEnableVerify(true);
          setLoadingBtn(false);
          trackEvent('onboard', 'otp', 'init');
          navigation.navigate('OTPVerificationScreen');
          setMobileNumber(finalMob);
          if (response?.status === 'CREATED') {
            // navigation.push('OTPVerificationScreen');
          } else if (response?.status === 'ACTIVE') {
            setActive(true);
            // navigation.push('OTPVerificationScreen');
          }
        })
        .catch(e => {
          setLoading(false);
          console.log(e);
        });
    }
  };
  const keyboardDidShowF = event => {
    setHeight(event.endCoordinates.height);
    setElevationHeight(verticalScale(130));
  };
  const keyboardDidHideF = event => {
    setHeight(0);
    setElevationHeight(0);
  };

  const handleOnChange = (text: string, input: string) => {
    setInputs(previousState => ({...previousState, [input]: text}));
  };

  const handleError = (errorMessage: string | null) => {
    setIsError(true);
    setErrorMessage(errorMessage);
  };

  function handleSelectedCountry(country) {
    setCountry(country);
  }

  function handleInputValue(phoneNumber) {
    setMobileNo(phoneNumber.replace(/ /g, ''));
  }

  useEffect(() => {
    let keyboardDidshow = Keyboard.addListener('keyboardDidShow', e =>
      keyboardDidShowF(e),
    );
    let keyboardDidHide = Keyboard.addListener('keyboardDidHide', e =>
      keyboardDidHideF(e),
    );
  }, []);

  const DissMissKeyboard = ({children}) => {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
      </TouchableWithoutFeedback>
    );
  };

  return (
    <SafeAreaView
      style={[inputStyle.containerSafeArea, theme.textVariants.defaults]}>
      <View style={{flex: 1}}>
        <BackHeader title="" />

        <KeyboardAvoidingView
          // behavior="padding"
          style={{
            paddingHorizontal: verticalScale(10),
            // marginHorizontal: verticalScale(10),
            // marginTop: verticalScale(40),
            // marginBottom: verticalScale(30),
            width: '100%',
            height: Platform.OS === 'android' && !enableVerify ? '48%' : '32%',
          }}>
          <View style={inputStyle.viewInput}>
            <HeadingFontComponent style={inputStyle.secondaryText}>
              Welcome,
            </HeadingFontComponent>
            <SecondaryHeadingComponent style={inputStyle.secondaryText}>
              Enter your phone number to get started
            </SecondaryHeadingComponent>
          </View>

          <View
            style={{
              width: '100%',
              flex: 1,
              paddingLeft: 10,
            }}>
            <PhoneInput
              value={mobileNo}
              onChangePhoneNumber={handleInputValue}
              selectedCountry={country}
              defaultCountry="IN"
              onChangeSelectedCountry={handleSelectedCountry}
            />
            <Text
              style={{
                textAlign: 'left',
                paddingTop: 5,
                fontSize: 12,
                marginTop: 5,
                color: '#000',
              }}>
              {'An OTP will be sent to your phone number'}
            </Text>
            <Text
              style={{
                textAlign: 'left',
                paddingTop: 5,
                fontSize: 12,
                marginTop: 5,
                color: '#000',
              }}>
              {country?.cca2 === 'US' &&
                'By clicking on get otp, you are agreeing to receive text messages from Everheal'}
            </Text>
            {isError && <Text style={styles.errorText}>{errorMessage}</Text>}
          </View>
        </KeyboardAvoidingView>

        <View
          style={{
            alignItems: 'center',
            flex: 1,
          }}>
          <View
            style={{
              width: '95%',
              bottom: Platform.OS === 'android' ? 0 : height,
              position: 'absolute',
            }}>
            <MainCtaComponent
              onClick={() => validateMobileNumber()}
              active={true}
              loading={loadingBtn}
              style={inputStyle.ctaStyles}>
              <Text>Get OTP</Text>
            </MainCtaComponent>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
const inputStyle = StyleSheet.create({
  ctaStyles: {
    bottom: 0,
    marginBottom: 20,
    position: 'absolute',
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
  },
  containerSafeArea: {
    paddingHorizontal: horizontalScale(10),
    position: 'relative',
  },
});

export default InputMobileNumberScreen;

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    paddingVertical: 8,
    paddingLeft: 10,
  },
});

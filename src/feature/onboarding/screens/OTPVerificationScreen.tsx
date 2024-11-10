import React, {useCallback, useEffect, useState} from 'react';
import {
  BackHandler,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {styled} from 'styled-components/native';
import HeadingFontComponent from '../../../components/FontComponents/HeadingFontComponent/HeadingFontComponent';
import SecondaryHeadingComponent from '../../../components/FontComponents/SecondaryHeadingComponent/SecondaryHeadingComponent';
import InputComponent from '../../../components/InputComponent/InputComponent';
import MainCtaComponent from '../../../components/ButtonComponents/MainCtaComponent/MainCtaComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import HeaderComponent from '../../../components/MainContainer/HeaderComponent/HeaderComponent';
import PressableOTPComponent from '../../../components/InputComponent/PressableOTPComponent';
import useDataProvider, {
  DataProvider,
} from '../../../context-store/useDataProvider';
import theme from '../../../theme/Theme';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import {Pen} from '../../../assets';
import BackHeader from '../../../components/MainContainer/BackHeader';

// import { Container } from './styles';

const OTPVerificationScreen: React.FC = ({route}) => {
  const {width} = useWindowDimensions();
  const [inputs, setInputs] = useState({
    loginMobileNumber: '',
  });
  const navigation = useNavigation<NavigationProp<any, any>>();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    loginMobileNumber: '',
  });
  const {mobile, status} = useDataProvider();
  const validateMobileNumber = () => {
    // setLoading(!loading);
    // Keyboard.dismiss();

    let valid = true;

    if (!inputs.loginMobileNumber) {
      valid = false;
      handleError('Please input mobile number', 'loginMobileNumber');
    } else if (!inputs.loginMobileNumber.match(/^[6-9]\d{9}$/)) {
      valid = false;
      handleError('Please enter valid mobile number', 'loginMobileNumber');
    }

    if (valid) {
      //   setMobileNumber(inputs.loginMobileNumber);
      //   register();
    }
  };
  const storeData = async () => {
    try {
      await AsyncStorage.setItem('user', inputs.loginMobileNumber);
    } catch (error) {
      console.log(error);
    }
  };
  const handleOnChange = (text: string, input: string) => {
    setInputs(previousState => ({...previousState, [input]: text}));
  };

  const handleError = (errorMessage: string, input: string) => {
    setErrors(previousState => ({...previousState, [input]: errorMessage}));
  };

  const InputMobileView = styled.View`
    flex: 1;
    background-color: #fff;
    position: relative;
    height: 100%;
  `;
  return (
    <SafeAreaView style={[theme.textVariants.defaults, styles.main]}>
      <BackHeader title="" ConditionalScreen={route} />

      <KeyboardAvoidingView
        behavior="padding"
        style={{
          paddingHorizontal: verticalScale(10),
          width: '100%',
          height: '18%',
        }}>
        <HeadingFontComponent style={{textAlign: 'left', color: '#000'}}>
          Verify OTP
        </HeadingFontComponent>
        <SecondaryHeadingComponent
          style={{textAlign: 'left', color: '#000', paddingVertical: 5}}>
          Enter the 6-digit code sent to you at
        </SecondaryHeadingComponent>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '60%',
            height: '30%',
            justifyContent: 'flex-start',
          }}>
          <HeadingFontComponent
            style={{
              textAlign: 'left',
              fontSize: 14,
              letterSpacing: 1,
              paddingVertical: 2,
              color: '#000',
            }}>
            {mobile}
          </HeadingFontComponent>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('OnboardingScreenWithOtp');
            }}
            style={{
              width: '20%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={Pen}
              style={{width: '40%', height: '80%'}}
              resizeMethod="resize"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <PressableOTPComponent />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  main: {
    paddingHorizontal: horizontalScale(10),
    flex: 1,
  },
});

export default OTPVerificationScreen;

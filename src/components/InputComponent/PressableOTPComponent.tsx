import {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  Pressable,
  Keyboard,
  Text,
  View,
  Image,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import OTPInputComponent from './OTPInputComponent';
import MainCtaComponent from '../ButtonComponents/MainCtaComponent/MainCtaComponent';
import theme from '../../theme/Theme';
import {sendOtp, validateOtp} from '../../api/userCreationHelper';
import useDataProvider from '../../context-store/useDataProvider';
import {horizontalScale, verticalScale} from '../../helpers/layoutHelper';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {Resend} from '../../assets';
import {track} from '@amplitude/analytics-react-native';
import {trackEvent} from '../../helpers/product_analytics';
import {logEvent} from '../../helpers/facebook_events';
import {logAppsFlyerEvent} from '../../helpers/appsFlyer';

export function navigationOnLoad(status, setIsLogged, navigation, setFreemium) {
  console.log(navigation, status);
  if (status) {
    switch (status) {
      case 'ACTIVE':
        setIsLogged(true);
        setFreemium(false);
        navigation.push('HomeTabNavigator');
        break;
      case 'FREEMIUM':
        setIsLogged(true);
        setFreemium(true);
        navigation.navigate('HomeTabNavigator');
        break;
      case 'CREATED':
        navigation.navigate('MenstrualSelectionScreen');
        break;
      case 'PENDING':
        navigation.navigate('MenstrualSelectionScreen');
        break;
      case 'ONBOARDED':
        navigation.navigate('GoalSelectionScreen');
        break;
    }
  }
}

const PressableOTPComponent: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any, any>>();
  const {mobile, setIsLogged, status, setFreemium} = useDataProvider();
  const [otpCode, setOTPCode] = useState('');
  const [isPinReady, setIsPinReady] = useState(false);
  const [loading, setLoading] = useState(false);

  const [timer, setTimer] = useState(30);
  const [otpError, setOtpError] = useState(false);
  const timeOutCallback = useCallback(
    () => setTimer(currTimer => currTimer - 1),
    [],
  );

  useEffect(() => {
    timer > 0 && setTimeout(timeOutCallback, 1000);
  }, [timer, timeOutCallback]);

  const resetTimer = function () {
    sendOtp(mobile);
    setTimer(currTimer => currTimer + 30);
    setOTPCode('');
  };
  const checkOtp = () => {
    setLoading(true);
    validateOtp(mobile, otpCode)
      .then(res => {
        if (res === 200) {
          setLoading(false);
          setOtpError(false);
          trackEvent('onboard', 'otp', 'valid');
          logEvent('app-login');
          logAppsFlyerEvent('af_login', {});
          navigationOnLoad(status, setIsLogged, navigation, setFreemium);
        } else {
          track('onboard_otp_invalid');
          setLoading(false);
          setOtpError(true);
          console.log('invalid otp');
        }
      })
      .catch(e => {
        setLoading(false);
        console.log(e);
      });
  };
  useEffect(() => {
    console.log(otpCode, 'here');
    if (otpCode.length === 6 || isPinReady) {
      checkOtp();
    }
  }, [otpCode, setOTPCode, isPinReady]);

  const maximumCodeLength = 6;
  return (
    <KeyboardAvoidingView
      style={{
        // flex: 1,
        paddingHorizontal: horizontalScale(10),
        marginTop: Platform.OS === 'android' ? verticalScale(50) : 0,
        flexDirection: 'column',
        justifyContent: 'center',
        flexGrow: 1,
      }}>
      <Pressable style={styles.container} onPress={Keyboard.dismiss}>
        <OTPInputComponent
          code={otpCode}
          setCode={setOTPCode}
          maximumLength={maximumCodeLength}
          setIsPinReady={setIsPinReady}
        />
        <View
          style={{
            width: '100%',
            height: Platform.OS === 'android' ? '30%' : '18%',
            marginVertical: 5,
          }}>
          {otpError && (
            <View style={styles.resendMessageContainer}>
              <Text style={styles.otpError}>Incorrect OTP</Text>
            </View>
          )}
          {timer === 0 ? (
            <View style={styles.resendMessageContainer}>
              <Text style={styles.resendMessage}>Didn't receive an OTP?</Text>
              <View style={[styles.resendView]}>
                <Image
                  source={Resend}
                  style={{width: '15%', height: '50%'}}
                  resizeMethod="resize"
                  resizeMode="contain"
                />
                <Text
                  disabled={timer > 0 ? true : false}
                  onPress={resetTimer}
                  style={[
                    styles.resendText,
                    {
                      color: timer > 0 ? theme.colors.inputBg : '#000',
                    },
                  ]}>
                  Resend OTP
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.resendMessageContainer}>
              <Text
                style={[
                  styles.resendMessage,
                  timer === 0 ? styles.hide : styles.show,
                ]}>
                Resend in {`0${0}`}:{timer < 10 ? `0${timer}` : timer}
              </Text>
            </View>
          )}
        </View>
      </Pressable>

      <MainCtaComponent
        onClick={() => checkOtp()}
        active={isPinReady}
        loading={loading}
        style={{
          marginBottom: verticalScale(20),
          backgroundColor: !isPinReady
            ? `${theme.colors.ctadisabled}`
            : `${theme.colors.cardPrimaryBackground}`,
          bottom: verticalScale(30),
          left: horizontalScale(12),
          right: 0,
          position: 'absolute',
        }}>
        Verify
      </MainCtaComponent>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    paddingHorizontal: horizontalScale(6),
  },
  resendMessageContainer: {
    justifyContent: 'flex-start',
    marginRight: 18,
    marginBottom: 20,
    paddingLeft: 10,
  },

  resendMessage: {
    color: '#000',
  },
  otpError: {
    color: '#FF0000',
  },
  resendView: {
    backgroundColor: '#FFF2D1',
    height: 30,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '38%',
    gap: 5,
    marginVertical: 10,
  },
  resendText: {
    fontFamily: 'DMSans-Medium',
  },
  timerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 28,
    color: '#000',
    borderWidth: 1,
    width: '100%',
    height: 40,
  },
  timeCounter: {
    color: '#000',
    marginVertical: 20,
    paddingLeft: 10,
  },
  hide: {
    display: 'none',
  },
  show: {
    display: 'flex',
  },
});

export default PressableOTPComponent;

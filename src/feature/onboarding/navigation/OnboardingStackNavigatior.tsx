import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnboardingShowCaseScreen from '../screens/OnboardingShowCaseScreen';
import OTPVerificationScreen from '../screens/OTPVerificationScreen';
import InputMobileNumberScreen from '../screens/InputMobileNumberScreen';
import RegisterFormScreen from '../screens/RegisterFormScreen';
import PregnantMomByPassScreen from '../screens/PregnantMomByPassScreen';
import ChooseYourPathScreen from '../screens/ChooseYourPathScreen';
import CongratulationsPregnantScreen from '../screens/CongratulationsPregnantScreen';
import MenstrualSelectionScreen from '../screens/MenstrualSelectionScreen';
import SettingUpYourExperienceScreen from '../screens/SettingUpYourExperienceScreen';

import SyptomsSelectionScreen from '../screens/SyptomsSelectionScreen';
import HomeTabNavigator from '../../dashboard/navigation/BottomTabNavigation/HomeTabNavigator';

import useDataProvider from '../../../context-store/useDataProvider';
import {getHomeScreenInfo, getPatientBasic} from '../../../api/homeapis';
import {isAuthenticated, isUserLoggedIn} from '../../../api/useAuth';
import PackagesFlowNavigation from '../../packages/navigation/PackagesFlowNavigation';
import NewMomOnboardingScreen from '../screens/NewMomOnboardingScreen';
import NewMomDeliveryDetailsScreen from '../screens/NewMomDeliveryDetailsScreen';
import NewMomSymptomsSelectionScreen from '../screens/NewMomSymptomsSelectionScreen';
import BootSplash from 'react-native-bootsplash';
import TermsAndConditionsScreen from '../../profile/screens/TermsAndConditionsScreen';
import SessionNotificationNavigation from '../../notifications/sessions/SessionNotificationNavigation';
import NewMomExpectationsScreen from '../screens/NewMomExpectationsSelectionScreen';
import {navigationOnLoad} from '../../../components/InputComponent/PressableOTPComponent';
import {useNavigation} from '@react-navigation/native';
import OnboardingScreenWithOtp from '../screens/OnboardingScreenWithOtp';
import GoalSelectionScreen from '../screens/GoalSelectionScreen';
import PackageOfferListingScreen from '../screens/PackageOfferListingScreen';
import PopUpPackageOfferingScreen from '../screens/PopUpPackageOfferingScreen';
import FreemiumPackageHomeScreen from '../../freemium/features/packages/FreemiumPackageHomeScreen';
import AnimatedScreen from '../screens/AnimatedScreen';
import PackageOfferingScreen from '../screens/PackageOfferingScreen';
import WebinarFlowNavigation from '../../freemium/features/webinar/navigation/WebinarFlowNavigation';

const OnboardingStackNavigatior = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  const {
    setPatientDetails,
    setAuthenticated,
    setPatientBasicDetails,
    setIsLogged,
    setFreemium,
  } = useDataProvider();

  const checkUserState = async () => {
    getPatientBasic().then(res => {
      let status = res.data.status;
      console.log('basic', res.data);
      setPatientBasicDetails(res.data);
      navigationOnLoad(status, setIsLogged, navigation, setFreemium);
    });
  };
  useEffect(() => {
    isAuthenticated().then(value => {
      if (value) {
        getHomeScreenInfo().then(res => {
          setAuthenticated(true);
          setPatientDetails(res.data);
          console.log('Hiding SplashScreen');
          checkUserState();
          BootSplash.hide({fade: true}).then(() =>
            console.log('Hiding splash'),
          );
        });
      } else {
        BootSplash.hide({fade: true});
      }
    });
  }, []);

  return (
    <Stack.Navigator screenOptions={{gestureEnabled: false}}>
      <Stack.Screen
        name="OnboardingScreenWithOtp"
        component={OnboardingScreenWithOtp}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PackagesFlowNavigation"
        component={PackagesFlowNavigation}
        options={{
          headerShown: false,
          headerTitle: 'Packages',
          title: '',
          headerBackButtonMenuEnabled: false,
        }}
      />
      {/* <Stack.Screen
        name="InputMobileNumberScreen"
        component={InputMobileNumberScreen}
        options={{
          headerShown: false,
        }}
      /> */}
      <Stack.Screen
        name="OTPVerificationScreen"
        component={OTPVerificationScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="AnimatedScreen"
        component={AnimatedScreen}
        options={{
          headerShown: false,
          headerBackTitle: '',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        component={TermsAndConditionsScreen}
        name="Terms"
        options={{
          headerTitle: 'Terms & Conditions',
        }}
      />
      <Stack.Screen
        name="PregnantMomByPassScreen"
        component={PregnantMomByPassScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChooseYourPathScreen"
        component={ChooseYourPathScreen}
        options={{
          headerShown: false,
          headerBackTitle: '',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="CongratulationsPregnantScreen"
        component={CongratulationsPregnantScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MenstrualSelectionScreen"
        component={MenstrualSelectionScreen}
        options={{
          headerShown: false,
          headerBackTitle: '',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="NewMomOnboardingScreen"
        component={NewMomOnboardingScreen}
        options={{
          headerShown: false,
          headerBackTitle: '',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="NewMomDeliveryDetailsScreen"
        component={NewMomDeliveryDetailsScreen}
        options={{
          headerShown: false,
          headerBackTitle: '',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="NewMomSymptomsSelectionScreen"
        component={NewMomSymptomsSelectionScreen}
        options={{
          headerShown: false,
          headerBackTitle: '',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="NewMomExpectationsScreen"
        component={NewMomExpectationsScreen}
        options={{
          headerShown: false,
          headerBackTitle: '',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="GoalSelectionScreen"
        component={GoalSelectionScreen}
        options={{
          headerShown: false,
          headerBackTitle: '',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="PackageOfferListingScreen"
        component={PackageOfferListingScreen}
        options={{
          headerShown: false,
          headerBackTitle: '',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="PackageOfferingScreen"
        component={PackageOfferingScreen}
        options={{
          headerShown: false,
          headerBackTitle: '',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="PopUpPackageOfferingScreen"
        component={PopUpPackageOfferingScreen}
        options={{
          headerShown: false,
          headerBackTitle: '',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="SyptomsSelectionScreen"
        component={SyptomsSelectionScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SettingUpYourExperienceScreen"
        component={SettingUpYourExperienceScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="HomeTabNavigator"
        component={HomeTabNavigator}
        options={{
          headerShown: false,
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="FreemiumPackageHomeScreen"
        component={FreemiumPackageHomeScreen}
        options={{
          headerShown: false,
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="SessionNotificationNavigation"
        component={SessionNotificationNavigation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="WebinarFlowNavigation"
        component={WebinarFlowNavigation}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default OnboardingStackNavigatior;

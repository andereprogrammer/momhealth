import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  getFocusedRouteNameFromRoute,
  useFocusEffect,
} from '@react-navigation/native';
import {verticalScale} from '../../../helpers/layoutHelper';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {updateStatusBar} from '../../dashboard/components/ScreenHooks';
import useDataProvider from '../../../context-store/useDataProvider';
import FreemiumHomeScreen from '../screens/FreemiumHomeScreen';
import MasterclassScreen from '../../masterclass/screens/MasterclassScreen'
import FreemiumSessionHomeScreen from '../features/sessions/FreemiumSessionHomeScreen';
import VideoScreen from '../screens/VideoScreen';
import FreemiumPackageNavigation from '../features/packages/navigation/FreemiumPackageNavigation';
import ActivityContentScreen from '../../activities/screens/ActivityContentScreen';
import VideoActivityScreen from '../../activities/screens/VideoActivityScreen';
import WebinarHomeScreen from '../features/webinar/WebinarHomeScreen';
import GarbhSanskarHomeScreen from '../../garbhsanskar/screens/GarbhSanskarHomeScreen';
import ProfileFlowNavigation from '../../profile/navigation/ProfileFlowNavigation';
import NotificationBayScreen from '../../inappnotifications/screens/NotificationBayScreen';
import PogBabyDetailsScreen from '../../pog/screens/PogBabyDetailsScreen';
import TipOfTheDayScreen from '../../tipoftheday/screens/TipOfTheDayScreen';
import PogFlowNavigation from '../../pog/navigation/PogFlowNavigation';
import PogBioDigitalScreen from '../../pog/screens/PogBioDigitalScreen';
import PogFreemiumAdScreen from '../../pog/screens/PogFreemiumAdScreen';
import PogStoryScreen from '../../pog/screens/PogStoryScreen';
import ContentInsightHomeScreen from '../../content-insights/screens/ContentInsightHomeScreen';
import ContentInsightFlowNavigation from '../../content-insights/navigation/ContentInsightFlowNavigation';
import LockedFeaturesScreen from '../features/packages/screens/LockedFeaturesScreen';
import PopUpPackageOfferingScreen from '../../onboarding/screens/PopUpPackageOfferingScreen';
import PackageSuccessScreen from '../../packages/screens/PackageSuccessScreen';

type Props = {};

const FreemiumFlowNavigation = ({navigation, route}) => {
  const Stack = createNativeStackNavigator();
  const {setStatusBarStyle} = useDataProvider();
  //   const navigation = useNavigation<NavigationProp<any, any>>();
  useFocusEffect(
    React.useCallback(() => {
      const routeName =
        getFocusedRouteNameFromRoute(route) ?? 'FreemiumHomeScreen';
      updateStatusBar(routeName);
      if (
        routeName !== 'FreemiumHomeScreen' &&
        routeName !== 'GarbhSanskarFlowNavigation' &&
        routeName !== 'ContentInsightHome'
      ) {
        navigation.setOptions({tabBarStyle: {display: 'none'}});
      } else {
        navigation.setOptions({
          tabBarStyle: {
            display: 'flex',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            width: '100%',
            backgroundColor: 'rgba(0,0,0,0)',
            marginBottom: verticalScale(8),
          },
        });
      }
    }, [navigation, route]),
  );

  return (
    <Stack.Navigator initialRouteName="FreemiumHomeScreen">
      <Stack.Screen
        name="FreemiumHomeScreen"
        component={FreemiumHomeScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="MasterclassScreen"
        component={MasterclassScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="PopUpPackageOfferingScreen"
        component={PopUpPackageOfferingScreen}
        options={{
          headerShown: false,
          headerBackTitle: '',
          headerBackTitleVisible: false,
          presentation: 'modal',
          gestureDirection: 'vertical',
          gestureEnabled: true,
        }}
      />
      <Stack.Screen
        name="WebinarHomeScreen"
        component={WebinarHomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NotificationBayScreen"
        component={NotificationBayScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PogFlowNavigation"
        component={PogFlowNavigation}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="PogBioDigitalScreen"
        component={PogBioDigitalScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="PogFreemiumAdScreen"
        component={PogFreemiumAdScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="PogStoryScreen"
        component={PogStoryScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="LockedFeaturesScreen"
        component={LockedFeaturesScreen}
        initialParams={{
          headerTitle: 'Chat Sessions',
          contentKey: 'ChatSession',
        }}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PackageSuccessScreen"
        component={PackageSuccessScreen}
        options={{
          headerShown: false,
          headerTitle: 'Packages',
        }}
      />
      <Stack.Screen
        name="TipOfTheDayScreen"
        component={TipOfTheDayScreen}
        options={{
          headerShown: false,
          gestureDirection: 'vertical',
        }}
      />

      <Stack.Screen
        name="ActivityContentScreen"
        component={ActivityContentScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="VideoActivityScreen"
        component={VideoActivityScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="VideoScreen"
        component={VideoScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="GarbhSanskarHomeScreen"
        component={GarbhSanskarHomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ContentInsightHome"
        component={ContentInsightFlowNavigation}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="FreemiumSessionHomeScreen"
        component={FreemiumSessionHomeScreen}
        options={{
          headerShown: false,
          headerTitle: 'Packages',
        }}
      />
      <Stack.Screen
        name="ProfileFlowNavigation"
        component={ProfileFlowNavigation}
        options={{
          headerShown: false,
          headerTitle: 'Profile',
          title: '',
          headerBackButtonMenuEnabled: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default FreemiumFlowNavigation;

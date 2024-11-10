import React from 'react';
import {
  getFocusedRouteNameFromRoute,
  useFocusEffect,
} from '@react-navigation/native';
import {verticalScale} from '../../../helpers/layoutHelper';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {updateStatusBar} from '../../dashboard/components/ScreenHooks';
import useDataProvider from '../../../context-store/useDataProvider';
import ContentInsightHomeScreen from '../screens/ContentInsightHomeScreen';
import VideoScreen from '../../dashboard/screens/VideoScreen';
import FreemiumPackageHomeScreen from '../../freemium/features/packages/FreemiumPackageHomeScreen';
import LockedFeaturesScreen from '../../freemium/features/packages/screens/LockedFeaturesScreen';
import PdfViewScreen from '../screens/PdfViewScreen';
import NotificationBayScreen from '../../inappnotifications/screens/NotificationBayScreen';
import ProfileHomeScreen from '../../profile/screens/ProfileHomeScreen';
import ProfileFlowNavigation from '../../profile/navigation/ProfileFlowNavigation';
import PackageSuccessScreen from '../../packages/screens/PackageSuccessScreen';

type Props = {};

const ContentInsightFlowNavigation = ({navigation, route}) => {
  const Stack = createNativeStackNavigator();
  const {setStatusBarStyle} = useDataProvider();
  //   const navigation = useNavigation<NavigationProp<any, any>>();
  useFocusEffect(
    React.useCallback(() => {
      const routeName =
        getFocusedRouteNameFromRoute(route) ?? 'ContentInsightHomeScreen';
      updateStatusBar(routeName);
      if (
        routeName === 'VideoScreen' ||
        routeName === 'LockedFeaturesScreen' ||
        routeName === 'PackageSuccessScreen'
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
    <Stack.Navigator initialRouteName="ContentInsightHomeScreen">
      <Stack.Screen
        name="ContentInsightHomeScreen"
        component={ContentInsightHomeScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="PdfViewScreen"
        component={PdfViewScreen}
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
        name="VideoScreen"
        component={VideoScreen}
        options={{
          headerShown: false,
          gestureEnabled: true,
        }}
      />

      <Stack.Screen
        name="LockedFeaturesScreen"
        component={LockedFeaturesScreen}
        initialParams={{
          headerTitle: 'Videos by the Care Team',
          contentKey: 'CarePage',
        }}
        options={{
          headerShown: false,
          gestureEnabled: false,
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
        name="ProfileFlowNavigation"
        component={ProfileFlowNavigation}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="NotificationBayScreen"
        component={NotificationBayScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default ContentInsightFlowNavigation;

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  getFocusedRouteNameFromRoute,
  useFocusEffect,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FreemiumSessionDetailsScreen from './FreemiumSessionDetailsScreen';
import useDataProvider from '../../../../context-store/useDataProvider';
import {updateStatusBar} from '../../../dashboard/components/ScreenHooks';
import {verticalScale} from '../../../../helpers/layoutHelper';
import FreemiumSessionHomeScreen from './FreemiumSessionHomeScreen';
import PackageHomeScreen from '../packages/FreemiumPackageHomeScreen';
import LockedFeaturesScreen from '../packages/screens/LockedFeaturesScreen';
import WebinarHomeScreen from '../webinar/WebinarHomeScreen';
import PackageSuccessScreen from '../../../packages/screens/PackageSuccessScreen';

type Props = {};

const FreemiumSessionNavigationScreen = ({navigation, route}) => {
  const Stack = createNativeStackNavigator();
  const {setStatusBarStyle} = useDataProvider();
  //   const navigation = useNavigation<NavigationProp<any, any>>();
  useFocusEffect(
    React.useCallback(() => {
      const routeName =
        getFocusedRouteNameFromRoute(route) ?? 'FreemiumSessionHomeScreen';
      console.log('Current', routeName);
      updateStatusBar(routeName);
      if (
        routeName === 'FreemiumSessionDetailsScreen' ||
        routeName === 'LockedFeaturesScreen' ||
        routeName === 'WebinarHomeScreen' ||
        routeName === 'PackageSuccessScreen'
      ) {
        console.log('object');
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
    <Stack.Navigator initialRouteName="FreemiumSessionHomeScreen">
      <Stack.Screen
        name="FreemiumSessionHomeScreen"
        component={FreemiumSessionHomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FreemiumSessionDetailsScreen"
        component={FreemiumSessionDetailsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LockedFeaturesScreen"
        component={LockedFeaturesScreen}
        initialParams={{
          headerTitle: 'Booking Sessions',
          contentKey: 'SessionBooking',
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
        name="WebinarHomeScreen"
        component={WebinarHomeScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default FreemiumSessionNavigationScreen;

const styles = StyleSheet.create({});

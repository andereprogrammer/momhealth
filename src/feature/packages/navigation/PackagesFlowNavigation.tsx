import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import PackagesHomeScreen from '../screens/PackagesHomeScreen';
import PackageFullDetailScreen from '../screens/PackageFullDetailScreen';
import {
  NavigationProp,
  getFocusedRouteNameFromRoute,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {verticalScale} from '../../../helpers/layoutHelper';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PackageSuccessScreen from '../screens/PackageSuccessScreen';
import {updateStatusBar} from '../../dashboard/components/ScreenHooks';
import useDataProvider from '../../../context-store/useDataProvider';
import PackagesTopNavigation from './PackagesTopNavigation';

type Props = {};

const PackagesFlowNavigation = ({navigation, route}) => {
  const Stack = createNativeStackNavigator();
  const {setStatusBarStyle} = useDataProvider();
  //   const navigation = useNavigation<NavigationProp<any, any>>();
  useFocusEffect(
    React.useCallback(() => {
      const routeName =
        getFocusedRouteNameFromRoute(route) ?? 'PackagesHomeScreen';
      console.log('Current', routeName);
      updateStatusBar(routeName);
      if (routeName === 'PackagesHomeScreen') {
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
    <Stack.Navigator initialRouteName="PackagesTopNavigation">
      <Stack.Screen
        name="PackagesTopNavigation"
        component={PackagesTopNavigation}
        options={{
          headerShown: false,
          headerTitle: 'Packages',
        }}
      />
      <Stack.Screen
        name="PackageFullDetailScreen"
        component={PackageFullDetailScreen}
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
    </Stack.Navigator>
  );
};

export default PackagesFlowNavigation;

const styles = StyleSheet.create({});

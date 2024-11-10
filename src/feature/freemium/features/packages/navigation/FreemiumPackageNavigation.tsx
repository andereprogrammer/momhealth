import {StyleSheet} from 'react-native';
import React from 'react';
import {
  getFocusedRouteNameFromRoute,
  useFocusEffect,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import useDataProvider from '../../../../../context-store/useDataProvider';
import {updateStatusBar} from '../../../../dashboard/components/ScreenHooks';
import {verticalScale} from '../../../../../helpers/layoutHelper';
import FreemiumPackageHomeScreen from '../FreemiumPackageHomeScreen';
import PackageSuccessScreen from '../../../../packages/screens/PackageSuccessScreen';
import VideoScreen from '../../../screens/VideoScreen';
import LockedFeaturesScreen from '../screens/LockedFeaturesScreen';

type Props = {};

const FreemiumPackageNavigation = ({navigation, route}) => {
  const Stack = createNativeStackNavigator();
  const {setStatusBarStyle} = useDataProvider();
  //   const navigation = useNavigation<NavigationProp<any, any>>();
  useFocusEffect(
    React.useCallback(() => {
      const routeName =
        getFocusedRouteNameFromRoute(route) ?? 'FreemiumPackageHomeScreen';
      console.log('Current', routeName);
      updateStatusBar(routeName);
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    }, [navigation, route]),
  );

  return (
    <Stack.Navigator initialRouteName="FreemiumPackageHomeScreen">
      <Stack.Screen
        name="FreemiumPackageHomeScreen"
        component={FreemiumPackageHomeScreen}
        options={{
          headerShown: false,
          headerTitle: 'Packages',
        }}
      />
      <Stack.Screen
        name="LockedFeaturesScreen"
        component={LockedFeaturesScreen}
        options={{
          headerShown: false,
          headerTitle: '',
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
        name="VideoScreen"
        component={VideoScreen}
        options={{
          headerShown: false,
          headerTitle: '',
        }}
      />
    </Stack.Navigator>
  );
};

export default FreemiumPackageNavigation;

const styles = StyleSheet.create({});

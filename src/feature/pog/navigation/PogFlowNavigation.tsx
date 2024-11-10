import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import PogBioDigitalScreen from '../screens/PogBioDigitalScreen';
import PogBabyDetailsScreen from '../screens/PogBabyDetailsScreen';
import PogFreemiumAdScreen from '../screens/PogFreemiumAdScreen';
import {
  getFocusedRouteNameFromRoute,
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import useDataProvider from '../../../context-store/useDataProvider';
import {updateStatusBar} from '../../dashboard/components/ScreenHooks';
import {verticalScale} from '../../../helpers/layoutHelper';
import PogFullScreen from '../screens/PogFullScreen';
import VideoScreen from '../../freemium/screens/VideoScreen';
import PogStoryScreen from '../screens/PogStoryScreen';

type Props = {};

const PogFlowNavigation = ({navigation, route}: Props) => {
  const Stack = createNativeStackNavigator();
  const {setStatusBarStyle} = useDataProvider();
  useFocusEffect(
    React.useCallback(() => {
      const routeName =
        getFocusedRouteNameFromRoute(route) ?? 'PackagesHomeScreen';
      console.log('Current', routeName);
      updateStatusBar(routeName);

      navigation.setOptions({tabBarStyle: {display: 'none'}});
    }, [navigation, route]),
  );

  return (
    <Stack.Navigator initialRouteName="PogBabyDetailsScreen">
      <Stack.Screen
        name="PogBabyDetailsScreen"
        component={PogBabyDetailsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PogBioDigitalScreen"
        component={PogBioDigitalScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PogFullScreen"
        component={PogFullScreen}
        options={{
          headerShown: false,
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
        name="PogFreemiumAdScreen"
        component={PogFreemiumAdScreen}
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
    </Stack.Navigator>
  );
};

export default PogFlowNavigation;

const styles = StyleSheet.create({});

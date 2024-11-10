import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  getFocusedRouteNameFromRoute,
  useFocusEffect,
} from '@react-navigation/native';
import {verticalScale} from '../../../helpers/layoutHelper';
import useDataProvider from '../../../context-store/useDataProvider';
import {updateStatusBar} from '../../dashboard/components/ScreenHooks';
import GarbhSanskarHomeScreen from '../screens/GarbhSanskarHomeScreen';
import OmChantingHomeScreen from '../feature/omchanting/screens/OmChantingHomeScreen';
import MantraChantingHomeScreen from '../feature/mantrachanting/screens/MantraChantingHomeScreen';
import GarbhSanskarStory from '../feature/stories/screens/GarbhSanskarStory';
import GarbhSanskarVideoGuide from '../feature/videoguides/screens/GarbhSanskarVideoGuide';
import VideoScreen from '../../freemium/screens/VideoScreen';

import AffirmationHomeScreen from '../feature/affirmation/screens/AffirmationHomeScreen';

import BrainActivitiesHomeScreen from '../feature/brain-activities/screens/PuzzlesHomeScreen';
import PuzzleScreen from '../feature/brain-activities/screens/PuzzleScreen';


const Stack = createNativeStackNavigator();

const GarbhSanskarFlowNavigation = ({navigation, route}) => {
  const {setStatusBarStyle} = useDataProvider();
  useFocusEffect(
    React.useCallback(() => {
      const routeName =
        getFocusedRouteNameFromRoute(route) ?? 'GarbhSanskarHomeScreen';
      updateStatusBar(routeName);
      if (routeName !== 'GarbhSanskarHomeScreen') {
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
    <Stack.Navigator initialRouteName="GarbhSanskarHomeScreen">
      <Stack.Screen
        name="GarbhSanskarHomeScreen"
        component={GarbhSanskarHomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="OmChantingHomeScreen"
        component={OmChantingHomeScreen}
        options={{
          headerShown: false,
          gestureDirection: 'vertical',
        }}
      />
      <Stack.Screen
        name="AffirmationHomeScreen"
        component={AffirmationHomeScreen}
        options={{
          headerShown: false,
          gestureDirection: 'vertical',
        }}
      />
      <Stack.Screen
        name="VideoScreen"
        component={VideoScreen}
        options={{
          headerShown: false,
          gestureDirection: 'vertical',
        }}
      />
      <Stack.Screen
        name="MantraChantingHomeScreen"
        component={MantraChantingHomeScreen}
        options={{
          headerShown: false,
          gestureDirection: 'vertical',
        }}
      />
      <Stack.Screen
        name="GarbhSanskarStory"
        component={GarbhSanskarStory}
        options={{
          headerShown: false,
          gestureDirection: 'vertical',
        }}
      />
      <Stack.Screen
        name="GarbhSanskarVideoGuide"
        component={GarbhSanskarVideoGuide}
        options={{
          headerShown: false,
          gestureDirection: 'vertical',
        }}
      />
      <Stack.Screen
        name="BrainActivitiesHomeScreen"
        component={BrainActivitiesHomeScreen}
        options={{
          headerShown: false,
          gestureDirection: 'vertical',
        }}
      />
      <Stack.Screen
        name="PuzzleScreen"
        component={PuzzleScreen}
        options={{
          headerShown: false,
          gestureDirection: 'vertical',
        }}
      />
    </Stack.Navigator>
  );
};

export default GarbhSanskarFlowNavigation;

const styles = StyleSheet.create({});

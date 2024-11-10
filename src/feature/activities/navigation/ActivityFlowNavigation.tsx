import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
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
import ActivityHomeScreen from '../screens/ActivityHomeScreen';
import MustDoHomeScreen from '../screens/MustDoHomeScreen';
import ActivityContentScreen from '../screens/ActivityContentScreen';
import useDataProvider from '../../../context-store/useDataProvider';
import {updateStatusBar} from '../../dashboard/components/ScreenHooks';
import VideoActivityScreen from '../screens/VideoActivityScreen';
import PDFActivityScreen from '../screens/PDFActivityScreen';
import ActivityTopNavigation from './ActivityTopNavigation';
import SessionFullDetailsScreen from '../../session/screens/SessionFullDetailsScreen';
import SessionDetailsScreen from '../../session/screens/SessionDetailsScreen';
import AllSessionScreen from '../../session/screens/AllSessionScreen';
import {Welcome} from '../../videoStreaming/screens/Welcome';
import {Meeting} from '../../videoStreaming/screens/MeetingScreen';
import {store} from '../../videoStreaming/redux';
import SessionNotesViewScreen from '../../session/screens/SessionNotesViewScreen';
import {Provider} from 'react-redux';
import CarePersonDetailsScreen from '../../careteam/screens/CarePersonDetailsScreen';
import HomeScreen from '../../dashboard/screens/HomeScreen';
import DashboardNavigationStack from '../../dashboard/navigation/StackNavigations/DashboardNavigationStack';
import SessionNoteDetailsScreen from '../../chat/components/SessionNoteDetailsScreen';
import CareTeamChat from '../../chat/components/CareTeamChat';
import SessionNotificationNavigationScreen from '../../session/screens/SessionNotificationNavigationScreen';

type Props = {};

const ActivityFlowNavigation = ({navigation, route}) => {
  const Stack = createNativeStackNavigator();
  const {params} = route;
  console.log(params);

  const {setStatusBarStyle} = useDataProvider();

  //   const navigation = useNavigation<NavigationProp<any, any>>();
  useFocusEffect(
    React.useCallback(() => {
      const routeName =
        getFocusedRouteNameFromRoute(route) ?? 'ActivityHomeScreen';
      updateStatusBar(routeName);
      console.log('Current', routeName);
      if (
        routeName === 'ActivityContentScreen' ||
        routeName === 'VideoActivityScreen' ||
        routeName === 'AllSessionScreen' ||
        routeName === 'SessionFullDetailsScreen' ||
        routeName === 'WelcomeScreen' ||
        routeName === 'MeetingScreen' ||
        routeName === 'SessionNoteDetailsScreen' ||
        routeName === 'CarePersonDetailsScreen' ||
        routeName === 'SessionNotificationNavigationScreen' ||
        routeName === 'CareTeamChat'
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

  const FirstComponent = () => {
    return (
      <Provider store={store}>
        <Welcome />
      </Provider>
    );
  };
  const SecondComponent = () => {
    return (
      <Provider store={store}>
        <Meeting />
      </Provider>
    );
  };
  return (
    <Stack.Navigator initialRouteName="ActivityTopNavigation">
      <Stack.Screen
        name="ActivityTopNavigation"
        component={ActivityTopNavigation}
        options={{
          headerShown: false,
          headerBackButtonMenuEnabled: true,
        }}
      />
      <Stack.Screen
        name="AllSessionScreen"
        component={AllSessionScreen}
        options={{
          headerShown: false,
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name="SessionDetailsScreen"
        component={SessionDetailsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CareTeamChat"
        component={CareTeamChat}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SessionFullDetailsScreen"
        component={SessionFullDetailsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SessionNotificationNavigationScreen"
        component={SessionNotificationNavigationScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CarePersonDetailsScreen"
        component={CarePersonDetailsScreen}
        options={{
          headerShown: false,
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name="SessionNotesViewScreen"
        component={SessionNotesViewScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SessionNoteDetailsScreen"
        component={SessionNoteDetailsScreen}
        options={{
          headerShown: false,
          headerTitle: '',
        }}
      />

      <Stack.Screen
        name="WelcomeScreen"
        initialParams={{id: '11332323'}}
        component={FirstComponent}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MeetingScreen"
        component={SecondComponent}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="MustDoHomeScreen"
        component={MustDoHomeScreen}
        options={{
          headerShown: false,
          headerTitle: 'Must Do',
        }}
      />
      <Stack.Screen
        name="ActivityContentScreen"
        component={ActivityContentScreen}
        options={{
          headerShown: false,
          headerTitle: ' ',
          headerBackTitle: '',
        }}
      />
      <Stack.Screen
        name="VideoActivityScreen"
        component={VideoActivityScreen}
        options={{
          headerShown: false,
          headerTitle: ' ',
          headerBackTitle: '',
        }}
      />
      <Stack.Screen
        name="PDFActivityScreen"
        component={PDFActivityScreen}
        options={{
          headerShown: true,
          headerTitle: ' ',
          headerBackTitle: '',
        }}
      />

      {/* <Stack.Screen
        name="ActivityTopNavigation"
        component={ActivityTopNavigation}
        options={{
          headerShown: true,
          headerTitle: ' ',
          headerBackTitle: '',
        }}
      /> */}
    </Stack.Navigator>
  );
};

export default ActivityFlowNavigation;

const styles = StyleSheet.create({});

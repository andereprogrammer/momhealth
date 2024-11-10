import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChatScreenNavigation from '../../chat/Navigation/ChatScreenNavigation';
import SessionHomeScreen from '../screens/SessionHomeScreen';
import AllSessionScreen from '../screens/AllSessionScreen';
import {
  getFocusedRouteNameFromRoute,
  useFocusEffect,
} from '@react-navigation/native';
import {Welcome} from '../../videoStreaming/screens/Welcome';
import {store} from '../../videoStreaming/redux/index';
import {Provider} from 'react-redux';
import {Meeting} from '../../videoStreaming/screens/MeetingScreen';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import SessionDetailsScreen from '../screens/SessionDetailsScreen';
import SessionFullDetailsScreen from '../screens/SessionFullDetailsScreen';
import PerosnalSessionHome from '../screens/PerosnalSessionHome';
import useDataProvider from '../../../context-store/useDataProvider';
import {updateStatusBar} from '../../dashboard/components/ScreenHooks';
import ActivityTopNavigation from '../../activities/navigation/ActivityTopNavigation';
import SessionNotesViewScreen from '../screens/SessionNotesViewScreen';
import CarePersonDetailsScreen from '../../careteam/screens/CarePersonDetailsScreen';
import CareTeamChat from '../../chat/components/CareTeamChat';
import SessionNotificationNavigationScreen from "../screens/SessionNotificationNavigationScreen";
export type RootStackParamList = {
  SessionHomeScreen: undefined;
  WelcomeScreen: {id: string};
  AllSessionScreen: undefined;
  ActivityTopNavigation: undefined;
  MeetingScreen: undefined;
  SessionDetailsScreen: undefined;
  SessionFullDetailsScreen: undefined;
  PersonalSessionHome: undefined;
  SessionNotesViewScreen: undefined;
  CarePersonDetailsScreen: undefined;
  SessionNotificationNavigationScreen: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

const SessionFlowNavigation = ({navigation, route}) => {
  const {setStatusBarStyle} = useDataProvider();
  useFocusEffect(
    React.useCallback(() => {
      console.log(route.name);
      const routeName =
        getFocusedRouteNameFromRoute(route) ?? 'SessionHomeScreen';
      console.log(routeName);
      updateStatusBar(routeName);
      if (routeName !== 'SessionHomeScreen') {
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
    <Stack.Navigator initialRouteName="SessionHomeScreen">
      {/* <Stack.Screen
        name="ActivityTopNavigation"
        component={ActivityTopNavigation}
        options={{
          headerShown: false,
        }}
      /> */}
      <Stack.Screen
        name="SessionHomeScreen"
        component={SessionHomeScreen}
        options={{
          headerShown: false,
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
        name="CareTeamChat"
        component={CareTeamChat}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SessionNotesViewScreenS"
        component={SessionNotesViewScreen}
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
        name="AllSessionScreen"
        component={AllSessionScreen}
        options={{
          headerShown: false,
          headerTitle: '',
        }}
      />
    </Stack.Navigator>
  );
};
export default SessionFlowNavigation;

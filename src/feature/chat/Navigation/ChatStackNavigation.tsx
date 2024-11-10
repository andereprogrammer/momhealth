import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {
  NavigationProp,
  getFocusedRouteNameFromRoute,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {verticalScale} from '../../../helpers/layoutHelper';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {updateStatusBar} from '../../dashboard/components/ScreenHooks';
import useDataProvider from '../../../context-store/useDataProvider';
import ChatScreenNavigation from './ChatScreenNavigation';
import CareTeamChat from '../components/CareTeamChat';
import {ChatSearchScreen} from '../screens/ChatSearchScreen';
import ExpertNotesDetailsScreen from '../components/ExpertNoteDetailsScreen';
import SessionNoteDetailsScreen from '../components/SessionNoteDetailsScreen';
import SessionFullDetailsScreen from '../../session/screens/SessionFullDetailsScreen';
import CarePersonDetailsScreen from '../../careteam/screens/CarePersonDetailsScreen';
import ChatGroupDetailsScreen from '../components/ChatGroupDetailsScreen';
import WebViewScreen from "../../../components/DownloadWebViewComponent/WebViewScreen";

type Props = {};

const ChatStackNavigation = ({navigation, route}) => {
  const Stack = createNativeStackNavigator();
  const {setStatusBarStyle} = useDataProvider();
  //   const navigation = useNavigation<NavigationProp<any, any>>();
  useFocusEffect(
    React.useCallback(() => {
      const routeName =
        getFocusedRouteNameFromRoute(route) ?? 'ChatScreenNavigation';
      console.log('Current', routeName);
      updateStatusBar(routeName);
      if (routeName !== 'ChatScreenNavigation') {
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
    <Stack.Navigator initialRouteName="ChatScreenNavigation">
      <Stack.Screen
        name="ChatScreenNavigation"
        component={ChatScreenNavigation}
        options={{
          headerShown: false,
          headerTitle: 'Packages',
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
        name="ExpertNotesDetailsScreen"
        component={ExpertNotesDetailsScreen}
        options={{
          headerShown: false,
          headerTitle: '',
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
        name="CarePersonDetailsScreen"
        component={CarePersonDetailsScreen}
        options={{
          headerShown: false,
          headerTitle: '',
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
        name="ChatGroupDetailsScreen"
        component={ChatGroupDetailsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="WebViewScreen"
        component={WebViewScreen}
        options={({route}) => ({
          headerShown: true,
          headerTitle: route.params.name,
        })}
      />
      <Stack.Screen
        name="ChatSearchScreen"
        component={ChatSearchScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default ChatStackNavigation;

const styles = StyleSheet.create({});

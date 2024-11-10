import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  getFocusedRouteNameFromRoute,
  useFocusEffect,
} from '@react-navigation/native';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import InsightHomeScreen from '../screens/InsightHomeScreen';
import InsightMainScreen from '../screens/InsightMainScreen';
import CustomHeader from '../components/CustomHeader';
import useDataProvider from '../../../context-store/useDataProvider';
import {updateStatusBar} from '../../dashboard/components/ScreenHooks';

// export type RootStackParamList = {
//   InsightHomeScreen: undefined;
//   InsightMainScreen: undefined;
// };
const Stack = createNativeStackNavigator();

const InsightsFlowNavigation = ({navigation, route}) => {
  const {setStatusBarStyle} = useDataProvider();
  useFocusEffect(
    React.useCallback(() => {
      const routeName =
        getFocusedRouteNameFromRoute(route) ?? 'InsightMainScreen';
      updateStatusBar(routeName);
      console.log('Current', routeName);
      if (routeName !== 'InsightHomeScreen') {
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
    <Stack.Navigator initialRouteName="InsightMainScreen">
      <Stack.Screen
        name="InsightHomeScreen"
        component={InsightHomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="InsightMainScreen"
        component={InsightMainScreen}
        options={{
          headerShown: false,
          headerBackTitle: '',
          headerBackTitleVisible: false,
          header: () => {
            return <CustomHeader title="Mood Tracker" />;
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default InsightsFlowNavigation;

const styles = StyleSheet.create({});

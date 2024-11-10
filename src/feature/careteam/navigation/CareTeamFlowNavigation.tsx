import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  getFocusedRouteNameFromRoute,
  useFocusEffect,
} from '@react-navigation/native';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import CareTeamHomeScreen from '../screens/CareTeamHomeScreen';
import CarePersonDetailsScreen from '../screens/CarePersonDetailsScreen';
import useDataProvider from '../../../context-store/useDataProvider';
import {updateStatusBar} from '../../dashboard/components/ScreenHooks';

// export type RootStackParamList = {
//   InsightHomeScreen: undefined;
//   InsightMainScreen: undefined;
// };
const Stack = createNativeStackNavigator();

const CareTeamFlowNavigation = ({navigation, route}) => {
  const {setStatusBarStyle} = useDataProvider();
  useFocusEffect(
    React.useCallback(() => {
      const routeName =
        getFocusedRouteNameFromRoute(route) ?? 'CareTeamHomeScreen';
      console.log('Current', routeName);
      updateStatusBar(routeName);
      if (routeName !== 'CareTeamHomeScreen') {
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
    <Stack.Navigator initialRouteName="CareTeamHomeScreen">
      <Stack.Screen
        name="CareTeamHomeScreen"
        component={CareTeamHomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CarePersonDetailsScreen"
        component={CarePersonDetailsScreen}
        options={{
          headerTitle: '',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default CareTeamFlowNavigation;

const styles = StyleSheet.create({});

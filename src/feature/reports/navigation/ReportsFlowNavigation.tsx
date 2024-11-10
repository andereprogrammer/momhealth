import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  getFocusedRouteNameFromRoute,
  useFocusEffect,
} from '@react-navigation/native';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import ReportsHomeScreen from '../screens/ReportsHomeScreen';
import ReportsUploadScreen from '../screens/ReportsUploadScreen';
import {updateStatusBar} from '../../dashboard/components/ScreenHooks';
import useDataProvider from "../../../context-store/useDataProvider";

// export type RootStackParamList = {
//   InsightHomeScreen: undefined;
//   InsightMainScreen: undefined;
// };
const Stack = createNativeStackNavigator();

const ReportsFlowNavigation = ({navigation, route}) => {
  const {setStatusBarStyle} = useDataProvider();
  useFocusEffect(
    React.useCallback(() => {
      const routeName =
        getFocusedRouteNameFromRoute(route) ?? 'ReportsUploadScreen';
      console.log('Current', routeName);
      updateStatusBar(routeName);
      if (
        routeName === 'ReportsUploadScreen' ||
        routeName === 'ReportsFlowNavigation'
      ) {
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
    <Stack.Navigator initialRouteName="ReportsHomeScreen">
      <Stack.Screen
        name="ReportsHomeScreen"
        component={ReportsHomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ReportsUploadScreen"
        component={ReportsUploadScreen}
        options={{
          headerShown: true,
          headerTitle: 'Add Reports',
        }}
      />
      {/* <Stack.Screen
        name="PrivacyPolicyScreen"
        component={PrivacyPolicyScreen}
        options={{
          headerShown: true,
          headerTitle: 'Privacy Policy',
        }}
      /> */}
    </Stack.Navigator>
  );
};

export default ReportsFlowNavigation;

const styles = StyleSheet.create({});

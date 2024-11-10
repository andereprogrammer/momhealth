import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  getFocusedRouteNameFromRoute,
  useFocusEffect,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import useDataProvider from '../../../../../context-store/useDataProvider';
import {updateStatusBar} from '../../../../dashboard/components/ScreenHooks';
import {verticalScale} from '../../../../../helpers/layoutHelper';
import WebinarHomeScreen from '../WebinarHomeScreen';

type Props = {};

const WebinarFlowNavigation = ({navigation, route}) => {
  const Stack = createNativeStackNavigator();
  const {setStatusBarStyle} = useDataProvider();
  //   const navigation = useNavigation<NavigationProp<any, any>>();
  useFocusEffect(
    React.useCallback(() => {
      const routeName =
        getFocusedRouteNameFromRoute(route) ?? 'WebinarHomeScreen';
      console.log('Current', routeName);
      updateStatusBar(routeName);
      if (routeName === 'WebinarHomeScreen') {
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
    <Stack.Navigator initialRouteName="WebinarHomeScreen">
      <Stack.Screen
        name="WebinarHomeScreen"
        component={WebinarHomeScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default WebinarFlowNavigation;

const styles = StyleSheet.create({});

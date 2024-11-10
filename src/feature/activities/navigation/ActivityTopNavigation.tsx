import {StyleSheet, Platform} from 'react-native';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import useDataProvider from '../../../context-store/useDataProvider';
import {
  getFocusedRouteNameFromRoute,
  useFocusEffect,
} from '@react-navigation/native';
import {updateStatusBar} from '../../dashboard/components/ScreenHooks';
import {designPalette} from '../../../theme/Theme';
import ActivityHomeScreen from '../screens/ActivityHomeScreen';
import BackHeader from '../../../components/MainContainer/BackHeader';
import SessionHomeScreen from '../../session/screens/SessionHomeScreen';

export type RootStackParamList = {
  SessionHomeScreen: {value: string};
  ActivityNavigation: {value: string};
};

const Tab = createMaterialTopTabNavigator<RootStackParamList>();

const ActivityTopNavigation = ({navigation, route}) => {
  // React.useEffect(() => {
  //   const unsubscribe = navigation.addListener('tabPress', e => {
  //     // Prevent default behavior
  //     e.preventDefault();

  //     // Do something manually
  //     // ...
  //   });

  //   return unsubscribe;
  // }, [navigation]);
  console.log('The navigation happened not sure why');
  // useFocusEffect(
  //   React.useCallback(() => {
  //     const routeName =
  //       getFocusedRouteNameFromRoute(route) ?? 'ActivityNavigation';

  //     updateStatusBar(routeName);
  //   }, [navigation]),
  // );

  return (
    <View
      style={[
        {flex: 1, backgroundColor: '#fff'},
        Platform.OS === 'ios' ? {paddingTop: verticalScale(38)} : {},
      ]}>
      <View style={styles.container}>
        <BackHeader title="Sessions" ConditionalScreen={route} />
        <Tab.Navigator
          style={styles.tabContainer}
          screenOptions={{
            tabBarStyle: styles.tabBarStyle,
            tabBarLabelStyle: styles.tabLabel,
            tabBarIndicatorStyle: styles.tabIndicator,
            swipeEnabled: false,
          }}>
          <Tab.Screen
            initialParams={{value: 'sessionList'}}
            name="SessionHomeScreen"
            component={SessionHomeScreen}
            options={({navigation}) => ({
              title: 'Live',
              tabBarLabel: 'Live',
              activeTintColor: '#21147a',
              inactiveTintColor: '21147a',
              activeBackgroundColor: '#21147a',
              inactiveBackgroundColor: '#21147a',
              swipeEnabled: false,
              style: {
                backgroundColor: '#FFF2D1',
              },
            })}
          />
          <Tab.Screen
            name="ActivityNavigation"
            initialParams={{value: 'not completed'}}
            component={ActivityHomeScreen}
            options={({navigation}) => ({
              title: 'Activities',
              tabBarLabel: 'Activities',
              activeTintColor: '#21147a',
              inactiveTintColor: '21147a',
              activeBackgroundColor: '#21147a',
              inactiveBackgroundColor: '#21147a',
              swipeEnabled: false,
              style: {
                backgroundColor: '#21147a',
              },
            })}
          />
        </Tab.Navigator>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: horizontalScale(20),
  },
  tabContainer: {
    backgroundColor: 'white',
    paddingTop: verticalScale(10),
  },
  tabBarStyle: {
    borderRadius: 20,
    width: '90%',
    overflow: 'hidden',
    alignSelf: 'center',
    backgroundColor: '#FFF2D1',
  },
  tabLabel: {
    fontFamily: 'DMSans-Medium',
    textTransform: 'capitalize',
    fontSize: horizontalScale(16),
  },
  tabIndicator: {
    backgroundColor: designPalette.primary.PinkHopbrush,

    borderRadius: 20,
  },
});

export default ActivityTopNavigation;

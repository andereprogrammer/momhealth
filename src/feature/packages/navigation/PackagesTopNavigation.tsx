import {Platform, StyleSheet} from 'react-native';
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
import PackagesHomeScreen from '../screens/PackagesHomeScreen';

export type RootStackParamList = {
  SessionHomeScreen: {value: string};
  ActivityNavigation: {value: string};
};

const Tab = createMaterialTopTabNavigator<RootStackParamList>();

const PackagesTopNavigation = ({navigation, route}) => {
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', e => {
      // Prevent default behavior
      e.preventDefault();

      // Do something manually
      // ...
    });

    return unsubscribe;
  }, [navigation]);
  useFocusEffect(
    React.useCallback(() => {
      const routeName =
        getFocusedRouteNameFromRoute(route) ?? 'ActivityNavigation';

      updateStatusBar(routeName);
    }, [navigation]),
  );

  const {setStatusBarStyle} = useDataProvider();
  return (
    <View
      style={[
        {flex: 1, backgroundColor: '#fff'},
        Platform.OS === 'ios' ? {paddingTop: verticalScale(38)} : {},
      ]}>
      <View style={styles.container}>
        <BackHeader title="Packages" />

        <Tab.Navigator
          style={styles.tabContainer}
          screenOptions={{
            tabBarStyle: styles.tabBarStyle,
            tabBarLabelStyle: styles.tabLabel,
            tabBarIndicatorStyle: styles.tabIndicator,
            swipeEnabled: false,
          }}>
          <Tab.Screen
            initialParams={{value: 'main'}}
            name="PackagesHomeScreen"
            component={PackagesHomeScreen}
            options={({navigation}) => ({
              title: 'Comprehensive',
              tabBarLabel: 'Comprehensive',
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
            name="PackagesAddonsScreen"
            initialParams={{value: 'addons'}}
            component={PackagesHomeScreen}
            options={({navigation}) => ({
              title: 'Addons',
              tabBarLabel: 'Addons',
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
    marginBottom: horizontalScale(10),
  },
  tabContainer: {
    backgroundColor: 'white',
    paddingTop: verticalScale(2),
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

export default PackagesTopNavigation;

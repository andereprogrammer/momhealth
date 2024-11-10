import {StyleSheet} from 'react-native';
import React from 'react';
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
import MustDoHomeScreen from '../screens/MustDoHomeScreen';

export type RootStackParamList = {
  MustDoHomeScreen: {value: string};
  MustDoPastHomeScreen: {value: string};
};

const Tab = createMaterialTopTabNavigator<RootStackParamList>();
const MustDoTopNavigation = ({navigation, route}) => {
  useFocusEffect(
    React.useCallback(() => {
      const routeName =
        getFocusedRouteNameFromRoute(route) ?? 'MustDoHomeScreen';
      console.log('Current', routeName);
      updateStatusBar(routeName);
    }, [navigation, route]),
  );
  const {setStatusBarStyle} = useDataProvider();
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.container}>
        <Tab.Navigator
          style={styles.tabContainer}
          screenOptions={{
            tabBarStyle: styles.tabBarStyle,
            tabBarLabelStyle: styles.tabLabel,
            tabBarIndicatorStyle: styles.tabIndicator,
          }}>
          <Tab.Screen
            initialParams={{value: 'not completed'}}
            name="MustDoHomeScreen"
            component={MustDoHomeScreen}
            options={({navigation}) => ({
              title: 'Current',
              tabBarLabel: 'Current',
              activeTintColor: '#21147a',
              inactiveTintColor: '21147a',
              activeBackgroundColor: '#21147a',
              inactiveBackgroundColor: '#21147a',
              style: {
                backgroundColor: '#FFF2D1',
              },
            })}
          />
          <Tab.Screen
            name="MustDoPastHomeScreen"
            initialParams={{value: 'completed'}}
            component={MustDoHomeScreen}
            options={({navigation}) => ({
              title: 'Past',
              tabBarLabel: 'Past',
              activeTintColor: '#21147a',
              inactiveTintColor: '21147a',
              activeBackgroundColor: '#21147a',
              inactiveBackgroundColor: '#21147a',
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

export default MustDoTopNavigation;

import {Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  getFocusedRouteNameFromRoute,
  useFocusEffect,
} from '@react-navigation/native';
import {updateStatusBar} from '../../components/ScreenHooks';
import useDataProvider from '../../../../context-store/useDataProvider';
import {horizontalScale, verticalScale} from '../../../../helpers/layoutHelper';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import BackHeader from '../../../../components/MainContainer/BackHeader';
import PogBabyDetailsScreen from '../../../pog/screens/PogBabyDetailsScreen';
import {designPalette} from '../../../../theme/Theme';

type RootStackParamList = {};
const Tab = createMaterialTopTabNavigator<RootStackParamList>();

const POGHomeScreen = ({navigation, route}) => {
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
      console.log('console route here', route);
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
        <BackHeader title="" />

        <Tab.Navigator
          style={styles.tabContainer}
          screenOptions={{
            tabBarStyle: styles.tabBarStyle,
            tabBarLabelStyle: styles.tabLabel,
            tabBarIndicatorStyle: styles.tabIndicator,
            swipeEnabled: false,
          }}>
          <Tab.Screen
            initialParams={{value: route?.params?.babyDetails}}
            name="PogBabyDetailsScreen"
            component={PogBabyDetailsScreen}
            options={({navigation}) => ({
              title: 'Baby',
              tabBarLabel: 'Baby',
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
        </Tab.Navigator>
      </View>
    </View>
  );
};

export default POGHomeScreen;

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

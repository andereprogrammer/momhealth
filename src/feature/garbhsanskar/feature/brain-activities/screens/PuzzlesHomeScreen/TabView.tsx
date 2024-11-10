import React from 'react';
import {StyleSheet, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AllPuzzles from '../../components/AllPuzzles';
import {Pallete} from '../../../../../../theme/enum';
import {PuzzleItem, TabViewProps} from '../../interface';

const Tab = createMaterialTopTabNavigator();

const TabView = ({data, onPuzzlePress, loading}: TabViewProps) => {
  const incompleteData = loading
    ? data
    : data.filter((item: PuzzleItem | null) => item.complete !== true);
  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: styles.tabBarStyle,
          tabBarIndicatorStyle: styles.tabBarIndicatorStyle,
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarActiveTintColor: Pallete.linearGradientDark,
          tabBarInactiveTintColor: 'grey',
          tabBarItemStyle: styles.tabBarItemStyle,
          swipeEnabled: false,
        }}>
        <Tab.Screen
          name="Previous Puzzles"
          component={() => (
            <AllPuzzles
              data={data}
              onPuzzlePress={onPuzzlePress}
              loading={loading}
            />
          )}
          options={{
            tabBarLabel: 'Previous Puzzles',
            tabBarItemStyle: styles.tabBarItem,
          }}
        />
        <Tab.Screen
          name="Incomplete Puzzles"
          component={() => (
            <AllPuzzles
              data={incompleteData}
              showIcon={false}
              onPuzzlePress={onPuzzlePress}
              loading={loading}
            />
          )}
          options={{
            tabBarLabel: 'Incomplete Puzzles',
            tabBarItemStyle: styles.tabBarItem,
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 32,
  },
  scene: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraContainer: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarStyle: {
    backgroundColor: Pallete.whiteBackground,
    zIndex: 0,
  },
  tabBarIndicatorStyle: {backgroundColor: '#6200ee'},
  tabBarLabelStyle: {fontWeight: 'bold'},
  tabBarItemStyle: {width: 'auto'},
  tabBarItem: {
    flex: 1,
  },
});

export default TabView;

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';

interface TabBarItemProps {
  label: string | undefined;
  isFocused: boolean;
}

const TabBarItem: React.FC<TabBarItemProps> = ({label, isFocused}) => {
  return (
    <View style={[styles.tabItem, isFocused && styles.selectedTabItem]}>
      <Text style={isFocused ? styles.selectedText : styles.text}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tabItem: {
    width: horizontalScale(174),
    height: verticalScale(50),
    padding: horizontalScale(10),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d3d3d3',
    borderRadius: horizontalScale(10), // Gray background color
  },
  selectedTabItem: {
    backgroundColor: '#fff', // White background color for selected tab
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    width: '100%',
    color: '#000', // Text color for non-selected tab
  },
  selectedText: {
    color: '#000', // Text color for selected tab
    fontWeight: 'bold',
  },
});

export default TabBarItem;

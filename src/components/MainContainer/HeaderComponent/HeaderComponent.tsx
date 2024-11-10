import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {MainLogo} from '../../../assets/index';
import {horizontalScale} from '../../../helpers/layoutHelper';

const HeaderComponent: React.FC = () => {
  return (
    <View style={headerStyles.header}>
      <Image resizeMode="contain" source={MainLogo} style={{width: 80}} />
    </View>
  );
};
const headerStyles = StyleSheet.create({
  header: {
    width: '90%',
    height: 30,
    alignItems: 'flex-start',
    position: 'absolute',
    justifyContent: 'center',
    top: 0,
    marginLeft: horizontalScale(10),
  },
});

export default HeaderComponent;

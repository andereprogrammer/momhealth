import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {BackBtn, MainLogo} from '../../../assets/index';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import {TouchableOpacity} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import useDataProvider from '../../../context-store/useDataProvider';

const HeaderForPackage: React.FC = () => {
  const {activePackages} = useDataProvider();
  const isHomeEnabled = activePackages?.length !== 0;
  console.log('Active Packages', activePackages);
  const navigation = useNavigation<NavigationProp<any, any>>();
  return (
    <View style={headerStyles.header}>
      {isHomeEnabled ? (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '10%',
            height: '12%',
          }}>
          <Image
            style={{
              width: '30%',
            }}
            resizeMode="contain"
            source={BackBtn}
          />
        </TouchableOpacity>
      ) : (
        // <View style={{width: '100%', paddingHorizontal: horizontalScale(10)}} />
        <></>
      )}
      {/*<Image*/}
      {/*  resizeMode="contain"*/}
      {/*  source={MainLogo}*/}
      {/*  style={{width: '60%', height: '40%'}}*/}
      {/*/>*/}
      <Text
        style={{
          width: '100%',
          height: '60%',
          fontSize: 16,
          paddingHorizontal: 20,
        }}>
        Packages
      </Text>
    </View>
  );
};
const headerStyles = StyleSheet.create({
  header: {
    width: '100%',
    height: 35,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
});

export default HeaderForPackage;

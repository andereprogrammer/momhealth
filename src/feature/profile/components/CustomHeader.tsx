import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Image} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {BackBtn, Calendar, Settings} from '../../../assets';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import BackHeader from '../../../components/MainContainer/BackHeader';

export type navigationProps = {
  navigate: (screen?: string) => void;
  goBack: () => void;
  //   reset: (index: number, routeNames: Routes[]) => void;
};

const CustomHeader = ({title}: {title: string}) => {
  let env = process.env.REACT_APP_ENV;
  if (env === 'dev') {
    title = title;
  }
  const navigation = useNavigation<NavigationProp<any, any>>();
  function takeMeback() {
    navigation.goBack();
  }

  return (
    <BackHeader
      title={title}
      SecondaryComponent={
        <TouchableOpacity
          onPress={() => navigation.navigate('EditProfileScreen')}
          style={styles.settingsBtn}>
          <Image
            style={styles.imageStyle}
            source={Settings}
            resizeMethod="resize"
            resizeMode="contain"
          />
        </TouchableOpacity>
      }
    />
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  leftBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textStyle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 20,
    textAlign: 'left',
    marginBottom: verticalScale(5),
  },
  viewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: horizontalScale(12),
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  buttonStyle: {
    height: 30,
  },
  imageStyle: {
    width: 20,
    height: 20,
  },
  settingsBtn: {
    paddingHorizontal: horizontalScale(10),
  },
});

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import {Image} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {BackBtn, Calendar} from '../../../assets';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import BackHeader from '../../../components/MainContainer/BackHeader';

export type navigationProps = {
  navigate: (screen?: string) => void;
  goBack: () => void;
  //   reset: (index: number, routeNames: Routes[]) => void;
};

const CustomHeader = ({title}: {title: string}) => {
  const navigation = useNavigation<NavigationProp<any, any>>();
  function takeMeback() {
    navigation.goBack();
  }

  return (
    <BackHeader
      title={title}
      bgcolor="transparent"
      SecondaryComponent={<></>}
    />
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: 'PlusJakartaSans-Bold',
    marginLeft: 75,
    fontSize: 20,
    textAlign: 'center',
  },
  buttonStyle: {
    height: 30,
  },
  imageStyle: {
    width: 20,
    height: 20,
  },
});

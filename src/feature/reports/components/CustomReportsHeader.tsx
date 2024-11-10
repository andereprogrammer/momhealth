import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {BackBtn, Plus} from '../../../assets';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import BackHeader from '../../../components/MainContainer/BackHeader';

type Props = {};

const CustomReportsHeader = (props: Props) => {
  const navigation = useNavigation<NavigationProp<any, any>>();
  return (
    <BackHeader
      title="Reports"
      SecondaryComponent={
        <TouchableOpacity
          onPress={() => navigation.navigate('ReportsUploadScreen')}
          style={{
            width: horizontalScale(30),
            flexDirection: 'row',
            marginHorizontal: horizontalScale(5),
          }}>
          <Image
            resizeMethod="resize"
            resizeMode="contain"
            style={{
              width: '100%',
              height: '100%',
            }}
            source={Plus}
          />
        </TouchableOpacity>
      }
    />
  );
};

export default CustomReportsHeader;

const styles = StyleSheet.create({});

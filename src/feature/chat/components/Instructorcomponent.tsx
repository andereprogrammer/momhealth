import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Instructor} from '../../../assets';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import {fonts} from '../../../theme/enum';

type Props = {
  sessionCarePerson: string;
  sessionCategory: string;
};

const Instructorcomponent = (props: Props) => {
  return (
    <View style={stylesInstructor.boxView}>
      <View style={stylesInstructor.imgView}>
        <Image
          source={Instructor}
          resizeMethod="resize"
          resizeMode="contain"
          style={stylesInstructor.imgAspect}
        />
      </View>
      <View style={stylesInstructor.textInfoView}>
        <Text style={stylesInstructor.textSize}>{props.sessionCarePerson}</Text>
        <Text style={stylesInstructor.textSize}>{props.sessionCategory}</Text>
      </View>
    </View>
  );
};

export default Instructorcomponent;

export const stylesInstructor = StyleSheet.create({
  textSize: {
    fontSize: 14,
    fontFamily: fonts.SecondaryDMSansMedium,
  },
  mainView: {
    width: '100%',
    height: 'auto',
    flexDirection: 'column',
    paddingVertical: verticalScale(6),
  },
  mainText: {
    fontFamily: fonts.SecondaryDMSansBold,
    color: '#000',
    marginBottom: verticalScale(5),
  },
  boxView: {
    width: '100%',
    height: verticalScale(55),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: horizontalScale(14),
    alignSelf: 'center',
    marginVertical: verticalScale(5),
    gap: 10,
  },
  imgView: {
    width: '20%',
    height: '100%',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInfoView: {
    width: '70%',
    height: '70%',
    justifyContent: 'space-between',
    gap: 5,
  },
  imgAspect: {width: '100%', height: '90%'},
});

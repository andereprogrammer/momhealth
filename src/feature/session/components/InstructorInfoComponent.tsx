import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Instructor} from '../../../assets';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import {fonts} from '../../../theme/enum';
import {NavigationProp, useNavigation} from '@react-navigation/native';

type Props = {
  sessionCarePerson: string;
  sessionCategory: string;
  sessionCarePersonId: string;
  sessionCarePersonImage: string;
};

const InstructorInfoComponent = (props: Props) => {
  const navigation = useNavigation<NavigationProp<any, any>>();
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() =>
        navigation.navigate('CarePersonDetailsScreen', {
          id: props.sessionCarePersonId,
          name: props.sessionCarePerson,
          category: props.sessionCategory,
        })
      }
      key={'InstructorInfoComponent'}>
      <View style={styles.mainView}>
        <Text style={styles.mainText}>Your instructor</Text>
        <View style={styles.boxView}>
          <View style={styles.imgView}>
            <Image
              source={
                props.sessionCarePersonImage !== null
                  ? {uri: props.sessionCarePersonImage}
                  : Instructor
              }
              resizeMethod="resize"
              resizeMode="contain"
              style={{width: '100%', height: '70%'}}
            />
          </View>
          <View style={styles.textInfoView}>
            <Text style={styles.textSize}>{props.sessionCarePerson}</Text>
            <Text style={styles.textSize}>{props.sessionCategory}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default InstructorInfoComponent;

const styles = StyleSheet.create({
  textSize: {
    fontSize: 14,
    fontFamily: fonts.SecondaryDMSansBold,
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
    paddingHorizontal: horizontalScale(20),
    marginBottom: verticalScale(5),
  },
  boxView: {
    width: '90%',
    height: verticalScale(55),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAF2FF',
    borderRadius: horizontalScale(14),
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#F6E5FF',
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
});

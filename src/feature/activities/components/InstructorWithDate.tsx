import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {stylesInstructor} from '../../chat/components/Instructorcomponent';
import {Instructor} from '../../../assets';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import {stylesSharedText} from '../../chat/components/TextDateInfoComponent';
import {fonts} from '../../../theme/enum';

type Props = {
  activityInstrutor: string;
  role: string;
  date: string;
  image?: string;
};

const InstructorWithDate = (props: Props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: horizontalScale(20),
        marginBottom: verticalScale(10),
      }}>
      <View style={styles.mainView}>
        <View style={{width: '32%', height: '100%'}}>
          <Image
            source={props.image ? {uri: props.image} : Instructor}
            resizeMethod="resize"
            resizeMode="contain"
            style={styles.imgAspect}
          />
        </View>
        <View style={stylesInstructor.textInfoView}>
          <Text style={stylesInstructor.textSize}>
            {props.activityInstrutor}
          </Text>
          <Text style={stylesInstructor.textSize}>{props.role}</Text>
        </View>
      </View>
      {/* <View style={styles.textView}>
        <Text style={stylesSharedText.secondaryText}>Shared On</Text>
        <Text style={styles.dateText}>{props.date}</Text>
      </View> */}
    </View>
  );
};

export default InstructorWithDate;

const styles = StyleSheet.create({
  imgAspect: {
    width: '100%',
    height: '100%',
  },
  textView: {
    width: '45%',
    alignSelf: 'center',
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: verticalScale(55),
    gap: verticalScale(10),
  },
  mainView: {
    width: '55%',
    height: verticalScale(55),
    flexDirection: 'row',
    marginVertical: verticalScale(5),
    gap: 10,
    alignItems: 'center',
  },
  dateText: {
    fontFamily: fonts.SecondaryDMSansMedium,
    fontSize: 16,
    color: '#000',
    textAlign: 'left',
  },
});

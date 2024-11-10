import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Placeholder} from '../../../assets';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import HighlightedBackButton from '../../../components/HighlightedBackButton';
import theme from '../../../theme/Theme';
import {fonts} from '../../../theme/enum';
import Countdown from './CountDown';

type Props = {
  sessionName: string;
  navigateBack: () => void;
  sessionCategory: string;
  sessionCarePerson: string;
  sessionTime: string;
  status: string;
  sessionImage: any;
};

const SessionInfoBackGroundComponent = (props: Props) => {
  const takeMeBack = () => {
    props.navigateBack();
  };
  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={props.sessionImage ? {uri: props.sessionImage} : Placeholder}
        style={styles.imgBgView}
        imageStyle={styles.imgAspect}>
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#777',
            top: 0,
            position: 'absolute',
            opacity: 0.2,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}></View>
        <HighlightedBackButton navigationCall={takeMeBack} />
        <View style={styles.infoView}>
          <View style={styles.textView}>
            <Text style={styles.category}>{props.sessionCategory}</Text>
          </View>
          <Text style={styles.name}>{props.sessionName}</Text>
          <Text style={styles.carePerson}>with {props.sessionCarePerson}</Text>
        </View>
        {props.sessionTime !== null && props.status === 'BOOKED' && (
          <Countdown
            appointmentTime={props.sessionTime}
            returnType="countdown"
            status={props.status}
          />
        )}
      </ImageBackground>
    </View>
  );
};

export default SessionInfoBackGroundComponent;

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '38%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  imgBgView: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingBottom: verticalScale(10),
    position: 'relative',
  },
  imgAspect: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    opacity: 0.9,
  },
  infoView: {
    width: '100%',
    height: '50%',
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
    position: 'absolute',
    bottom: -10,
  },
  textView: {
    backgroundColor: '#EFE8F4',
    paddingHorizontal: horizontalScale(8),
    width: '35%',
    paddingVertical: horizontalScale(2),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  category: {
    fontFamily: fonts.SecondaryDMSansBold,
    color: theme.colors.cardPrimaryBackground,
    width: '100%',
    fontSize: 12,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  name: {
    fontFamily: fonts.SecondaryDMSansBold,
    color: '#FFF',
    fontSize: 22,
    // marginBottom: 20,
  },
  carePerson: {
    fontFamily: 'DMSans-Medium',
    color: '#FFF',
    marginBottom: verticalScale(10),
    fontSize: 14,
  },
});

import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BigClock, Calendar, GroupIcon} from '../../../assets';
import {fonts} from '../../../theme/enum';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import {getDateTimeInfo} from '../helpers/getDatetimeValues';
import moment from 'moment';

type SessionDetail = {
  sessionTime: string;
  duration: string;
  sessionType: string;
};

const SessionDetails = (props: SessionDetail) => {
  return (
    <>
      <Text style={stylesSessionDetails.mainText}>Session details</Text>
      <View style={stylesSessionDetails.mainContainer}>
        {props.sessionTime !== null && (
          <View style={stylesSessionDetails.detailsContainer}>
            <View style={[stylesSessionDetails.imageBgView, {flex: 1}]}>
              <Image
                source={Calendar}
                resizeMethod="resize"
                resizeMode="contain"
                style={stylesSessionDetails.imageAspect}
              />
            </View>

            <View style={stylesSessionDetails.textContainer}>
              {props.sessionTime !== null ? (
                <Text style={stylesSessionDetails.timeText}>
                  {moment(props.sessionTime).format('DD MMMM')}
                </Text>
              ) : (
                <Text style={stylesSessionDetails.timeText}>
                  Session not booked
                </Text>
              )}
              {
                <Text style={stylesSessionDetails.hoursText}>
                  {moment(new Date(props.sessionTime)).format('H:mm A')}
                </Text>
              }
            </View>
          </View>
        )}

        {props.sessionTime !== null && (
          <View style={stylesSessionDetails.horizontalLine} />
        )}
        <View style={[stylesSessionDetails.detailsContainer]}>
          <View
            style={[
              stylesSessionDetails.imageBgView,
              {
                width: props.sessionTime !== null ? 30 : 30,
              },
            ]}>
            <Image
              source={BigClock}
              resizeMethod="resize"
              resizeMode="contain"
              style={stylesSessionDetails.imageAspect}
            />
          </View>

          <View style={stylesSessionDetails.textContainer}>
            <Text style={stylesSessionDetails.timeText}>
              {props.duration} mins
            </Text>
            <Text style={stylesSessionDetails.hoursText}>Session</Text>
          </View>
        </View>
        <View style={stylesSessionDetails.horizontalLine} />

        <View style={[stylesSessionDetails.detailsContainer]}>
          <View
            style={[
              stylesSessionDetails.imageBgView,
              {
                width: props.sessionTime !== null ? 30 : 30,
              },
            ]}>
            <Image
              source={GroupIcon}
              resizeMethod="resize"
              resizeMode="contain"
              style={stylesSessionDetails.imageAspect}
            />
          </View>

          <View style={stylesSessionDetails.textContainer}>
            <Text style={stylesSessionDetails.timeText}>
              {props.sessionType}
            </Text>
            <Text style={stylesSessionDetails.hoursText}>Session</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default SessionDetails;

export const stylesSessionDetails = StyleSheet.create({
  hoursText: {
    fontFamily: fonts.SecondaryDMSansMedium,
    fontSize: 12,
    color: '#777',
  },
  timeText: {
    fontFamily: fonts.SecondaryDMSansBold,
    fontSize: 12,
  },
  mainText: {
    fontFamily: fonts.SecondaryDMSansBold,
    color: '#000',
    paddingHorizontal: horizontalScale(20),
  },
  horizontalLine: {
    width: 1,
    backgroundColor: '#c3c3c3',
    height: '50%',
    alignSelf: 'center',
    marginHorizontal: 6,
    justifyContent: 'center',
  },
  imageBgView: {
    height: '50%',
    borderRadius: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#c3c3c3',
    elevation: 12,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.4,
  },
  imageAspect: {
    width: '60%',
    height: '60%',
    tintColor: '#000',
    alignSelf: 'center',
  },
  detailsContainer: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#c3c3c3',
    justifyContent: 'flex-start',
    gap: 5,
    flex: 1,
  },
  mainContainer: {
    width: '90%',
    height: verticalScale(55),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: verticalScale(10),
    backgroundColor: '#FAF2FF',
    borderRadius: 20,
    paddingHorizontal: horizontalScale(10),
    borderColor: '#F6E5FF',
    alignSelf: 'center',
    borderWidth: 1,
    paddingVertical: verticalScale(5),
  },
  textContainer: {
    width: '70%',
    height: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: 2,
  },
});

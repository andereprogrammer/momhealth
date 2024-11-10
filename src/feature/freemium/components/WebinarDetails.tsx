import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BigClock, Calendar, GroupIcon, Zoom} from '../../../assets';
import {fonts} from '../../../theme/enum';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import {getDateTimeInfo} from '../helpers/getDatetimeValues';
import moment from 'moment';

type WebinarDetails = {
  webinarTime: string;
  duration: string;
  webinarPlatform: any;
};

const WebinarDetails = (props: WebinarDetails) => {
  return (
    <>
      <Text style={stylesWebinarDetails.mainText}>Webinar details</Text>
      <View style={stylesWebinarDetails.mainContainer}>
        {props.webinarTime !== null && (
          <View style={stylesWebinarDetails.detailsContainer}>
            <View style={[stylesWebinarDetails.imageBgView, {flex: 1}]}>
              <Image
                source={Calendar}
                resizeMethod="resize"
                resizeMode="contain"
                style={stylesWebinarDetails.imageAspect}
              />
            </View>

            <View style={stylesWebinarDetails.textContainer}>
              {props.webinarTime !== null ? (
                <Text style={stylesWebinarDetails.timeText}>
                  {moment(props.webinarTime).format('DD MMMM')}
                </Text>
              ) : (
                <Text style={stylesWebinarDetails.timeText}>
                  Webinar not available
                </Text>
              )}
            </View>
          </View>
        )}

        {props.webinarTime !== null && (
          <View style={stylesWebinarDetails.horizontalLine} />
        )}
        <View style={[stylesWebinarDetails.detailsContainer]}>
          <View
            style={[
              stylesWebinarDetails.imageBgView,
              {
                width: props.webinarTime !== null ? 30 : 30,
              },
            ]}>
            <Image
              source={BigClock}
              resizeMethod="resize"
              resizeMode="contain"
              style={stylesWebinarDetails.imageAspect}
            />
          </View>

          <View style={stylesWebinarDetails.textContainer}>
            <Text style={stylesWebinarDetails.timeText}>
              {moment(props.webinarTime).format('hh:mm A')}
            </Text>
          </View>
        </View>
        <View style={stylesWebinarDetails.horizontalLine} />

        <View style={[stylesWebinarDetails.detailsContainer]}>
          <View
            style={[
              {
                width: 100,
              },
            ]}>
            <Image
              resizeMethod="resize"
              resizeMode="contain"
              source={Zoom}
              style={stylesWebinarDetails.imageAspect}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default WebinarDetails;

export const stylesWebinarDetails = StyleSheet.create({
  hoursText: {
    fontFamily: fonts.SecondaryDMSansMedium,
    fontSize: 12,
    color: '#777',
  },
  timeText: {
    width: '100%',
    height: '100%',
  },
  mainText: {
    fontFamily: fonts.SecondaryDMSansBold,
    color: '#000',
    paddingHorizontal: horizontalScale(20),
    fontSize: 18,
    paddingTop: 5,
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
    justifyContent: 'center',
    gap: 5,
    flex: 1,
  },
  mainContainer: {
    width: '90%',
    height: verticalScale(55),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: verticalScale(5),
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
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    paddingTop: 20,
  },
});

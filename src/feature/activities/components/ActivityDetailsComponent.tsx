import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BigClock, Calendar, GroupIcon} from '../../../assets';
import {stylesSessionDetails} from '../../session/components/SessionDetails';
import moment from 'moment';

type Props = {
  sessionTime: string;
  duration: string;
  trimester: string;
  category: string;
  contentType: string;
};

const ActivityDetailsComponent = (props: Props) => {
  return (
    <>
      <Text style={stylesSessionDetails.mainText}>Activity details</Text>
      <View style={stylesSessionDetails.mainContainer}>
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
            <Text style={stylesSessionDetails.hoursText}>Activity</Text>
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
              {props.contentType}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default ActivityDetailsComponent;

const styles = StyleSheet.create({});

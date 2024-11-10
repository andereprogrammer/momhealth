import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Calendar, InstIcon, Placeholder} from '../../../assets';
import {designPalette} from '../../../theme/Theme';
import ActivitySucess from '../../activities/components/ActivitySucess';
import {getDateTimeInfo} from '../helpers/getDatetimeValues';
import moment from 'moment';
import useDataProvider from "../../../context-store/useDataProvider";
import FreemiumSessionHomeScreen from "../../freemium/features/sessions/FreemiumSessionHomeScreen";

type Props = {
  sessionName: string;
  sessionTime: string;
  sessionCarePerson: string;
  onSuccessUpdated: () => void;
};
const {height} = Dimensions.get('screen');
const AnimatedSuccessScreen = (props: Props) => {
  const value = useRef(new Animated.Value(300)).current;
  const vl = useRef(new Animated.Value(0)).current;
  const {freemium} = useDataProvider();
  let homeScreen = 'ActivityTopNavigation';
  if (freemium) {
    homeScreen = 'FreemiumSessionHomeScreen';
  }
  let negativeHeight = -height - 200;
  let modalMoveY = vl.interpolate({
    inputRange: [0, 1],
    outputRange: [0, negativeHeight],
  });


  let translateStyle = {transform: [{translateY: modalMoveY}]};
  const startAnimation = () => {
    Animated.timing(value, {
      toValue: 200,
      duration: 1500,
      useNativeDriver: true,
    }).start();
    Animated.timing(vl, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    setTimeout(() => {
      startAnimation();
    }, 1000);
  });

  return (
    <>
      <Animated.View
        style={{
          width: '100%',
          height: '40%',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          //   top: 0,
          transform: [
            {
              translateY: value,
            },
          ],
        }}>
        <ActivitySucess
          message="Session booked successfully"
          home={homeScreen}
          time={4000}
          dontTakeMe={false}
          onSuccess={() => props.onSuccessUpdated()}
        />
      </Animated.View>
      <Animated.View
        style={[
          {
            width: '95%',
            height: '10%',
            borderRadius: 30,
            backgroundColor: '#FFF2FC',
            borderWidth: 1,
            borderColor: designPalette.primary.lightPink,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 5,
            position: 'absolute',
            bottom: -height,
            alignSelf: 'center',
          },
          translateStyle,
        ]}>
        <View
          style={{
            width: '26%',
            height: '90%',
            overflow: 'hidden',
            margin: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 30,
          }}>
          <Image
            source={Placeholder}
            style={{
              width: '60%',
              height: '100%',
              borderRadius: 20,
            }}
            resizeMode="cover"
            resizeMethod="resize"
          />
        </View>
        <View
          style={{
            width: '70%',
            height: '100%',
            padding: 10,
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            gap: 20,
          }}>
          <Text
            style={{
              fontWeight: '800',
              fontFamily: 'PlusJakartaSans',
              fontSize: 13,
            }}>
            {props.sessionName}
          </Text>
          <View
            style={{
              width: '100%',
              height: '100%',
              flexDirection: 'row',
              gap: 25,
            }}>
            <View style={styles.carePersonView}>
              <View style={{width: '18%', height: '50%'}}>
                <Image
                  source={InstIcon}
                  resizeMethod="resize"
                  resizeMode="contain"
                  style={{width: '100%', height: '80%'}}
                />
              </View>
              <Text style={styles.carePersonText}>
                {props.sessionCarePerson}
              </Text>
            </View>
            <View
              style={{
                width: '45%',
                flexDirection: 'row',
                gap: 10,
              }}>
              <View
                style={{
                  width: '13%',
                  height: '30%',
                  borderRadius: 30,
                  // backgroundColor: '#fff',
                }}>
                <Image
                  source={Calendar}
                  resizeMethod="resize"
                  resizeMode="contain"
                  style={{width: '100%', height: '100%', tintColor: '#000'}}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  gap: 5,
                  width: '100%',
                }}>
                <Text
                  style={{
                    fontFamily: 'DMSans-Bold',
                    fontSize: 12,
                    color: '#6F6871',
                  }}>
                  {getDateTimeInfo(props.sessionTime, 'date')}
                </Text>
                {/* <Text
                  style={{
                    fontFamily: 'DMSans-Medium',
                    fontSize: 12,
                    color: '#6F6871',
                  }}>
                  {getDateTimeInfo(props.sessionTime, 'time')}
                </Text> */}
              </View>
            </View>
          </View>
        </View>
      </Animated.View>
    </>
  );
};

export default AnimatedSuccessScreen;

const styles = StyleSheet.create({
  carePersonView: {
    width: '40%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 5,
  },
  carePersonText: {
    fontFamily: 'DMSans-Medium',
    fontSize: 12,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    // padding: horizontalScale(10),
    color: '#6F6871',
  },
});

import {Image, StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import {BackBtn, PersonalFiller} from '../../../assets';
import LinearGradient from 'react-native-linear-gradient';
import {getHomeScreenInfo} from '../../../api/homeapis';
import {ActivePackage} from '../../../api/types';
import moment from 'moment';
import {fonts} from '../../../theme/enum';
import {useNavigation} from '@react-navigation/native';

type Props = {
  message: string;
  package: ActivePackage;
  style: any;
};

const ActivePackagesInfoCard = (props: Props) => {
  const {width} = useWindowDimensions();
  const navigation = useNavigation();
  console.log('props', props);
  const expireDate = moment(props?.package?.package_expiry);
  const now = moment();
  const expireDays = expireDate.diff(now, 'weeks');

  function weekString(weeks) {
    if (weeks === 1) {
      return `${weeks} week`;
    } else {
      return `${weeks} weeks`;
    }
  }

  return (
    <View
      style={[
        {
          alignItems: 'center',
          justifyContent: 'center',
        },
        props?.style,
      ]}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#FFD6F6', '#FFF1FC']}
        style={styles.mainContainerView}>
        <View style={styles.textView}>
          <Text style={styles.textViewCard}>
            {props?.package?.package_type === 'FREE'
              ? 'No active subscription'
              : props?.package?.program_name}
          </Text>
          {props?.package?.package_type === 'FREE' && (
            <Text
              style={styles.infoTextView}
              onPress={() => navigation.navigate('LockedFeaturesScreen')}>
              Upgrade your package
            </Text>
          )}
          {props?.package?.package_type !== 'FREE' && expireDays > 0 && (
            <Text style={styles.infoTextView}>
              Package ends in
              <Text
                style={{
                  color: '#5C198D',
                  fontFamily: fonts.SecondaryDMSansBold,
                  fontSize: 16,
                }}>
                {' '}
                {weekString(expireDays)}
              </Text>
            </Text>
          )}
          {props?.package?.package_type !== 'FREE' && expireDays < 0 && (
            <Text style={styles.infoTextView}>Package expired.</Text>
          )}
          {props?.package?.package_type !== 'FREE' && expireDays === 0 && (
            <Text style={styles.infoTextView}>
              Package expires on {expireDate.format('Mo MMM YYYY')}
            </Text>
          )}
        </View>
        <View style={styles.imageView}>
          <Image
            resizeMethod="resize"
            resizeMode="cover"
            source={PersonalFiller}
            style={styles.mainImageAspect}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

export default ActivePackagesInfoCard;

const styles = StyleSheet.create({
  mainContainerView: {
    width: '95%',
    borderRadius: horizontalScale(20),
    elevation: 10,
    shadowColor: '#c3c3c3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: horizontalScale(10),
    marginTop: verticalScale(12),
    marginBottom: verticalScale(10),
  },
  textView: {
    width: '75%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft: 3,
  },
  textViewCard: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 16,
    textAlign: 'left',
    color: '#5C198D',
    padding: horizontalScale(4),
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  infoTextView: {
    fontFamily: 'DMSans-Medium',
    fontSize: 14,
    textAlign: 'left',
    color: '#000',
    padding: horizontalScale(3),
    // marginLeft: verticalScale(5),
  },
  imageWrapperView: {
    width: '10%',
    height: '55%',
    justifyContent: 'center',
    backgroundColor: 'rgba(92, 25, 141, 1)',
    alignItems: 'center',
    borderRadius: horizontalScale(10),

    transform: [{rotate: '-180deg'}],
  },
  imageAspect: {width: '100%', height: '40%', tintColor: '#fff'},
  imageView: {
    width: '20%',
    height: '100%',
  },
  mainImageAspect: {width: '100%', height: '100%'},
});

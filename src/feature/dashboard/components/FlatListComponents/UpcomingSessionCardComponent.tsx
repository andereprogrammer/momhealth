import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {CacheManager, CachedImage} from '@georstat/react-native-image-cache';

import theme from '../../../../theme/Theme';
import {horizontalScale, verticalScale} from '../../../../helpers/layoutHelper';
import {SessionObject} from '../../../../constants/types';
import MainCtaComponent from '../../../../components/ButtonComponents/MainCtaComponent/MainCtaComponent';
import {Colorclock, InstIcon, Placeholder} from '../../../../assets';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import useDataProvider from '../../../../context-store/useDataProvider';
import {getDateTimeInfo} from '../../../session/helpers/getDatetimeValues';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {fonts} from '../../../../theme/enum';
import {getAllDetailsSession} from '../../../../api/sessionBooking';
import moment from 'moment';
import {AttendeeStatus} from '../../../session/constants/sessionDetails';
import CachedImageBackgroundComponent from '../../../../components/ImageComponents/CachedImageBackgroundComponent';

const {width} = Dimensions.get('screen');
export const CARD_SIZE = width * 0.9;

const UpcomingSessionCardComponent: React.FC<SessionObject> = props => {
  const {setID, setShowBottomFilter, setSelectedSession, freemium} =
    useDataProvider();
  const [sessionDetails, setSessionDetails] = useState<SessionObject>(props);
  const navigation = useNavigation<NavigationProp<any, any>>();
  const [join, setJoin] = useState(false);
  const image = props.sessionImage ? {uri: props.sessionImage} : Placeholder;
  let free = freemium;

  const rStyle = useAnimatedStyle(() => {
    const isViewable = Boolean(
      props.itemsViewed?.value
        .filter(item => item.isViewable)
        .find(viewI => viewI.item._id === props._id),
    );
    return {
      opacity: withTiming(isViewable ? 1 : 0),
      transform: [
        {
          scale: withTiming(isViewable ? 1 : 0.6),
        },
      ],
    };
  });
  const inputRange = [
    (props.index - 2) * CARD_SIZE,
    (props.index - 1) * CARD_SIZE,
    (props.index + 1) * CARD_SIZE,
  ];
  const animatedStyles = useAnimatedStyle(() => {
    const isViewable = Boolean(
      props.itemsViewed?.value
        .filter(item => item.isViewable)
        .find(viewI => viewI.item._id === props._id),
    );
    const scale = interpolate(props.scrollX?.value, inputRange, [0, -20, 0], {
      extrapolateRight: Extrapolation.CLAMP,
    });
    const opac = withTiming(isViewable ? 0 : 1);

    return {
      transform: [{translateY: scale}],
      opacity: opac,
    };
  });

  const startSessionNow = (sessionObj: SessionObject) => {
    if (props.sessionType.toLowerCase() === 'group') {
      navigation.navigate('Welcome', {
        id: sessionObj._id,
      });
    } else {
      if (free) {
        navigation.navigate('FreemiumSessionDetailsScreen', {
          sessionObject: sessionObj,
        });
      } else {
        navigation.navigate('SessionFullDetailsScreen', {
          sessionObject: sessionObj,
        });
      }
    }
  };

  const startSession = (sessionObj: SessionObject) => {
    setID(sessionObj._id);
    console.log('freemium', freemium);
    if (freemium) {
      navigation.navigate('FreemiumSessionDetailsScreen', {
        sessionObject: props.item,
      });
    } else {
      navigation.navigate('SessionFullDetailsScreen', {
        sessionObject: props.item,
      });
    }
  };
  const takeMeToSession = () => {
    if (freemium) {
      navigation.navigate('FreemiumSessionDetailsScreen', {
        sessionObject: props.item,
      });
    } else {
      navigation.navigate('SessionFullDetailsScreen', {
        sessionObject: props.item,
      });
    }
  };

  useLayoutEffect(() => {
    if (props.sessionState === 'BOOKED') {
      setJoin(true);
    } else {
      setJoin(false);
    }
    setSessionDetails(props);
  }, []);

  return (
    <Animated.View
      style={[
        styles.mainView,
        props.isAnimated && rStyle,
        !props.isAnimated && animatedStyles,
      ]}>
      <View style={styles.cardView}>
        <View style={styles.imageBg}>
          {image?.uri ? (
            <CachedImageBackgroundComponent
              source={image.uri}
              viewStyle={styles.imageView}
              imageStyle={styles.imageStyle}
              resizeModeCache="cover"
              imageLocal={props.sessionImage !== undefined ? false : true}
            />
          ) : (
            <ImageBackground
              source={image}
              style={styles.imageView}
              imageStyle={styles.imageStyle}
            />
          )}
        </View>
        <View style={styles.categoryRow}>
          <View style={styles.categoryBox}>
            <Text style={styles.categoryText}>{props.sessionCategory}</Text>
          </View>
          <View style={styles.typeView}>
            <Text style={styles.typeText}>{props.sessionType}</Text>
          </View>
        </View>

        <View style={styles.sessionNameView}>
          <View style={styles.sessionCard}>
            <Text numberOfLines={1} style={styles.sessionText}>
              {props.sessionName}
            </Text>
          </View>
          <View style={styles.dateAndTimeContainer}>
            <View style={styles.dateAndTime}>
              {props.sessionTime !== null && (
                <View style={styles.dateImageView}>
                  <View style={{width: '15%', height: '50%'}}>
                    <Image
                      source={Colorclock}
                      resizeMethod="resize"
                      resizeMode="contain"
                      style={{width: '100%', height: '70%'}}
                    />
                  </View>

                  <Text style={styles.dateText}>
                    {moment(new Date(props.sessionTime)).format('DD-MM-YYYY')}
                  </Text>
                  <Text style={styles.timeText}>
                    {getDateTimeInfo(props.sessionTime, 'time')}
                  </Text>
                </View>
              )}

              <View style={styles.carePersonView}>
                <View style={{width: '15%', height: '50%'}}>
                  <Image
                    source={InstIcon}
                    resizeMethod="resize"
                    resizeMode="contain"
                    style={{width: '70%', height: '70%'}}
                  />
                </View>
                <Text style={styles.carePersonText}>
                  {props.sessionCarePerson}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.btnView}>
            <View style={styles.btnContainer}>
              {props.showCta ? (
                <MainCtaComponent
                  onClick={() => startSession(props)}
                  active={true}
                  style={{
                    marginHorizontal: horizontalScale(0),
                    borderRadius: horizontalScale(20),
                  }}>
                  <Text>
                    {props.sessionState === AttendeeStatus.BOOKED ||
                    props.sessionState === AttendeeStatus.JOINED
                      ? 'Go to session'
                      : 'Book Session'}
                  </Text>
                </MainCtaComponent>
              ) : (
                <MainCtaComponent
                  onClick={takeMeToSession}
                  active={true}
                  style={{
                    marginHorizontal: horizontalScale(5),
                    borderRadius: horizontalScale(20),
                  }}>
                  <Text>Go to Session</Text>
                </MainCtaComponent>
              )}
            </View>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

export default React.memo(UpcomingSessionCardComponent);

export const styles = StyleSheet.create({
  dateImageView: {
    width: '50%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },

  dateAndTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: horizontalScale(2),
  },
  dateAndTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    alignItems: 'center',
    width: '100%',
    height: '28%',
  },
  timeText: {
    fontFamily: fonts.SecondaryDMSansMedium,
    fontSize: 12,
    textAlign: 'center',
    color: '#6F6871',
  },
  dateText: {
    fontFamily: fonts.SecondaryDMSansMedium,
    fontSize: 12,
    textAlign: 'center',
    color: '#6F6871',
  },
  sessionText: {
    fontFamily: fonts.SecondaryDMSansBold,
    fontSize: 14,
    color: '#000',
  },
  sessionCard: {
    paddingHorizontal: horizontalScale(5),
    paddingVertical: verticalScale(3),
    justifyContent: 'center',
  },
  sessionNameView: {
    width: '100%',
    height: '40%',
    position: 'relative',
    paddingHorizontal: horizontalScale(5),
  },
  typeText: {
    fontFamily: fonts.SecondaryDMSansBold,
    color: theme.colors.cardPrimaryBackground,
    textTransform: 'uppercase',
    fontSize: 10,
  },

  btnContainer: {
    width: '98%',
    borderRadius: horizontalScale(20),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  btnView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  mainView: {
    width: CARD_SIZE,
    height: width - horizontalScale(50),
    alignSelf: 'center',
  },
  cardView: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: horizontalScale(20),
    paddingHorizontal: horizontalScale(5),
    backgroundColor: '#fff',
    shadowColor: 'rgba(71, 31, 185, 0.20)',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 12,
    aspectRatio: 1,
    shadowOffset: {
      width: 6,
      height: 3,
    },
  },
  imageBg: {
    width: '100%',
    // position: 'relative',
    height: '48%',
    paddingHorizontal: horizontalScale(8),
    marginVertical: verticalScale(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageView: {
    width: '100%',
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: horizontalScale(20),
    alignSelf: 'center',
    marginVertical: verticalScale(8),
    overflow: 'hidden',
  },
  imageStyle: {
    height: '100%',
    borderRadius: horizontalScale(20),
    alignSelf: 'center',
    width: '100%',
  },
  assignView: {
    position: 'absolute',
    top: 25,
    right: 0,
    width: '35%',
    height: '18%',
    backgroundColor: '#E8F8D4',
    borderBottomStartRadius: horizontalScale(20),
    borderTopStartRadius: horizontalScale(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  assignText: {
    fontFamily: fonts.SecondaryDMSansMedium,
    fontSize: 9,
  },
  categoryRow: {
    paddingHorizontal: horizontalScale(8),
    width: '48%',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    height: '10%',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  categoryBox: {
    backgroundColor: theme.colors.inputBg,
    padding: horizontalScale(5),
    borderRadius: horizontalScale(5),
  },
  categoryText: {
    fontFamily: fonts.SecondaryDMSansBold,
    color: theme.colors.cardPrimaryBackground,
    textTransform: 'uppercase',
    fontSize: 10,
  },
  typeView: {
    backgroundColor: theme.colors.inputBg,
    padding: horizontalScale(5),
    borderRadius: horizontalScale(5),
  },
  carePersonView: {
    width: '40%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  carePersonText: {
    fontFamily: fonts.SecondaryDMSansMedium,
    fontSize: 12,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    // padding: horizontalScale(10),
    color: '#6F6871',
  },
});

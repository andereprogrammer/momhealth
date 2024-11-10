import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import theme from '../../../../theme/Theme';
import {horizontalScale, verticalScale} from '../../../../helpers/layoutHelper';
import {AssignedActivity, SessionObject} from '../../../../constants/types';
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
import {Activity} from '../../screens/HomeScreen';
import {CARD_SIZE} from './UpcomingSessionCardComponent';
import CachedImageBackgroundComponent from '../../../../components/ImageComponents/CachedImageBackgroundComponent';

const {width} = Dimensions.get('screen');

const ActivityCardComponent: React.FC<AssignedActivity> = props => {
  const {setID, setShowBottomFilter, setSelectedSession} = useDataProvider();
  const [sessionDetails, setSessionDetails] = useState<AssignedActivity>(props);
  const navigation = useNavigation<NavigationProp<any, any>>();
  const [join, setJoin] = useState(false);
  const image = props.activity.image_link
    ? props.activity.image_link
    : Placeholder;

  const takeMeToSession = () => {
    let activityData: Activity = {
      id: props.activity.id,
      title: props.activity.title,
      image: props.activity.image_link,
      description: props.activity.description,
      tags: props.activity.tags,
      url: props.activity.image_link,
      status: props.status,
      content_link: props.activity.content_link,
      content_type: props.activity.content_type,
      category: props.activity.categories,
      assignee: props.assignee,
      assigned_on: props.assigned_on,
      requirements: props.activity.requirements,
      created: props.activity.created,
      duration_in_minutes: props.activity.duration_in_minutes,
    };
    console.log('########################################', activityData);

    navigation.navigate('ActivityContentScreen', {
      activity: activityData,
    });
  };

  const rStyle = useAnimatedStyle(() => {
    const isViewable = Boolean(
      props.itemsViewed?.value
        .filter(item => item.isViewable)
        .find(viewI => viewI.item.id === props.activity.id),
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
        .find(viewI => viewI.item.id === props.activity.id),
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
  return (
    <Animated.View
      style={[
        styles.mainView,
        props.isAnimated && rStyle,
        !props.isAnimated && animatedStyles,
      ]}>
      <View style={styles.cardView}>
        <View style={styles.imageBg}>
          <CachedImageBackgroundComponent
            source={image}
            viewStyle={styles.imageView}
            imageStyle={styles.imageStyle}
            resizeModeCache="cover"
          />
        </View>
        <View style={styles.categoryRow}>
          {props.activity.categories?.map((category, i) => {
            return (
              <View
                style={styles.categoryBox}
                key={props.activity.id + '_' + i}>
                <Text
                  key={props.activity.id + '_' + i}
                  style={styles.categoryText}>
                  {category}
                </Text>
              </View>
            );
          })}
        </View>

        <View style={styles.sessionNameView}>
          <View style={styles.sessionCard}>
            <Text numberOfLines={1} style={styles.sessionText}>
              {props.activity.title}
            </Text>
          </View>
          <View style={styles.dateAndTimeContainer}>
            <View style={styles.dateAndTime}>
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
                  {getDateTimeInfo(props.activity.created, 'date')}
                </Text>
                <Text style={styles.timeText}>
                  {getDateTimeInfo(props.activity.created, 'time')}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.btnView}>
            <View style={styles.btnContainer}>
              <MainCtaComponent
                onClick={takeMeToSession}
                active={true}
                style={{
                  marginHorizontal: horizontalScale(5),
                  borderRadius: horizontalScale(20),
                }}>
                <Text>View Activity</Text>
              </MainCtaComponent>
            </View>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

export default ActivityCardComponent;

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
    textTransform: 'capitalize',
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
    height: width - 50,
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
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 12,
    aspectRatio: 1,
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

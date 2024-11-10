import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {AssignedActivity} from '../../../constants/types';
import useDataProvider from '../../../context-store/useDataProvider';
import {BlurActivity, Colorclock, Lock, Placeholder} from '../../../assets';
import {Activity} from '../../dashboard/screens/HomeScreen';
import {CARD_SIZE} from '../../dashboard/components/FlatListComponents/UpcomingSessionCardComponent';
import CachedImageBackgroundComponent from '../../../components/ImageComponents/CachedImageBackgroundComponent';
import {getDateTimeInfo} from '../../session/helpers/getDatetimeValues';
import MainCtaComponent from '../../../components/ButtonComponents/MainCtaComponent/MainCtaComponent';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import {fonts} from '../../../theme/enum';
import theme from '../../../theme/Theme';
import {BlurView, VibrancyView} from '@react-native-community/blur';
import {trackEvent} from '../../../helpers/product_analytics';
import {trigger} from 'react-native-haptic-feedback';
import {options} from '../../dashboard/navigation/BottomTabNavigation/HomeTabNavigator';
const {width} = Dimensions.get('screen');

const FreemiumActivityCard: React.FC<AssignedActivity> = props => {
  const navigation = useNavigation<NavigationProp<any, any>>();
  const image = props.activity.image_link
    ? props.activity.image_link
    : Placeholder;

  const takeMeToSession = () => {
    trigger('impactLight', options);
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
    trackEvent('freemiumhome', 'activity', 'clicked');
    navigation.navigate('ActivityContentScreen', {
      activity: activityData,
    });
  };

  return (
    <View style={[styles.mainView]}>
      {props.index === 0 ? (
        <View style={styles.cardView}>
          <View style={styles.imageBg}>
            <CachedImageBackgroundComponent
              source={image}
              viewStyle={styles.imageView}
              imageStyle={styles.imageStyle}
              resizeModeCache="cover"
            />
          </View>

          <View style={styles.sessionNameView}>
            <View style={styles.sessionCard}>
              <Text numberOfLines={1} style={styles.sessionText}>
                {props.activity.title}
              </Text>
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
            {/* <View style={styles.dateAndTimeContainer}> */}
            {/* <View style={styles.dateAndTime}>
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
              </View> */}
            {/* </View> */}
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
      ) : (
        <View style={[styles.cardView]}>
          <TouchableOpacity
            onPress={() => navigation.navigate('PackageHomeScreen')}
            style={styles.lock}>
            <Image source={Lock} style={styles.lockImage} />
          </TouchableOpacity>

          <View style={styles.imageBg}>
            <CachedImageBackgroundComponent
              source={image}
              viewStyle={styles.imageView}
              imageStyle={styles.imageStyle}
              resizeModeCache="cover"
            />
          </View>
          <View style={styles.sessionNameView}>
            <View style={styles.sessionCard}>
              <Text numberOfLines={1} style={styles.sessionText}>
                {props.activity.title}
              </Text>
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
                  active={false}
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
      )}
    </View>
  );
};

export default FreemiumActivityCard;

export const styles = StyleSheet.create({
  lockImage: {width: '100%', height: '100%'},
  lock: {
    position: 'absolute',
    top: 15,
    zIndex: 2000,
    width: 30,
    height: 30,
    left: 20,
  },
  blurOverlay: {
    zIndex: 10,
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
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
    height: '1%',
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
    justifyContent: 'center',
  },
  sessionNameView: {
    width: '100%',
    height: '47%',
    position: 'relative',
    paddingHorizontal: horizontalScale(5),
    justifyContent: 'space-between',
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
    height: '100%',
  },
  btnView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height: '52%',
  },
  mainView: {
    width: CARD_SIZE - 80,
    height: width - 95,
    alignSelf: 'center',
    marginVertical: 10,
    marginLeft: 2,
  },
  cardView: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: horizontalScale(20),
    paddingHorizontal: horizontalScale(5),
    backgroundColor: '#fff',
    shadowColor:
      Platform.OS === 'android'
        ? 'rgba(71, 31, 185, 0.60)'
        : 'rgba(71, 31, 185, 0.40)',
    shadowOpacity: Platform.OS === 'android' ? 0.8 : 0.6,
    shadowRadius: 4,
    elevation: 4,
    position: 'relative',
    shadowOffset: {
      width: 2,
      height: 2,
    },
  },
  imageBg: {
    width: '100%',
    // position: 'relative',
    height: '50%',
    paddingHorizontal: horizontalScale(4),
    marginVertical: verticalScale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageView: {
    width: '100%',
    height: '96%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: horizontalScale(20),
    alignSelf: 'center',
    marginVertical: verticalScale(6),
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
    height: '20%',
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

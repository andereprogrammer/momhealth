import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {SCREEN_HEIGHT_WINDOW} from '../../../helpers/layoutHelper';
import {fonts, Pallete} from '../../../theme/enum';
import useDataProvider from '../../../context-store/useDataProvider';
import ImageWithView from '../../../components/ImageWithView';
import useFetchJson from '../helpers/useFetchJson';
import Shimmer from '../../../components/SkeletonComponent/Shimmer';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {el, sl} from 'date-fns/locale';
import moment from 'moment';

type Props = {
  gradientColors: string[];
  imageLink: string;
  joinNowLink: string;
  textColor: string;
  backgroundImageLink: string;
  backgroundImageStyle: ViewStyle;
  type: 'WEBINAR' | 'YOGA' | 'GARBHSANSKAR';
};

const CounterCard = ({
  title,
  content,
  textColor,
}: {
  title: string;
  content: number | string;
  textColor: string;
}) => {
  return (
    <View style={styles.numberContainer}>
      <View style={styles.numberView}>
        <Text style={[styles.numberText]}>{content}</Text>
        <Text style={[styles.numberTextTitle]}>{title}</Text>
      </View>
    </View>
  );
};

const WebinarCounter = ({
  gradientColors,
  imageLink = '',
  joinNowLink = '',
  textColor = '',
  backgroundImageLink,
  backgroundImageStyle,
  type = 'WEBINAR',
}: Props) => {
  const {patientDetails} = useDataProvider();

  const [eventTime, setEventTime] = useState(new Date());
  const [showJoin, setShowJoin] = useState(false);
  const [showCountDown, setShowCountDown] = useState(false);
  const [webinar, setWebinar] = useState();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const url =
    'https://s3.ap-south-1.amazonaws.com/everheal.nexus.prod/app/patient/webinars.json';

  const {data, loading, error} = useFetchJson(url);
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  useFocusEffect(
    React.useCallback(() => {
      if (data) {
        let relevantWebinar = data.find(data => data.type === type);
        setWebinar(relevantWebinar);
      }
    }, [data]),
  );
  const navigation = useNavigation<NavigationProp<any, any>>();
  const calculateTimeLeft = () => {
    const [eventHourUTC, eventMinuteUTC] = webinar?.startTime
      .split(':')
      .map(Number);

    const eventDayNumbers = webinar.days.map((day: string) =>
      daysOfWeek.indexOf(day),
    );

    const webinarDuration = webinar.durationInMinutes;

    const currentUTCDate = new Date();

    let nextEventDateUTC = new Date(currentUTCDate);
    nextEventDateUTC.setUTCHours(eventHourUTC, eventMinuteUTC, 0, 0);

    let dayDifference = 7;

    for (let dayNumber of eventDayNumbers) {
      let currentDayDifference =
        (dayNumber - currentUTCDate.getUTCDay() + 7) % 7;
      if (currentDayDifference === 0) {
        if (
          currentUTCDate.getTime() >=
          nextEventDateUTC.getTime() + webinarDuration * 60000
        ) {
          currentDayDifference = 7;
        }
      }
      if (currentDayDifference < dayDifference) {
        dayDifference = currentDayDifference;
      }
    }

    nextEventDateUTC.setUTCDate(currentUTCDate.getUTCDate() + dayDifference);

    const nextEventDateLocal = new Date(nextEventDateUTC);
    let difference = nextEventDateLocal.getTime() - currentUTCDate.getTime();
    let differenceInMinutes = difference / (1000 * 60);
    if (differenceInMinutes > -1 * webinarDuration && differenceInMinutes < 0) {
      difference = 0;
      setEventTime(nextEventDateLocal);
      setShowJoin(true);
    } else if (differenceInMinutes <= 10 && differenceInMinutes > 0) {
      setEventTime(nextEventDateLocal);
      setShowJoin(true);
    } else {
      setShowJoin(false);
      setEventTime(nextEventDateLocal);
    }

    let leftTime = {
      days: Math.floor(difference / (1000 * 60 * 60) / 24),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
    leftTime.minutes = leftTime.minutes.toString().padStart(2, '0');
    leftTime.seconds = leftTime.seconds.toString().padStart(2, '0');
    setTimeLeft(leftTime);
  };

  const getNextOccurrence = (
    slots: any[],
    currentUTCDate: Date,
    webinarDuration: number,
    excludedDates: string[],
  ) => {
    let upcomingDayAndTime = null;
    // console.log('excludeDays', excludedDates);

    for (let slot of slots) {
      const [eventHourUTC, eventMinuteUTC] = slot.time.split(':').map(Number);
      let dayNumber = daysOfWeek.indexOf(slot.day);
      let currentDayDifference =
        (dayNumber - currentUTCDate.getUTCDay() + 7) % 7;
      let minuteDiff =
        (eventHourUTC - currentUTCDate.getUTCHours()) * 60 +
        (eventMinuteUTC - currentUTCDate.getUTCMinutes());
      if (currentDayDifference === 0) {
        if (minuteDiff < -1 * webinarDuration) {
          // is after current webinar
          minuteDiff = 24 * 60;
          currentDayDifference = 7;
        }
      }
      let currentDayAndTime = {
        day: slot.day,
        slot: slot.time,
        minuteDiff: minuteDiff,
        dayDiff: currentDayDifference,
      };
      // console.log('currentDayAndTime', currentDayAndTime, upcomingDayAndTime);
      if (upcomingDayAndTime === null) {
        upcomingDayAndTime = currentDayAndTime;
      } else if (currentDayAndTime.dayDiff < upcomingDayAndTime.dayDiff) {
        // console.log('setting', currentDayAndTime);
        upcomingDayAndTime = currentDayAndTime;
      } else if (
        currentDayAndTime.dayDiff === upcomingDayAndTime.dayDiff &&
        currentDayAndTime.minuteDiff < upcomingDayAndTime.minuteDiff
      ) {
        upcomingDayAndTime = currentDayAndTime;
      }
      let eventDate = new Date(currentUTCDate);
      eventDate = moment(eventDate)
        .add(upcomingDayAndTime.dayDiff, 'days')
        .toDate();
      let eventDateStr = moment(eventDate).format('DD-MM-YYYY');
      // console.log('eventDateStr', eventDateStr, excludedDates);
      if (excludedDates && excludedDates.includes(eventDateStr)) {
        // console.log('setting to null', eventDateStr);
        upcomingDayAndTime = null;
      } else {
        // console.log('setting to upcoming', upcomingDayAndTime);
      }
    }
    return upcomingDayAndTime;
  };

  const calculateTimeLeftForSlots = () => {
    const webinarDuration = webinar?.durationInMinutes;

    const slots = webinar?.slots;

    const excludedDates = webinar?.excludedDates;

    let currentUTCDate = new Date();
    const todayUTCDate = new Date();
    let nextEventDateUTC = new Date();
    let upcomingDayAndTime;
    for (let attempt = 0; attempt < 3; attempt++) {
      upcomingDayAndTime = getNextOccurrence(
        slots,
        currentUTCDate,
        webinarDuration,
        excludedDates,
      );
      if (upcomingDayAndTime === null) {
        currentUTCDate = moment(currentUTCDate).add(7, 'days').toDate();
      } else {
        break;
      }
    }
    if (upcomingDayAndTime) {
      const [eventHourUTC, eventMinuteUTC] = upcomingDayAndTime.slot
        .split(':')
        .map(Number);
      nextEventDateUTC = moment(currentUTCDate)
        .add(upcomingDayAndTime.dayDiff, 'days')
        .toDate();
      nextEventDateUTC.setUTCHours(eventHourUTC, eventMinuteUTC, 0, 0);

      // console.log(
      //   'upcomingDayAndTime',
      //   webinar?.title,
      //   upcomingDayAndTime,
      //   nextEventDateUTC,
      // );
      let difference = nextEventDateUTC.getTime() - todayUTCDate.getTime();
      let differenceInMinutes = difference / (1000 * 60);
      if (
        differenceInMinutes > -1 * webinarDuration &&
        differenceInMinutes < 0
      ) {
        difference = 0;
        setEventTime(nextEventDateUTC);
        setShowJoin(true);
      } else if (differenceInMinutes <= 5 && differenceInMinutes > 0) {
        setEventTime(nextEventDateUTC);
        setShowJoin(true);
      } else {
        setShowJoin(false);
        setEventTime(nextEventDateUTC);
      }

      let leftTime = {
        days: Math.floor(difference / (1000 * 60 * 60) / 24),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
      leftTime.minutes = leftTime.minutes.toString().padStart(2, '0');
      leftTime.seconds = leftTime.seconds.toString().padStart(2, '0');
      setTimeLeft(leftTime);
    }
  };

  useEffect(() => {
    if (webinar) {
      let timer: string | number | NodeJS.Timeout | undefined;
      if (webinar.useSlots) {
        calculateTimeLeftForSlots();
        timer = setInterval(calculateTimeLeftForSlots, 10000);
      } else {
        calculateTimeLeft();
        timer = setInterval(calculateTimeLeft, 10000);
      }
      return () => clearInterval(timer);
    }
  }, [webinar]);

  useEffect(() => {
    if (timeLeft.days > 0) {
      setShowCountDown(false);
    } else {
      setShowCountDown(true);
    }
  }, [timeLeft]);
  let hours = timeLeft.hours > 10 ? timeLeft.hours : '0' + timeLeft.hours;
  let days = timeLeft.days > 10 ? timeLeft.days : '0' + timeLeft.days;
  return (
    <>
      {loading ? (
        <View style={[styles.container]}>
          <Shimmer width={'100%'} height={'100%'} />
        </View>
      ) : (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() =>
            navigation.navigate('WebinarHomeScreen', {
              type: type,
            })
          }
          android
          style={[
            {
              shadowOpacity: 0.18,
              shadowRadius: 3,
              shadowOffset: {
                width: 1,
                height: 3,
              },
              elevation: 12,
            },
            styles.container,
          ]}>
          <LinearGradient
            useAngle
            angle={45}
            style={styles.container}
            colors={gradientColors}>
            <View style={styles.textContainer}>
              <View>
                <Text style={[styles.primaryText, {color: textColor}]}>
                  {webinar?.title}
                </Text>
                <Text style={[styles.secondaryText, {color: textColor}]}>
                  {webinar?.timeText}
                </Text>
                <Text style={[styles.secondaryText, {color: textColor}]}>
                  {webinar?.timeInAmPm}
                </Text>
              </View>
              {showJoin ? (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('WebinarHomeScreen', {
                      type: type,
                    })
                  }
                  style={{
                    backgroundColor: Pallete.plainWhite,
                    paddingHorizontal: 6,
                    paddingVertical: 6,
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{
                      fontFamily: fonts.PrimaryJakartaBold,
                      color: Pallete.Eggplant,
                    }}>
                    Join now
                  </Text>
                </TouchableOpacity>
              ) : (
                <View style={{flexDirection: 'row'}}>
                  <CounterCard
                    textColor={textColor}
                    title={'days'}
                    content={days}
                  />
                  <CounterCard
                    textColor={textColor}
                    title={'hours'}
                    content={hours}
                  />
                  <CounterCard
                    textColor={textColor}
                    title={'mins'}
                    content={timeLeft.minutes}
                  />
                </View>
              )}
            </View>
            <View
              style={{
                position: 'absolute',
                top: 0,
                flex: 1,
                zIndex: 8,
                width: '100%',
                height: '100%',
              }}>
              <ImageWithView
                imageSource={imageLink}
                width={'100%'}
                height={'100%'}
                isLocalImage={false}
              />
            </View>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </>
  );
};

export default WebinarCounter;

const styles = StyleSheet.create({
  primaryText: {
    fontFamily: fonts.PrimaryJakartaBold,
    fontSize: 16,
  },
  secondaryText: {
    fontFamily: fonts.PrimaryJakartaBold,
    fontSize: 14,
  },
  numberText: {
    color: Pallete.Eggplant,
    fontSize: 12,
    fontFamily: fonts.SecondaryDMSansBold,
  },
  numberTextTitle: {
    color: Pallete.Eggplant,
    fontSize: 10,
    fontFamily: fonts.SecondaryDMSansBold,
  },
  container: {
    height: SCREEN_HEIGHT_WINDOW / 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 3,
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  textContainer: {
    flex: 0.6,
    alignItems: 'flex-start',
    height: '100%',
    paddingVertical: 20,
    gap: 10,
    zIndex: 100,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  counterContainer: {
    flex: 0.6,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: '100%',
    paddingVertical: 20,
  },
  numberView: {
    backgroundColor: '#FFFFFF70',
    paddingVertical: 6,
    borderRadius: 5,
    marginHorizontal: 3,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  numberContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctatext: {textDecorationLine: 'underline'},
});

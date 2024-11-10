import {
  Alert,
  FlatList,
  ImageBackground,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  GARBHSANSKAR,
  GRABHSANSKARBG,
  GradientTick,
  WEBINAR,
  WEBINARBG,
  YOGA,
  YOGABG,
} from '../../../../assets';
import {Pallete, fonts} from '../../../../theme/enum';
import WebinarDetails from '../../components/WebinarDetails';
import MainCtaComponent from '../../../../components/ButtonComponents/MainCtaComponent/MainCtaComponent';
import BackHeader from '../../../../components/MainContainer/BackHeader';
import useDataProvider from '../../../../context-store/useDataProvider';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import LoadingAnimationScreen from '../../../animations/LoadingAnimationScreen';
import Clipboard from '@react-native-clipboard/clipboard';
import LinearGradient from 'react-native-linear-gradient';
import CareTeamVideoCard from '../packages/components/CareTeamVideoCard';
import {trigger} from 'react-native-haptic-feedback';
import {options} from '../../../dashboard/navigation/BottomTabNavigation/HomeTabNavigator';
import {logEvent} from '../../../../helpers/facebook_events';
import {markWebinarJoined} from '../../../../api/homeapis';
import moment from 'moment/moment';
import {horizontalScale, verticalScale} from '../../../../helpers/layoutHelper';
import ImageWithView from '../../../../components/ImageWithView';
import GradientBackground from './components/GradientBackground';
import SvgComponent from './components/SvgComponent';
import CustomHighlightText from '../../../../components/CustomHighlightText';

const WebinarHomeScreen = ({navigation}) => {
  const route = useRoute();
  const fetchedType = route.params?.type?.toUpperCase();
  const allowedTypes = ['YOGA', 'GARBHSANSKAR', 'DAILY'];
  const type =
    fetchedType && allowedTypes.includes(fetchedType) ? fetchedType : 'WEBINAR';

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const webinarColors = {
    WEBINAR: ['#D0EFA5', '#C4E598', '#A7CD78', '#9DC56D'],
    GARBHSANSKAR: ['#FFEDC2', '#FEE3A5', '#FFD781', '#F0C273'],
    YOGA: ['#A35FD8', '#2F1253'],
  };

  const themeConfig = {
    WEBINAR: {
      imageSvg: WEBINAR,
      womenImage: WEBINARBG,
      list1: ['#5A8817', '#8BAF35', '#B4D95C'],
      list2: ['#CFED88', '#96C546'],
      startColor: '#E5F3C6',
      endColor: '#F9FBF4',
      svgPos: {
        left: -40,
        bottom: -30,
      },
    },
    GARBHSANSKAR: {
      imageSvg: GARBHSANSKAR,
      womenImage: GRABHSANSKARBG,
      list1: ['#FFBA3F', '#F9BB4C', '#F9CF83'],
      list2: ['#F9B947', '#FAD083'],
      startColor: '#FFEFCA',
      endColor: '#FFFCF5',
      svgPos: {
        left: -70,
        bottom: -80,
      },
    },
    YOGA: {
      imageSvg: YOGA,
      womenImage: YOGABG,
      list1: ['#40084F', '#4A1471', '#7D40A9'],
      list2: ['#40084F', '#7E41AA'],
      startColor: '#E9D6F9',
      endColor: '#FFFDF9',
      svgPos: {
        left: -horizontalScale(90),
        bottom: -horizontalScale(80),
      },
    },
  };

  const {width} = useWindowDimensions();

  const title = type
    ? type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()
    : 'Webinar';

  const {patientDetails} = useDataProvider();
  const [loading, setLoading] = useState(true);
  const [webinar, setWebinar] = useState();
  const [image, setImage] = useState(null);
  const [eventTime, setEventTime] = useState(new Date());
  const [showJoin, setShowJoin] = useState(false);
  const [showCountDown, setShowCountDown] = useState(false);

  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const calculateTimeLeft = () => {
    const [eventHourUTC, eventMinuteUTC] = webinar.startTime
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
          currentDayDifference = 7; // Move to the next week
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
    // if (differenceInMinutes < -1 * webinarTime) {
    //   nextEventDateLocal.setDate(nextEventDateLocal.getDate() + 1);
    //   setEventTime(nextEventDateLocal);
    //   difference = nextEventDateLocal.getTime() - currentUTCDate.getTime();
    //   setShowJoin(false);
    // } else
    if (differenceInMinutes > -1 * webinarDuration && differenceInMinutes < 0) {
      difference = 0;
      setEventTime(nextEventDateLocal);
      setShowJoin(true);
    } else if (differenceInMinutes <= 5 && differenceInMinutes > 0) {
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
      let difference = nextEventDateUTC.getTime() - todayUTCDate.getTime();
      let differenceInMinutes = difference / (1000 * 60);
      if (
        differenceInMinutes > -1 * webinarDuration &&
        differenceInMinutes < 0
      ) {
        difference = 0;
        setEventTime(nextEventDateUTC);
        setShowJoin(true);
      } else if (differenceInMinutes <= 10 && differenceInMinutes > 0) {
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

  const copyToClipboard = () => {
    Clipboard.setString(webinar?.joinLink);
    showClipboardToast();
  };

  function showClipboardToast() {
    const message = 'Link copied';
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert(message);
    }
  }

  const handleJoin = () => {
    markWebinarJoined()
      .then(res => {
        console.log(res);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      fetch(
        'https://s3.ap-south-1.amazonaws.com/everheal.nexus.prod/app/patient/webinars.json',
        {
          headers: {
            'Cache-Control': 'no-cache',
          },
        },
      )
        .then(res => {
          res.json().then(webinar_data => {
            console.log('webinar data', webinar_data.data);
            const relevantWebinar = webinar_data.data.find(
              web => web.type === type,
            );
            console.log('relevantWebinar', relevantWebinar);
            setWebinar(relevantWebinar);
            setImage(relevantWebinar.bannerImage);
          });
        })
        .catch(e => {
          console.log(e);
        });
    }, []),
  );

  useEffect(() => {
    setLoading(true);
    if (webinar) {
      let timer: string | number | NodeJS.Timeout | undefined;
      setLoading(false);
      if (webinar.useSlots) {
        calculateTimeLeftForSlots();
        timer = setInterval(calculateTimeLeftForSlots, 1000);
      } else {
        calculateTimeLeft();
        timer = setInterval(calculateTimeLeft, 1000);
      }
      return () => clearInterval(timer);
    }
  }, [webinar]);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (timeLeft.days > 0) {
      setShowCountDown(false);
    } else {
      setShowCountDown(true);
    }
  }, [timeLeft]);
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.measure((x, y, width, height) => {
        setContentHeight(y);
      });
    }
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <View
        style={{
          paddingTop: Platform.OS === 'ios' ? 50 : 0,
          position: 'absolute',
          top: 0,
          zIndex: 10,
        }}>
        <BackHeader
          title={title}
          ConditionalScreen={route}
          bgcolor="transparent"
          titleColor={type === 'YOGA' && '#fff'}
        />
      </View>
      {loading ? (
        <LoadingAnimationScreen />
      ) : (
        <ScrollView
          style={{
            flex: 1,
            position: 'relative',
          }}>
          <LinearGradient
            style={{
              width: '100%',
              height: width - verticalScale(100),
              position: 'relative',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            useAngle
            angle={45}
            colors={webinarColors[type]}>
            <View
              style={{
                maxWidth: width / 1.5,
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 300,
              }}>
              <CustomHighlightText
                fontFamily={fonts.PrimaryJakartaBold}
                fontSize={20}
                highlightColor="#fff"
                customStyles={{
                  textAlign: 'center',
                  marginRight: horizontalScale(20),
                }}
                defaultColor={type === 'YOGA' ? '#fff' : '#000'}>
                {webinar?.header_title}
              </CustomHighlightText>
            </View>
            <ImageWithView
              isLocalImage
              mode="contain"
              width={verticalScale(170)}
              height={horizontalScale(170)}
              tintColor={
                type === 'GARBHSANSKAR' || type === 'YOGA' ? '#fff' : null
              }
              imageSource={themeConfig[type].imageSvg}
              customStyle={[
                {
                  position: 'absolute',
                  transform: [
                    {
                      scale:
                        type === 'GARBHSANSKAR' && type === 'YOGA' ? 1.3 : 1,
                    },
                  ],
                },
                themeConfig[type].svgPos,
              ]}
            />
            <ImageWithView
              isLocalImage
              mode="contain"
              width={verticalScale(150)}
              height={horizontalScale(140)}
              imageSource={themeConfig[type].womenImage}
              customStyle={[
                {
                  position: 'absolute',
                  right: -35,
                  bottom: 0,
                  zIndex: 100,
                },
              ]}
            />
            <SvgComponent
              style={{
                position: 'absolute',
                right: -10,
                bottom: -10,
              }}
              gradientColors1={themeConfig[type].list1}
              gradientColors2={themeConfig[type].list2}
            />
          </LinearGradient>
          <GradientBackground
            height={contentHeight}
            startColor={themeConfig[type].startColor}
            endColor={themeConfig[type].endColor}>
            {webinar.list_of_benefits.map(item => {
              return (
                <View
                  ref={contentRef}
                  onLayout={() => {
                    if (contentRef.current) {
                      contentRef.current.measure((x, y, width, height) => {
                        setContentHeight(y);
                      });
                    }
                  }}
                  style={styles.listcontainer}>
                  <ImageWithView
                    isLocalImage
                    imageSource={GradientTick}
                    width={20}
                    height={20}
                    customStyle={{
                      marginTop: 2,
                    }}
                  />
                  <CustomHighlightText
                    fontSize={16}
                    fontFamily={fonts.PrimaryJakartaExtraBold}
                    defaultColor={Pallete.black}
                    highlightColor={Pallete.Eggplant}>
                    {item}
                  </CustomHighlightText>
                </View>
              );
            })}
          </GradientBackground>

          {showCountDown ? (
            <LinearGradient
              colors={['#fff', themeConfig[type].startColor]}
              useAngle={true}
              angle={60}
              style={{
                flexDirection: 'column',
                width: '95%',
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderWidth: 1,
                borderColor: themeConfig[type].startColor,
                borderRadius: 20,
                justifyContent: 'space-between',
                marginVertical: 12,
                alignSelf: 'center',
              }}>
              <View
                style={{
                  backgroundColor: '#fff',
                  marginTop: 5,
                  width: '100%',
                  borderWidth: 1,
                  borderColor: '#f1f1f1',
                  borderRadius: 5,
                  marginBottom: 10,
                }}>
                <Text
                  style={{
                    paddingHorizontal: 20,
                    fontSize: 16,
                    fontFamily: fonts.PrimaryJakartaMedium,
                    paddingVertical: 5,
                  }}>
                  {title} starts in
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',

                  justifyContent: 'space-around',
                }}>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 5,
                      paddingVertical: 5,
                    }}>
                    <View style={styles.numberView}>
                      <Text style={styles.numberText}>
                        {Math.floor(timeLeft.hours / 10)}
                      </Text>
                    </View>
                    <View style={styles.numberView}>
                      <Text style={styles.numberText}>
                        {timeLeft.hours % 10}
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={{
                      alignSelf: 'center',
                      paddingVertical: 10,
                      fontFamily: fonts.PrimaryJakartaBold,
                    }}>
                    Hours
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 34,
                    fontFamily: fonts.PrimaryJakartaExtraBold,
                    paddingVertical: 0,
                  }}>
                  :
                </Text>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 5,
                      paddingVertical: 5,
                    }}>
                    <View style={styles.numberView}>
                      <Text style={styles.numberText}>
                        {timeLeft.minutes.toString().substring(0, 1)}
                      </Text>
                    </View>
                    <View style={styles.numberView}>
                      <Text style={styles.numberText}>
                        {timeLeft.minutes.toString().substring(1, 2)}
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={{
                      alignSelf: 'center',
                      paddingVertical: 10,
                      fontFamily: fonts.PrimaryJakartaBold,
                    }}>
                    Minutes
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 34,
                    fontFamily: fonts.PrimaryJakartaExtraBold,
                  }}>
                  :
                </Text>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 5,
                      paddingVertical: 5,
                    }}>
                    <View style={styles.numberView}>
                      <Text style={styles.numberText}>
                        {timeLeft.seconds.toString().substring(0, 1)}
                      </Text>
                    </View>
                    <View style={styles.numberView}>
                      <Text style={styles.numberText}>
                        {timeLeft.seconds.toString().substring(1, 2)}
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={{
                      alignSelf: 'center',
                      paddingVertical: 10,
                      fontFamily: fonts.PrimaryJakartaBold,
                    }}>
                    Seconds
                  </Text>
                </View>
              </View>
            </LinearGradient>
          ) : (
            <View style={{paddingVertical: 10}} />
          )}

          {webinar !== undefined && (
            <>
              <Text
                style={{
                  paddingHorizontal: 20,
                  fontFamily: fonts.PrimaryJakartaExtraBold,
                  fontSize: 16,
                }}>
                Our team
              </Text>
              <View style={styles.careTeamView}>
                <FlatList
                  data={webinar.care_team}
                  horizontal
                  contentContainerStyle={styles.careTeamList}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({item}) => {
                    return <CareTeamVideoCard {...item} />;
                  }}
                />
              </View>
            </>
          )}

          <WebinarDetails
            webinarTime={eventTime.toString()}
            duration="50"
            webinarPlatform={'Zoom'}
          />
          <View
            style={{
              height: 50,
            }}
          />
        </ScrollView>
      )}
      <View
        style={{
          paddingHorizontal: 20,
          marginTop: 10,
          marginBottom: 5,
          position: 'absolute',
          bottom: 80,
          width: '100%',
        }}>
        <MainCtaComponent
          style={{
            paddingHorizontal: 10,
          }}
          active={showJoin}
          onClick={() => {
            logEvent('join-webinar');
            trigger('selection', options);
            handleJoin();
            Linking.openURL(webinar?.joinLink);
          }}>
          <Text>Join now</Text>
        </MainCtaComponent>
      </View>
      {showJoin ? (
        <View
          style={{
            width: '90%',
            height: 40,
            backgroundColor: '#E8F8D4',
            alignSelf: 'center',
            borderRadius: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 40,
            position: 'absolute',
            bottom: 0,
          }}>
          <View
            style={{
              width: '70%',
              height: '100%',
              alignItems: 'center',
              paddingHorizontal: 10,
              justifyContent: 'center',
            }}>
            <Text style={{width: '100%'}}>{webinar?.joinLink}</Text>
          </View>
          <TouchableOpacity
            style={{
              width: '30%',
            }}
            onPress={copyToClipboard}>
            <View
              style={{
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: Pallete.Eggplant,
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20,
              }}>
              <Text
                style={{
                  color: '#fff',
                }}>
                Copy Link
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            width: '90%',
            height: 40,
            backgroundColor: '#E8F8D4',
            alignSelf: 'center',
            borderRadius: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 40,
            position: 'absolute',
            bottom: 0,
          }}>
          <Text
            style={{
              color: '#000',
            }}>
            The link will be available 10 minutes before the session starts
          </Text>
        </View>
      )}
    </View>
  );
};

export default WebinarHomeScreen;

const styles = StyleSheet.create({
  listcontainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 30,
    paddingVertical: 12,
    gap: 5,
    marginVertical: 2,
  },
  numberText: {
    fontSize: 36,
    fontFamily: fonts.PrimaryJakartaBold,
    color: Pallete.Eggplant,
  },
  numberView: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    minWidth: 25,
  },
  careTeamList: {
    gap: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
    height: '100%',
  },
  careTeamView: {
    width: '100%',
    height: 250,
    marginBottom: 10,
    marginHorizontal: 10,
  },
});

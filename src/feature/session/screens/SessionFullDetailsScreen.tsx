import {
  Alert,
  Animated,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewToken,
} from 'react-native';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import theme, {designPalette} from '../../../theme/Theme';
import MainCtaComponent from '../../../components/ButtonComponents/MainCtaComponent/MainCtaComponent';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/SessionFlowNavigation';
import {SessionObject} from '../../../constants/types';
import RNPickerSelect from 'react-native-picker-select';

import {
  getDateTimeInfo,
  formatTime,
  formatTimeSession,
  isTimeDifferenceWithinFiveMinutes,
  convertDateToUTCStringFormatted,
  getTimeDifference,
} from '../helpers/getDatetimeValues';
import {
  getAllSlots,
  bookPersonalSessions,
  cancelSession,
  reschedulePersonalSessions,
  getAllGroupSlots,
  bookGroupSessions,
  getRoomInfo,
} from '../../../api/sessionBooking';
import Countdown from '../components/CountDown';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import BottomSheetFilter, {
  BottomSheetRefProps,
} from '../components/BottomSheetFilter';
import {
  TimeSlot,
  getTimeSlotsForDate,
  iterateDateTimeSlots,
  getFirstDate,
} from '../helpers/sessionObjectDestructuring';
import DateSession from '../components/DateSession';
import moment from 'moment';
import CancelSessionBtn from '../components/CancelSessionBtn';
import {TextInput} from 'react-native-gesture-handler';
import CancelConfirmation from '../components/CancelConfirmation';
import RescheduleConfirmation from '../components/RescheduleConfirmation';
import ActivitySucess from '../../activities/components/ActivitySucess';
import Toast from '../components/Toast';
import PrerequisiteBox from '../components/PrerequisiteBox';
import InstructorInfoComponent from '../components/InstructorInfoComponent';
import AnimatedSuccessScreen from '../components/AnimatedSuccessScreen';
import {Pallete, fonts} from '../../../theme/enum';
import PastSessionInfoComponent from '../components/PastSessionInfoComponent';
import SessionNotesComponent from '../components/SessionNotesComponent';
import {AttendeeStatus} from '../constants/sessionDetails';
import SessionDetails from '../components/SessionDetails';
import LinearGradient from 'react-native-linear-gradient';
import HighlightedBackButton from '../../../components/HighlightedBackButton';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import SessionInfoBackGroundComponent from '../components/SessionInfoBackGroundComponent';
import SessionAboutComponent from '../components/SessionAboutComponent';
import SessionPrerequisitesComponent from '../components/SessionPrerequisitesComponent';
import NotesContainerComponent from '../components/NotesContainerComponent';
import BottomSheetHeaderComponent from '../components/BottomSheetHeaderComponent';
import SessionNameInfoCard from '../components/SessionNameInfoCard';
import SecondaryHeadingTextComponent from '../../../components/TextComponents/SecondaryHeadingTextComponent';
import useDataProvider from '../../../context-store/useDataProvider';

interface Props
  extends NativeStackScreenProps<
    RootStackParamList,
    'SessionFullDetailsScreen'
  > {}
const {height: SCREEN_HEIGHT} = Dimensions.get('screen');

const SessionFullDetailsScreen: React.FC<Props> = ({route}) => {
  const navigation = useNavigation<NavigationProp<any, any>>();
  const sessionInfo: SessionObject = route?.params?.sessionObject;
  const bottomSheetRef = useRef<BottomSheetRefProps>(null);
  const onboardingRef = useRef(null);
  const [stateOfBooking, setStateOfBooking] = useState(
    sessionInfo.sessionState,
  );
  const placeHolderDate = '2023-09-09';
  const [refresh, setRefresh] = useState(0);
  const [sessionStatus, setSessionStatus] = useState(sessionInfo?.status);
  let [slots, setSlots] = useState([]);
  const [successScreen, setSuccessScreen] = useState(false);
  let [timeslots, setTimeSlots] = useState([]);
  let [fullslots, setFullSlots] = useState([]);
  let [sessionDate, setSessionDate] = useState('');
  let [visible, setVisible] = useState(false);
  let [clickedToCancel, setClickedToCancel] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>();
  let [showBookButton, setShowBookBtn] = useState(false);
  let [startTime, setTimePersonalSession] = useState('');
  let [startDate, setDatePersonalSession] = useState('');
  let [showCancelConfirm, setShowCancelConfirm] = useState(false);
  let [showSuccess, setShowSuccess] = useState(false);
  let [loading, setLoading] = useState(false);
  let [roomInfo, setRoomInfo] = useState(null);
  const [isWithinFiveMinutes, setIsWithinFiveMinutes] = useState(false);
  let [sessionStartTime, setSessionStartTime] = useState(
    sessionInfo.sessionTime,
  );
  const {patientDetails, setSessionNameInfo} = useDataProvider();
  const [sp, setSp] = useState(null);

  useEffect(() => {
    if (patientDetails) {
      let sps = patientDetails.care_team.service_providers.filter(
        s => s.id === sessionInfo.sessionCarePersonId,
      );
      if (sps && sps.length != 0) {
        setSp(sps[0]);
      }
    }
  }, [patientDetails]);

  useEffect(() => {
    console.log(new Date().toUTCString());
    // Define your target time (e.g., '2023-09-27T02:00:00Z')
    const targetTime = sessionInfo.sessionTime;
    // Function to check the time difference periodically
    console.log('akgdbhka', fullslots);

    const checkTimeDifference = () => {
      const result = isTimeDifferenceWithinFiveMinutes(targetTime);
      console.log('whether it is 5 min away', result);
      setIsWithinFiveMinutes(result);
    };
    // Run the time check every minute (adjust the interval as needed)
    const interval = setInterval(checkTimeDifference, 60000);
    checkTimeDifference();
    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);
  const takeMeBack = () => {
    navigation.goBack();
  };
  const handleBottomSheet = (scrollValue: number) => {
    bottomSheetRef?.current?.scrollTo(scrollValue);
  };

  const viewAbleItemChanged = useRef(
    ({viewableItems, changed}: {viewableItems: ViewToken[]}) => {
      console.log(changed);
      setCurrentIndex(viewableItems[0].index);
    },
  ).current;
  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;
  const bookPersonalSession = (time: string) => {
    setLoading(true);

    let formatedDate = moment(sessionDate).format('DD-MM-YYYY');
    const [day, month, year] = formatedDate.split('-');
    const [hours, minutes, seconds] = time.split(':');
    const date = new Date(+year, +month - 1, +day, +hours, +minutes, +seconds);
    if (sessionInfo.sessionType === 'Group') {
      bookGroupSessions(sessionInfo._id, convertDateToUTCStringFormatted(date))
        .then(res => {
          bottomSheetRef?.current?.scrollTo(0);
          setStateOfBooking(AttendeeStatus.BOOKED);
          setShowSuccess(true);
          setSuccessScreen(true);
          setSessionStartTime(res.data.session_start_time);
          setLoading(false);
        })
        .catch(e => {
          console.log(e.response);
          setLoading(false);
        });
    } else {
      bookPersonalSessions(
        sessionInfo._id,
        convertDateToUTCStringFormatted(date),
      )
        .then(res => {
          bottomSheetRef?.current?.scrollTo(0);
          setStateOfBooking(AttendeeStatus.BOOKED);
          setShowSuccess(true);
          setSuccessScreen(true);
          setSessionStartTime(res.data.session_start_time);
          setLoading(false);
        })
        .catch(e => {
          console.log(e.response);
          setLoading(false);
          setRefresh(refresh + 1);
        });
    }
  };
  const handleDate = (dateSession: string) => {
    setShowBookBtn(false);
    setTimePersonalSession('');
    setSessionDate(dateSession);
    setDatePersonalSession(dateSession);
    let list = getTimeSlotsForDate(fullslots, dateSession);
    setTimeSlots(list);
    bottomSheetRef?.current?.scrollTo(
      Platform.OS === 'ios' ? verticalScale(-580) : verticalScale(-620),
    );
  };
  const handleJoin = () => {
    setSessionNameInfo(sessionInfo.sessionName);
    console.log('clicked for bottom bar');
    if (sessionInfo.sessionState === AttendeeStatus.ASSIGNED) {
      bookAndRefresh();
    }
    if (
      stateOfBooking === AttendeeStatus.BOOKED ||
      stateOfBooking === AttendeeStatus.JOINED
    ) {
      if (roomInfo?.type === 'EXTERNAL') {
        Linking.openURL(roomInfo.ext_data.joinLink);
      } else {
        navigation.navigate('WelcomeScreen');
      }
    }
  };
  const handleRejection = () => {
    setClickedToCancel(true);
    bottomSheetRef?.current?.scrollTo(-350);
  };
  const onPress = useCallback(() => {
    const isActive = bottomSheetRef?.current?.isActive();
    if (isActive) {
      bottomSheetRef?.current?.scrollTo(0);
    } else {
      bottomSheetRef?.current?.scrollTo(
        Platform.OS === 'ios' ? verticalScale(-580) : verticalScale(-620),
      );
    }
  }, []);
  const handleTimeSelection = time => {
    setShowBookBtn(true);
    setTimePersonalSession(time);
  };

  useEffect(() => {
    console.log('bottomSheetRef', bottomSheetRef.current);
  }, [bottomSheetRef]);

  const bookAndRefresh = () => {
    onPress();
  };
  const handleConfirmation = () => {
    setShowCancelConfirm(true);
  };
  const reschdeuleSession = (time: string) => {
    let formatedDate = moment(sessionDate).format('DD-MM-YYYY');
    const [day, month, year] = formatedDate.split('-');
    const [hours, minutes, seconds] = time.split(':');
    const date = new Date(+year, +month - 1, +day, +hours, +minutes, +seconds);
    reschedulePersonalSessions(
      sessionInfo._id,
      convertDateToUTCStringFormatted(date),
    )
      .then(res => {
        bottomSheetRef?.current?.scrollTo(0);
        setShowSuccess(true);
        setSuccessScreen(true);
      })
      .catch(e => {
        console.log(e);
        setRefresh(refresh + 1);
      });
  };
  const handleReschedule = () => {
    bottomSheetRef.current?.scrollTo(
      Platform.OS === 'ios' ? verticalScale(-580) : verticalScale(-620),
    );
    setStateOfBooking('RESCHEDULE');
    setClickedToCancel(false);
  };
  const handleCancelSession = () => {
    cancelSession(sessionInfo._id)
      .then(() => {
        navigation.navigate('ActivityTopNavigation');
      })
      .catch(e => {
        Alert.alert('Something Went wrong ');
      });
  };

  const handleClose = () => {
    console.log('closing');
    setClickedToCancel(false);
    setStateOfBooking(sessionInfo.sessionState);
    handleBottomSheet(0);
    setShowCancelConfirm(false);
  };
  const parseDateTime = (date_time_slots: any[]): any[] => {
    let parsed_slots = [];
    // console.log('date_time_slots', date_time_slots);
    for (let date in date_time_slots) {
      let value = date_time_slots[date];
      for (let timeIndex = 0; timeIndex < value.length; timeIndex++) {
        let slot = value[timeIndex];
        let startDateTime = date + ' ' + slot.start_time;
        let endDateTime = date + ' ' + slot.end_time;
        let parsedStartTime = moment.utc(startDateTime);
        let parsedEndTime = moment.utc(endDateTime);
        let parsed_date = parsedStartTime.local().format('YYYY-MM-DD');
        let parsed_start_time = parsedStartTime.local().format('HH:mm:ss');
        let parsed_end_time = parsedEndTime.local().format('HH:mm:ss');
        let parsed_slot = {
          start_time: parsed_start_time,
          end_time: parsed_end_time,
          status: slot.status,
        };
        if (
          parsed_slots.hasOwnProperty(parsed_date) &&
          parsed_slots[parsed_date].length > 0
        ) {
          parsed_slots[parsed_date].push(parsed_slot);
        } else {
          parsed_slots[parsed_date] = [];
          parsed_slots[parsed_date].push(parsed_slot);
        }
      }
    }
    return parsed_slots;
  };

  useFocusEffect(
    React.useCallback(() => {
      getRoomInfo(sessionInfo._id).then(res => {
        console.log('roomData', res.data);
        setRoomInfo(res.data);
      });
    }, []),
  );

  useEffect(() => {
    console.log('bla bla', sessionInfo);
    if (sessionInfo.sessionType === 'Group') {
      getAllGroupSlots(sessionInfo._id).then(res => {
        let data = parseDateTime(res.data.date_time_slots);
        console.log('slots time', res.data.date_time_slots);
        setFullSlots(data);
        let temp = iterateDateTimeSlots(data);
        setSlots(temp);
        const firstDate = getFirstDate(data);
        setSessionDate(firstDate);
        setDatePersonalSession(firstDate);
        let list = getTimeSlotsForDate(data, firstDate);
        setTimeSlots(list);
      });
    } else {
      getAllSlots(sessionInfo._id).then(res => {
        let data = parseDateTime(res.data.date_time_slots);
        setFullSlots(data);
        let temp = iterateDateTimeSlots(data);
        setSlots(temp);
        const firstDate = getFirstDate(data);
        setSessionDate(firstDate);
        setDatePersonalSession(firstDate);
        let list = getTimeSlotsForDate(data, firstDate);
        setTimeSlots(list);
      });
    }

    return () => {
      setSuccessScreen(false);
    };
  }, [sessionStatus, refresh]);
  useLayoutEffect(() => {
    console.log('This Seen !!!!!!! ########', showSuccess, successScreen);
    setShowSuccess(false);
    setSuccessScreen(false);
  }, []);
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.main}>
      {showSuccess ? (
        <View style={styles.successScreenView}>
          {successScreen && (
            <AnimatedSuccessScreen
              sessionName={sessionInfo.sessionName}
              sessionTime={sessionStartTime}
              sessionCarePerson={sessionInfo.sessionCarePerson}
              onSuccessUpdated={() => {
                console.log(sessionInfo.sessionState);
                setShowSuccess(false);
                setSuccessScreen(false);
              }}
            />
          )}
        </View>
      ) : (
        <View style={styles.main}>
          <SessionInfoBackGroundComponent
            sessionCarePerson={sessionInfo.sessionCarePerson}
            sessionCategory={sessionInfo.sessionCategory}
            sessionImage={sessionInfo.sessionImage}
            sessionName={sessionInfo.sessionName}
            sessionTime={sessionStartTime}
            status={sessionInfo.status}
            navigateBack={takeMeBack}
          />
          <ScrollView style={styles.main}>
            {stateOfBooking === 'SKIPPED' && (
              <PastSessionInfoComponent
                headingMessage={'You missed this which was held on'}
                infoMessage={sessionInfo.sessionName}
                time={
                  `${moment(sessionStartTime).format('MMMM DD')}` +
                  ` at ${moment(sessionStartTime).format('H:mm A')}`
                }
              />
            )}
            <SessionDetails
              sessionTime={sessionStartTime}
              sessionType={sessionInfo.sessionType}
              duration={sessionInfo.duration}
            />
            {sessionInfo.description !== null && (
              <SessionAboutComponent
                sessionType={sessionInfo.sessionType}
                description={sessionInfo.description}
              />
            )}
            <InstructorInfoComponent
              sessionCarePersonImage={sp?.profile_image}
              sessionCarePersonId={sessionInfo.sessionCarePersonId}
              sessionCarePerson={sessionInfo.sessionCarePerson}
              sessionCategory={sp?.metadata?.designation}
            />
            <SessionPrerequisitesComponent
              prerequisites={sessionInfo.prerequisites}
            />
            {visible && <Toast />}

            {sessionInfo.notes !== null && sessionInfo.notes.length !== 0 && (
              <NotesContainerComponent notes={sessionInfo.notes} />
            )}

            {stateOfBooking !== AttendeeStatus.CANCELLED && (
              <View
                style={{
                  width: '90%',
                  alignSelf: 'center',
                }}>
                <>
                  {sessionInfo.sessionState === AttendeeStatus.BOOKED &&
                    sessionInfo.sessionStatus !== 'CANCELLED' && (
                      <MainCtaComponent
                        style={{}}
                        active={
                          getTimeDifference(sessionInfo.sessionTime) <= 10
                        }
                        onClick={handleJoin}>
                        <SecondaryHeadingTextComponent
                          text="Join"
                          color={Pallete.plainWhite}
                        />
                      </MainCtaComponent>
                    )}
                  {stateOfBooking === AttendeeStatus.JOINED && (
                    <MainCtaComponent
                      style={{}}
                      active={true}
                      onClick={handleJoin}>
                      <SecondaryHeadingTextComponent
                        text="Join"
                        color={Pallete.plainWhite}
                      />
                    </MainCtaComponent>
                  )}
                  {stateOfBooking === AttendeeStatus.ASSIGNED &&
                    sessionInfo.sessionState !== AttendeeStatus.CANCELLED && (
                      <MainCtaComponent
                        style={{}}
                        active={true}
                        onClick={handleJoin}>
                        <SecondaryHeadingTextComponent
                          text="Book"
                          color={Pallete.plainWhite}
                        />
                      </MainCtaComponent>
                    )}
                </>
              </View>
            )}

            {sessionInfo.cancellation_allowed && (
              <CancelSessionBtn rejected={handleRejection} />
            )}
          </ScrollView>
          <View />
        </View>
      )}

      <BottomSheetFilter
        maxCardHeight={-SCREEN_HEIGHT + 700}
        ref={bottomSheetRef}>
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'fff',
            padding: 10,
          }}>
          {sessionInfo.sessionState === AttendeeStatus.ASSIGNED && (
            <BottomSheetHeaderComponent
              text="Book session"
              closeSheet={() => handleBottomSheet(0)}
            />
          )}
          {stateOfBooking === AttendeeStatus.ASSIGNED && !clickedToCancel && (
            <SessionNameInfoCard
              sessionName={sessionInfo.sessionName}
              textSize={16}
            />
          )}
          {stateOfBooking === AttendeeStatus.ASSIGNED && (
            <>
              <View
                style={{
                  width: '100%',
                  height: '5%',
                  padding: 6,
                  marginTop: 5,
                }}>
                <Text
                  style={{
                    fontFamily: fonts.SecondaryDMSansMedium,
                    fontSize: 14,
                  }}>
                  Select date for a session
                </Text>
              </View>
              <View style={{height: '12%', flexDirection: 'row'}}>
                <FlatList
                  data={slots}
                  horizontal={true}
                  centerContent
                  style={{
                    flex: 3,
                    paddingHorizontal: horizontalScale(10),
                    width: '100%',
                  }}
                  contentContainerStyle={{
                    gap: 5,
                    paddingRight: 20,
                  }}
                  showsHorizontalScrollIndicator={false}
                  bounces={false}
                  viewabilityConfig={viewConfig}
                  ListFooterComponent={<View style={{width: 10}} />}
                  keyExtractor={item => item}
                  ref={onboardingRef}
                  renderItem={({item, index}: {item: any; index: number}) => (
                    <DateSession
                      key={index}
                      selected={startDate}
                      date={item}
                      onSelectDate={handleDate}
                      background={'#E8F8D4'}
                    />
                  )}
                />
              </View>
              <View
                style={{
                  width: '100%',
                  height: '5%',
                  padding: 6,
                  marginTop: 5,
                }}>
                <Text
                  style={{
                    fontFamily: fonts.SecondaryDMSansMedium,
                    fontSize: 14,
                  }}>
                  Select time for a session
                </Text>
              </View>
              <View
                style={{
                  height: '30%',
                  width: '100%',
                  marginBottom: 10,
                  alignSelf: 'center',
                }}>
                <FlatList
                  data={timeslots}
                  numColumns={4}
                  horizontal={false}
                  showsVerticalScrollIndicator={true}
                  style={{
                    flex: 1,
                    paddingHorizontal: horizontalScale(10),
                    height: '100%',
                    width: '100%',
                  }}
                  contentContainerStyle={{
                    gap: 5,
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    display: 'flex',
                    // flex: 1,
                  }}
                  showsHorizontalScrollIndicator={false}
                  bounces={false}
                  viewabilityConfig={viewConfig}
                  keyExtractor={item => item.start_time}
                  ref={onboardingRef}
                  renderItem={({
                    item,
                    index,
                  }: {
                    item: TimeSlot;
                    index: number;
                  }) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleTimeSelection(item.start_time)}
                      style={styles.timeSlotBox}>
                      <View
                        style={
                          startTime === item.start_time.toString()
                            ? styles.timeSlotSelected
                            : styles.timeSlot
                        }>
                        <View
                          style={{
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text style={{fontSize: 12}}>
                            {formatTimeSession(item.start_time, false)}
                          </Text>
                        </View>
                        {/* <View style={{width: '100%'}}>
                          <Text style={{fontSize: 12}}>{item.end_time}</Text>
                        </View> */}
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </View>
              {/* {showBookButton && ( */}
              <View
                style={{
                  height: '10%',
                  width: '95%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  paddingLeft: 15,
                  paddingBottom: 20,
                }}>
                {sessionInfo.sessionState === AttendeeStatus.ASSIGNED && (
                  <MainCtaComponent
                    active={showBookButton}
                    style={{}}
                    loading={loading}
                    onClick={() => bookPersonalSession(startTime)}>
                    Book Session
                  </MainCtaComponent>
                )}
                {stateOfBooking === 'RESCHEDULE' && (
                  <MainCtaComponent
                    active={showBookButton}
                    style={{}}
                    onClick={() => reschdeuleSession(startTime)}>
                    Reschedule Session
                  </MainCtaComponent>
                )}
              </View>
              {/* )} */}
            </>
          )}
          {stateOfBooking === 'RESCHEDULE' && (
            <>
              <BottomSheetHeaderComponent
                text="Reschedule session"
                closeSheet={handleClose}
              />
              <View
                style={{
                  width: '100%',
                  height: '5%',
                  padding: 6,
                  marginTop: 5,
                }}>
                <Text
                  style={{
                    fontFamily: fonts.SecondaryDMSansMedium,
                    fontSize: 14,
                  }}>
                  Select date for a session
                </Text>
              </View>
              <View style={{height: '12%', flexDirection: 'row'}}>
                <FlatList
                  data={slots}
                  horizontal={true}
                  centerContent
                  style={{
                    flex: 3,
                    paddingHorizontal: horizontalScale(10),
                    width: '100%',
                  }}
                  contentContainerStyle={{
                    gap: 5,
                    paddingRight: 20,
                  }}
                  showsHorizontalScrollIndicator={false}
                  bounces={false}
                  viewabilityConfig={viewConfig}
                  ListFooterComponent={<View style={{width: 10}} />}
                  keyExtractor={item => item}
                  ref={onboardingRef}
                  renderItem={({item, index}: {item: any; index: number}) => (
                    <DateSession
                      selected={startDate}
                      date={item}
                      onSelectDate={handleDate}
                      background={'#E8F8D4'}
                      key={index}
                    />
                  )}
                />
              </View>
              <View
                style={{
                  width: '100%',
                  height: '5%',
                  padding: 6,
                  marginTop: 5,
                }}>
                <Text
                  style={{
                    fontFamily: fonts.SecondaryDMSansMedium,
                    fontSize: 14,
                  }}>
                  Select time for a session
                </Text>
              </View>
              <View
                style={{
                  height: '30%',
                  width: '100%',
                  marginBottom: 10,
                  alignSelf: 'center',
                }}>
                <FlatList
                  data={timeslots}
                  numColumns={4}
                  centerContent
                  horizontal={false}
                  showsVerticalScrollIndicator={true}
                  style={{
                    flex: 1,
                    paddingHorizontal: horizontalScale(10),
                    height: '100%',
                    width: '100%',
                  }}
                  contentContainerStyle={{
                    gap: 5,
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    display: 'flex',
                    // flex: 1,
                  }}
                  showsHorizontalScrollIndicator={false}
                  bounces={false}
                  viewabilityConfig={viewConfig}
                  keyExtractor={item => item.start_time}
                  ref={onboardingRef}
                  renderItem={({item, index}: {item: TimeSlot; index}) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleTimeSelection(item.start_time)}
                      style={styles.timeSlotBox}>
                      <View
                        style={
                          startTime === item.start_time.toString()
                            ? styles.timeSlotSelected
                            : styles.timeSlot
                        }>
                        <View
                          style={{
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text style={{fontSize: 12}}>
                            {formatTimeSession(item.start_time, false)}
                          </Text>
                        </View>
                        {/* <View style={{width: '100%'}}>
                          <Text style={{fontSize: 12}}>{item.end_time}</Text>
                        </View> */}
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </View>
              {/* {showBookButton && ( */}
              <View
                style={{
                  height: '10%',
                  width: '95%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  paddingLeft: 15,
                }}>
                {sessionInfo.sessionState === AttendeeStatus.ASSIGNED && (
                  <MainCtaComponent
                    active={showBookButton}
                    style={{}}
                    onClick={() => bookPersonalSession(startTime)}>
                    Book Session
                  </MainCtaComponent>
                )}
                {stateOfBooking === 'RESCHEDULE' && (
                  <MainCtaComponent
                    active={showBookButton}
                    style={{}}
                    onClick={() => reschdeuleSession(startTime)}>
                    Reschedule Session
                  </MainCtaComponent>
                )}
              </View>
              {/* )} */}
            </>
          )}

          {clickedToCancel && (
            <>
              <BottomSheetHeaderComponent
                text="Are you sure you want to cancel this session?"
                closeSheet={handleClose}
              />
              {showCancelConfirm ? (
                <CancelConfirmation
                  onCanceled={handleCancelSession}
                  onGoBack={handleClose}
                />
              ) : (
                <RescheduleConfirmation
                  onCancelClicked={handleConfirmation}
                  onReschedule={handleReschedule}
                />
              )}
            </>
          )}
        </View>
      </BottomSheetFilter>
    </View>
  );
};

export default SessionFullDetailsScreen;

const styles = StyleSheet.create({
  timeSlotBox: {
    padding: 5,
    width: 80,
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  timeSlot: {
    backgroundColor: '#f3f3f3',
    width: '100%',
    height: '100%',
    paddingHorizontal: 5,
    borderRadius: horizontalScale(10),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#c3c3c3',
  },
  timeSlotSelected: {
    backgroundColor: '#E8F8D5',
    width: '100%',
    height: '100%',
    padding: 5,
    borderRadius: 10,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  main: {
    flex: 1,
    backgroundColor: '#fff',
  },
  successScreenView: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 40,
    paddingHorizontal: 10,
  },
});

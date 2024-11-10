import * as React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import theme, {designPalette} from '../../../theme/Theme';
import {
  Colorclock,
  Placeholder,
  SessionHomeEmpty,
  ZerosSession,
} from '../../../assets';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import UpcomingSessionListComponent from '../../dashboard/components/FlatListComponents/UpcomingSessionListComponent';
import HeaderTextComponent from '../../dashboard/components/TextHeaderComponents/HeaderTextComponents/HeaderTextComponent';
import {
  NavigationProp,
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';
import {
  bookSession,
  getAllGroupSessions,
  getAllPastBookedSessions,
  getAllPersonalSessions,
  getAllUpcomingSessionsByCategoryWithStartDate,
} from '../../../api/sessionBooking';
import {
  extractSessionInfo,
  extractSessionInfoFromTemplate,
} from '../helpers/sessionObjectDestructuring';
import BottomSheetFilter, {
  BottomSheetRefProps,
} from '../components/BottomSheetFilter';
import useDataProvider from '../../../context-store/useDataProvider';
import MainCtaComponent from '../../../components/ButtonComponents/MainCtaComponent/MainCtaComponent';
import LoadingAnimationScreen from '../../animations/LoadingAnimationScreen';
import PastSessionListComponent from '../../dashboard/components/FlatListComponents/PastSessionListComponent';
import LottieView from 'lottie-react-native';
import {RefreshControl} from 'react-native-gesture-handler';
import {Pallete, fonts} from '../../../theme/enum';
import {SessionObject} from '../../../constants/types';
import {getMonthStartEndDates} from '../helpers/getDatetimeValues';
import SessionHomeSkeleton from '../components/SessionHomeSkeleton';

const {height: SCREEN_HEIGHT} = Dimensions.get('screen');

export default function SessionHomeScreen() {
  const navigation = useNavigation<NavigationProp<any, any>>();
  const bottomSheetRef = React.useRef<BottomSheetRefProps>(null);
  const [loading, setLoading] = React.useState(false);
  const [showSuccess, SetShowSuccess] = React.useState(false);
  const [join, setJoin] = React.useState(false);
  let [sessionList, setSessionList] = React.useState<SessionObject[]>([]);
  let [unbookedSessionList, setUnbookedSessionList] = React.useState<
    SessionObject[]
  >([]);

  let [pastSessionList, setPastSessionList] = React.useState<SessionObject[]>(
    [],
  );
  const {showBottomFilter, selectedSession} = useDataProvider();

  const onRefresh = React.useCallback(() => {
    fetchData();
  }, []);
  React.useEffect(() => {
    setTimeout(() => {
      SetShowSuccess(false);
    }, 3000);
  }, [showSuccess]);

  const fetchData = () => {
    setLoading(true);
    var date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth();
    let dates = getMonthStartEndDates(m + 1, y);
    getAllUpcomingSessionsByCategoryWithStartDate([], dates.startDate)
      .then(res => {
        let allSessions: SessionObject[] = [];
        allSessions.push(...extractSessionInfo(res.data.content));
        setSessionList(allSessions);
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
      });
    // getAllPersonalSessions()
    //   .then(res => {
    //     setUnbookedSessionList(extractSessionInfo(res.data.content));
    //   })
    //   .catch(e => {
    //     console.log(e);
    //   });
    // getAllGroupSessions()
    //   .then(res => {
    //     console.log('getAllGroupSessions new', res.data);
    //     let allSessions: SessionObject[] = unbookedSessionList;
    //     allSessions.push(...extractSessionInfoFromTemplate(res.data));
    //     setUnbookedSessionList(extractSessionInfoFromTemplate(res.data));
    //   })
    //   .catch(e => {
    //     console.log(e);
    //   });
    Promise.all([getAllPersonalSessions(), getAllGroupSessions()])
      .then(([personalRes, groupRes]) => {
        const personalSessions = extractSessionInfo(personalRes.data.content);
        const groupSessions = extractSessionInfoFromTemplate(groupRes.data);
        const allSessions = [...personalSessions, ...groupSessions];
        setUnbookedSessionList(allSessions);
      })
      .catch(e => {
        console.error(e);
      });
    getAllPastBookedSessions()
      .then(res => {
        setPastSessionList(extractSessionInfo(res.data.content));
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
        setLoading(false);
      });
  };
  const onPress = React.useCallback(() => {
    const isActive = bottomSheetRef?.current?.isActive();
    if (isActive) {
      bottomSheetRef?.current?.scrollTo(0);
    } else {
      bottomSheetRef?.current?.scrollTo(-500);
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
      return () => {
        setSessionList([]);
        setPastSessionList([]);
        setUnbookedSessionList([]);
      };
    }, []),
  );
  React.useEffect(() => {
    if (showBottomFilter === 'show') {
      if (selectedSession.sessionState === 'BOOKED') {
        setJoin(true);
      }
      startSession();
    }
  }, [showBottomFilter, onPress, selectedSession]);

  const takeMeToAllSession = params => {
    navigation.navigate('AllSessionScreen', {
      filter: params,
    });
  };

  const startSession = () => {
    // navigation.navigate('WelcomeScreen', {
    //   id: selectedSession._id,
    // });
    bookSession(selectedSession._id)
      .then(res => {
        setJoin(true);
        SetShowSuccess(true);
      })
      .catch(e => {
        console.log(e);
      });
    if (join) {
      if (join) {
        navigation.navigate('WelcomeScreen', {
          id: selectedSession._id,
        });
      }
    }
  };

  return (
    <View style={stylesSessionHome.mainContainer}>
      {loading ? (
        <SessionHomeSkeleton />
      ) : (
        <>
          <ScrollView
            nestedScrollEnabled
            style={stylesSessionHome.scrollView}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={onRefresh} />
            }
            contentContainerStyle={{paddingVertical: verticalScale(2)}}>
            {sessionList?.length > 0 && sessionList !== undefined ? (
              <View style={stylesSessionHome.sessionView}>
                <HeaderTextComponent
                  mainText="Upcoming sessions"
                  callTextPresent={true}
                  callText="View all"
                  style={{}}
                  callFuntion={() => takeMeToAllSession('Upcoming')}
                />
                <UpcomingSessionListComponent
                  showCta={true}
                  sessionList={sessionList.slice(0, 6)}
                />
              </View>
            ) : (
              <View style={stylesSessionHome.noSessionsView}>
                <View style={stylesSessionHome.noSessionContainer}>
                  <Image
                    resizeMethod="resize"
                    resizeMode="contain"
                    source={SessionHomeEmpty}
                    style={{width: '100%', height: '60%'}}
                  />
                  <Text style={stylesSessionHome.noSessionText}>
                    No upcoming session
                  </Text>
                  <Text style={stylesSessionHome.noSessionMessage}>
                    Your assigned sessions will appear here where you can keep a
                    weekly track of them!
                  </Text>
                </View>
              </View>
            )}
            {unbookedSessionList?.length !== 0 &&
              unbookedSessionList !== undefined && (
                <>
                  <HeaderTextComponent
                    mainText="Schedule a session"
                    callTextPresent={true}
                    callText="View all"
                    style={{}}
                    callFuntion={() => takeMeToAllSession('Unbooked')}
                  />
                  <UpcomingSessionListComponent
                    showCta={false}
                    sessionList={unbookedSessionList.slice(0, 6)}
                  />
                </>
              )}
            {pastSessionList?.length > 0 && pastSessionList !== undefined ? (
              <View
                style={{
                  marginVertical: verticalScale(10),
                }}>
                <HeaderTextComponent
                  mainText="Past sessions"
                  callTextPresent={true}
                  callText="View all"
                  style={{}}
                  callFuntion={() => takeMeToAllSession('Past')}
                />
                <PastSessionListComponent
                  sessionList={pastSessionList.slice(0, 6)}
                />
              </View>
            ) : (
              <></>
            )}

            <View style={stylesSessionHome.placeholderView} />
          </ScrollView>
          {selectedSession !== undefined && (
            <BottomSheetFilter
              maxCardHeight={-SCREEN_HEIGHT + 900}
              ref={bottomSheetRef}>
              <View style={stylesSessionHome.scrollView}>
                <View style={stylesSessionHome.btnView}>
                  <Text style={stylesSessionHome.btnText}>
                    {join ? 'Join' : 'Book'} Session
                  </Text>
                </View>
                <View style={stylesSessionHome.bookedText}>
                  <Text style={stylesSessionHome.bookedView}>
                    {join
                      ? 'You have already booked your session.'
                      : 'You’re signing up for this session. Please confirm to be a part of it.'}
                  </Text>
                </View>

                <View style={stylesSessionHome.sessionInfoView}>
                  <View style={stylesSessionHome.sessionInfoImageView}>
                    <Image
                      source={Placeholder}
                      style={stylesSessionHome.sessionInfoImageViewAspect}
                      resizeMode="cover"
                      resizeMethod="resize"
                    />
                  </View>
                  <View style={stylesSessionHome.sessionInfoTextView}>
                    <View style={stylesSessionHome.sessionInfoNameContainer}>
                      <Text style={stylesSessionHome.sessionInfoNameText}>
                        {selectedSession.sessionName}
                      </Text>
                    </View>
                    <View
                      style={stylesSessionHome.sessionInfoCategoryContainer}>
                      <View
                        style={stylesSessionHome.sessionInfoCategoryTextView}>
                        <View style={stylesSessionHome.categoryView}>
                          <Text style={stylesSessionHome.categoryText}>
                            {selectedSession.sessionCategory}
                          </Text>
                        </View>
                        <View style={stylesSessionHome.carePersonView}>
                          <Text style={stylesSessionHome.carePersonText}>
                            {selectedSession.sessionCarePerson}
                          </Text>
                        </View>
                      </View>

                      <View style={stylesSessionHome.sessionInfoTimeView}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <View
                            style={stylesSessionHome.sessionInfoClockImageView}>
                            <Image
                              source={Colorclock}
                              resizeMethod="resize"
                              resizeMode="contain"
                              style={{width: '70%', height: '70%'}}
                            />
                          </View>

                          <Text style={stylesSessionHome.durationText}>
                            {selectedSession.duration} min
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                {showSuccess ? (
                  <View style={stylesSessionHome.successView}>
                    <View style={stylesSessionHome.scrollView}>
                      <LottieView
                        source={require('../../../assets/animations/success.json')}
                        autoPlay
                        style={{flex: 1}}
                      />
                    </View>
                  </View>
                ) : (
                  <View style={stylesSessionHome.ctaContainer}>
                    <TouchableOpacity
                      onPress={() => bottomSheetRef?.current?.scrollTo(0)}
                      style={stylesSessionHome.ctaView}>
                      <Text>Cancel</Text>
                    </TouchableOpacity>
                    <View style={{width: '40%'}}>
                      <MainCtaComponent
                        style={{padding: 8}}
                        active={true}
                        onClick={startSession}>
                        {join ? 'Join' : 'Book'}
                      </MainCtaComponent>
                    </View>
                  </View>
                )}
              </View>
            </BottomSheetFilter>
          )}
        </>
      )}
    </View>
  );
}

export const stylesSessionHome = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#fff',
    flex: 1,
  },
  scrollView: {
    backgroundColor: '#fff',
  },
  sessionView: {
    marginVertical: verticalScale(5),
    height: verticalScale(320),
    alignItems: 'center',
    justifyContent: 'center',
  },
  noSessionsView: {
    width: '100%',
    height: verticalScale(300),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Pallete.plainWhite,
  },
  noSessionContainer: {width: '70%', height: '60%'},
  noSessionText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10,
  },
  noSessionMessage: {
    fontFamily: fonts.SecondaryDMSansBold,
    fontSize: 12,
    textAlign: 'center',
  },
  placeholderView: {
    height: 100,
  },
  btnView: {
    width: '100%',
    alignItems: 'flex-start',
    padding: 10,
  },
  btnText: {fontSize: 18, fontWeight: '700'},
  bookedText: {width: '100%', alignItems: 'center', padding: 10},
  bookedView: {fontSize: 14, fontWeight: '500'},
  sessionInfoView: {
    width: '100%',
    height: '14%',
    borderRadius: 30,
    backgroundColor: '#FFF2FC',
    borderWidth: 1,
    borderColor: designPalette.primary.lightPink,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  sessionInfoImageView: {
    width: '24%',
    height: '90%',
    overflow: 'hidden',
    margin: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  ctaView: {
    width: '40%',
    height: '23%',
    borderWidth: 1,
    borderColor: '#5390D9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  ctaContainer: {
    width: '100%',
    height: '30%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
  },
  successView: {
    width: '100%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginBottom: 20,
    padding: 10,
  },
  sessionInfoImageViewAspect: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  sessionInfoTextView: {
    width: '70%',
    height: '100%',
    paddingVertical: verticalScale(3),
    alignItems: 'center',
    justifyContent: 'center',
  },
  sessionInfoNameContainer: {
    height: '25%',
    width: '100%',
    paddingHorizontal: horizontalScale(5),
  },
  sessionInfoNameText: {
    fontWeight: '800',
    fontFamily: 'PlusJakartaSans',
    fontSize: 13,
  },
  sessionInfoCategoryContainer: {
    width: '100%',
    alignSelf: 'flex-start',
    flexDirection: 'column',
    height: '60%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: 4,
  },
  sessionInfoClockImageView: {
    width: '23%',
    height: '50%',
    alignItems: 'center',
  },
  sessionInfoTimeView: {
    width: '100%',
    height: '60%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  sessionInfoCategoryTextView: {
    width: '100%',
    height: '40%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  categoryView: {
    backgroundColor: theme.colors.inputBg,
    padding: horizontalScale(5),
    borderRadius: horizontalScale(20),
  },
  categoryText: {
    fontFamily: fonts.SecondaryDMSansBold,
    color: theme.colors.cardPrimaryBackground,
    textTransform: 'uppercase',
    fontSize: 12,
  },
  carePersonView: {
    backgroundColor: theme.colors.inputBg,
    padding: horizontalScale(5),
    borderRadius: horizontalScale(20),
  },
  carePersonText: {
    fontFamily: fonts.SecondaryDMSansBold,
    color: theme.colors.cardPrimaryBackground,
    textTransform: 'uppercase',
    fontSize: 12,
  },
  durationText: {
    fontFamily: fonts.SecondaryDMSansMedium,
    fontSize: 12,
    textAlign: 'center',
    color: '#000',
  },
});

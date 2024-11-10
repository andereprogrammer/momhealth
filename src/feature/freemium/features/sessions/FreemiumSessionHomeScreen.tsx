import * as React from 'react';
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  NavigationProp,
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';

import {RefreshControl} from 'react-native-gesture-handler';
import useDataProvider from '../../../../context-store/useDataProvider';
import {SessionObject} from '../../../../constants/types';
import BottomSheetFilter, {
  BottomSheetRefProps,
} from '../../../session/components/BottomSheetFilter';
import {getMonthStartEndDates} from '../../../session/helpers/getDatetimeValues';
import {
  bookSession,
  getAllGroupSessions,
  getAllUpcomingSessionsByCategoryWithStartDate,
} from '../../../../api/sessionBooking';
import {
  extractSessionInfo,
  extractSessionInfoFromTemplate,
} from '../../../session/helpers/sessionObjectDestructuring';
import LoadingAnimationScreen from '../../../animations/LoadingAnimationScreen';
import {horizontalScale, verticalScale} from '../../../../helpers/layoutHelper';
import HeaderTextComponent from '../../../dashboard/components/TextHeaderComponents/HeaderTextComponents/HeaderTextComponent';
import UpcomingSessionListComponent from '../../../dashboard/components/FlatListComponents/UpcomingSessionListComponent';
import {SessionHomeEmpty} from '../../../../assets';
import SessionCategoryList from '../../../session/components/SessionCategoryList';
import theme, {designPalette} from '../../../../theme/Theme';
import {Pallete, fonts} from '../../../../theme/enum';
import BackHeader from '../../../../components/MainContainer/BackHeader';
import MainCtaComponent from '../../../../components/ButtonComponents/MainCtaComponent/MainCtaComponent';
import LinearGradient from 'react-native-linear-gradient';
import FreemiumSessionLoader from './components/FreemiumSessionLoader';
import LiveSessionContainer from '../../../../components/LiveSessionContainer';

const {height: SCREEN_HEIGHT} = Dimensions.get('screen');

export default function FreemiumSessionHomeScreen() {
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
    getAllGroupSessions()
      .then(res => {
        console.log('getAllGroupSessions', res.data);
        let allSessions: SessionObject[] = [];
        allSessions.push(...extractSessionInfoFromTemplate(res.data));
        setUnbookedSessionList(allSessions);
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
      });
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
      {/* <View style={[styles.headerView]}>
        <HeaderWithIconsComponent
          count={countNotification}
          scrollDistance={headerShown}
        />
      </View> */}
      {loading ? (
        <FreemiumSessionLoader />
      ) : (
        <>
          <ScrollView
            nestedScrollEnabled
            style={stylesSessionHome.scrollView}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={onRefresh} />
            }
            contentContainerStyle={{paddingVertical: verticalScale(2)}}>
            {/* {unbookedSessionList?.length > 0 && sessionList !== undefined && (
              <View style={stylesSessionHome.sessionView}>
                <HeaderTextComponent
                  mainText="Free session"
                  callTextPresent={false}
                  callText="View all"
                  style={{}}
                  callFuntion={() => takeMeToAllSession('Unbooked')}
                />
                <UpcomingSessionListComponent
                  showCta={false}
                  sessionList={unbookedSessionList}
                />
              </View>
            )}
            {sessionList?.length > 0 && sessionList !== undefined && (
              <View
                style={{
                  flex: 1,
                  paddingBottom: 10,
                  borderRadius: 20,
                }}>
                <HeaderTextComponent
                  mainText="Free session"
                  callTextPresent={false}
                  callText="View all"
                  style={{}}
                  callFuntion={() => takeMeToAllSession('Upcoming')}
                />

                <UpcomingSessionListComponent
                  showCta={false}
                  sessionList={sessionList}
                />
              </View>
            )}
            {sessionList?.length === 0 && unbookedSessionList?.length === 0 && (
              <View style={stylesSessionHome.noSessionsView}>
                <View style={stylesSessionHome.noSessionContainer}>
                  <Image
                    resizeMethod="resize"
                    resizeMode="contain"
                    source={SessionHomeEmpty}
                    style={{width: '100%', height: '60%'}}
                  />
                  <Text style={stylesSessionHome.noSessionText}>
                    Enjoyed your free session?
                  </Text>
                  <Text style={stylesSessionHome.noSessionMessage}>
                    Sign up now to unlock premium features and enjoy
                    uninterrupted access!
                  </Text>
                  <View style={stylesSessionHome.btnContainer}>
                    <LinearGradient
                      style={[stylesSessionHome.imageAspect]}
                      colors={['#8832A3', '#641C97']}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('FreemiumPackageNavigation')
                        }
                        style={stylesSessionHome.btnView}>
                        <Text style={stylesSessionHome.enrollText}>
                          Sign up
                        </Text>
                      </TouchableOpacity>
                    </LinearGradient>
                  </View>
                </View>
              </View>
            )} */}
            <LiveSessionContainer />
            <View style={{height: 30}} />
            <>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}>
                <Text
                  style={{
                    fontFamily: fonts.PrimaryJakartaBold,
                    fontSize: 16,
                    paddingHorizontal: 20,
                  }}>
                  Book a 1-on-1 personal consultation
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  marginRight: 10,
                }}>
                <SessionCategoryList orientation={false} col={2} />
              </View>
            </>
            <View
              style={{
                height: 40,
              }}
            />
          </ScrollView>
        </>
      )}
    </View>
  );
}

export const stylesSessionHome = StyleSheet.create({
  imageAspect: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  ladyView: {
    width: '30%',
    height: '100%',
    marginRight: 20,
  },
  enrollText: {
    color: '#fff',
    fontFamily: fonts.PrimaryJakartaExtraBold,
    fontSize: 14,
    width: '100%',
    alignItems: 'center',
    textAlign: 'center',
  },
  btnView: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  btnContainer: {
    width: 140,
    alignSelf: 'center',
    borderRadius: 35,
    overflow: 'hidden',
    marginVertical: 5,
  },
  mainContainer: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 0 : verticalScale(30),
  },
  scrollView: {
    backgroundColor: '#fff',
  },
  sessionView: {
    marginVertical: verticalScale(5),
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
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 5,
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

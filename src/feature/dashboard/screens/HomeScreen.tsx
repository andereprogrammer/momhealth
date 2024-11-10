import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  BackHandler,
  TouchableOpacity,
  Text,
  Animated,
  AppStateStatus,
  AppState,
} from 'react-native';
import UpcomingSessionListComponent from '../components/FlatListComponents/UpcomingSessionListComponent';
import * as amplitude from '@amplitude/analytics-react-native';
import {setGroup, setUserId} from '@amplitude/analytics-react-native';

import {
  horizontalScale,
  SCREEN_WIDTH_WINDOW,
  verticalScale,
} from '../../../helpers/layoutHelper';
import HeaderWithIconsComponent from '../../../components/HeaderWithIconsComponent';
import {LinearGradient} from 'react-native-linear-gradient';
import HeadingFontComponent from '../../../components/FontComponents/HeadingFontComponent/HeadingFontComponent';
import CareTeamCardComponent from '../components/Cards/CareTeamCardComponent';
import HeaderTextComponent from '../components/TextHeaderComponents/HeaderTextComponents/HeaderTextComponent';
import useDataProvider from '../../../context-store/useDataProvider';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  checkVersionPog,
  getActivePackages,
  getActivities,
  getAllPogWeekData,
  getHomeScreenInfo,
  getNotifications,
  getTipOfTheDay,
} from '../../../api/homeapis';
import {SessionObject, AssignedActivity} from '../../../constants/types';
import PersonalJournalComponent from '../components/Cards/PersonalJournalComponent';
import LoadingAnimationScreen from '../../animations/LoadingAnimationScreen';
import {
  getAllGroupSessions,
  getAllPersonalSessions,
  getAllUpcomingSessionsByCategoryWithStartDate,
} from '../../../api/sessionBooking';
import {
  extractSessionInfo,
  extractSessionInfoFromTemplate,
} from '../../session/helpers/sessionObjectDestructuring';
import ReportsHolderCard from '../components/Cards/ReportsHolderCard';
import {updateStatusBar} from '../components/ScreenHooks';
import ActivityListComponent from '../components/FlatListComponents/ActivityListComponent';
import {Pallete, fonts} from '../../../theme/enum';
import MoodJournalComponent from '../components/Cards/MoodJournalComponent';
import {OutputJSON, readOutputJSONFile} from '../helpers/readOutPutJson';
import {getMonthStartEndDates} from '../../session/helpers/getDatetimeValues';
import {
  logDeviceInfo,
  setupNotifications,
} from '../../../helpers/notifications';
import firebase from '@react-native-firebase/app';
import {value} from 'react-native-extended-stylesheet';
import messaging from '@react-native-firebase/messaging';
import {countNotReadNotifications} from '../../freemium/screens/FreemiumHomeScreen';
import HomeScreenSkeleton from '../components/HomeScreenSkeleton';
import GarbhBanner from '../../../components/GarbhBanner';
import HorizontalVideoList from '../../../components/HorizontalVideoList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TipOfTheDayListContainer from '../../tipoftheday/components/TipOfTheDayListContainer';
import WeekNavigator from '../../pog/components/Weeknavigator';
import KnowMoreCta from '../../pog/components/KnowMoreCta';
import POGTracker from '../../pog/components/POGTracker';
import View3dBtn from '../../pog/components/View3dBtn';
import {useSharedValue} from 'react-native-reanimated';
import PogCategoryList from '../../pog/components/PogCategoryList';
import MappedHorizontalList from '../../freemium/components/MappedHorizontalList';
import InsightCard from '../../freemium/components/InsightCard';
import {insightData} from '../../freemium/constants';
import LiveSessionContainer from '../../../components/LiveSessionContainer';
import {AnimatePresence, MotiView} from 'moti';
import PogVideoList from '../../pog/components/PogVideoList';
import PregnancyTracker from '../../../components/PregnancyTracker';
import {NOTIFICATION_POLLING_INTERVAL} from '../../../constants';
import usePogStore from '../../freemium/store/usePogDataStore';
export type Patient = {
  id: string;
  name: string;
  email: string;
  phone: string;
  dob: string;
  city: string;
  stage: string;
  blood_group: string;
  status: string;
  doctor: null | any; // Replace 'any' with the actual type of 'doctor' if needed
  profile_image: null | any; // Replace 'any' with the actual type of 'profile_image' if needed
};

export type CareTeam = {
  service_providers: any[]; // Replace 'any' with the actual type of 'service_providers' if needed
};

export type PregnancyStage = {
  trimester: number;
  pregnancy_days: number;
  desc: string;
  avg_weight: number;
  avg_height: number;
};
export type PatientTodo = {
  id: string;

  patientId: string;

  type: string;

  title: string;

  description: string;

  startDate: string;

  endDate: string;

  createdById: string;

  createdByType: string;
};

export type PatientData = {
  patient: Patient;
  care_team: CareTeam;
  pregnancy_stage: PregnancyStage;
  articles: null | any; // Replace 'any' with the actual type of 'articles' if needed
  patient_packages: any[]; // Replace 'any' with the actual type of 'patient_packages' if needed
  patient_reports: PatientReport[];
  to_dos: PatientTodo[];
  activities: PatientActivity[];
};
export type PatientReport = {
  id: string;
  title: string;
  link: string;
  content_type: string;
  report_type: string;
  created: string;
  status: string;
};
export type ActivityTag = {
  tag_type: string;
  tag_value: string;
};
export type Activity = {
  id: string;
  title: string;
  description: string;
  content_link: string;
  content_type: string;
  image_link: string;
  creator: string;
  created_by: string;
  tags: ActivityTag[];
  requirements: any;
  assignee: any;
  created: string;
  assigned_on: string;
  duration_in_minutes: number;
};
export type PatientActivity = {
  id: string;
  activity: Activity;
  assignor_type: string;
  assigned_by: string;
  status: string;
};
const HomeScreen: React.FC = () => {
  const {
    setMoodTrackerDate,
    setActivePackages,
    setPatientDetails,
    setOnboarded,
    setNotifications,
    contentTipOfDay,
    setContentTipOfDay,
    // setCurrentWeekData,
    // currentWeekData,
    freemium,
  } = useDataProvider();
  const {
    weekSelected,
    currentWeekData,
    loading: pogLoading,
    setWeekSelected,
    fetchCachedData,
    setWeekOfPregnancy,
    fetchWeekInfo,
    checkAndUpdateWeekData,
  } = usePogStore();
  const route = useRoute();
  const navigation = useNavigation<NavigationProp<any, any>>();
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [showText, setShowText] = useState('');
  const [showTipOfDay, setShowTipOfDay] = useState(false);
  const [countNotification, setCountNotification] = useState(0);
  const [data, setData] = useState<PatientData>();
  const [masterData, setMasterData] = useState([]);

  let [sessionList, setSessionList] = React.useState<SessionObject[]>();
  let [unbookedSessionList, setUnbookedSessionList] =
    React.useState<SessionObject[]>();

  let [activityList, setActivityList] = React.useState<AssignedActivity[]>();
  const [dynamicName, setDynamicName] = useState('');
  const [careCordinator, setCareCordinator] = useState(null);
  // const [weekSelected, setWeekSelected] = useState();
  const [pogWeek, setPogWeek] = useState([]);
  const navigateTo = (screenName: string) => {
    navigation.navigate(screenName);
  };
  const [visible, setVisible] = useState(0);
  const [content, setContent] = useState(0);
  const [animationDone, setAnimationDone] = useState(false);
  const [headerShown, setHeaderShown] = useState(false);
  const scrollY = useSharedValue(0);

  const getLocalStoreData = async (key: string) => {
    const jsonString = await AsyncStorage.getItem(key);
    if (jsonString !== null) {
      const jsonData = JSON.parse(jsonString);
      return jsonData;
    }
    console.log(`No data found in key : ${key}`);
  };

  // const checkStoredVersion = async () => {
  //   try {
  //     const versionApiRes = await checkVersionPog(1);
  //     const stored_version = await getLocalStoreData('pog_data_version');
  //     if (versionApiRes.data.latest_version === stored_version) {
  //       return false;
  //     } else {
  //       return true;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const storeData = async (value: any, name: string) => {
  //   try {
  //     const jsonValue = JSON.stringify(value);
  //     await AsyncStorage.setItem(name, jsonValue);
  //   } catch (e) {
  //     console.error('Error saving value to AsyncStorage', e);
  //   }
  // };

  //Pog api calls
  // const fetchPogData = () => {
  //   setLoading(true);
  //   getAllPogWeekData()
  //     .then(res => {
  //       setPogWeek(res.data.week_details);
  //       storeData(res.data.week_details, 'week_all_details');
  //       storeData(res.data.latest_version, 'pog_data_version');
  //       setLoading(false);
  //     })
  //     .catch(e => {
  //       console.log('failed to fetch pog all weeks data', e);
  //     });
  // };
  const fetchTipOfTheDay = async () => {
    try {
      const res = await getTipOfTheDay();
      setContentTipOfDay(res.data);
    } catch (e) {
      console.error('Error fetching tip of the day', e);
    }
  };
  const tipOfTheDay = async () => {
    setShowTipOfDay(!showTipOfDay);
  };
  useEffect(() => {
    logDeviceInfo();
    console.log('firebase-apps', firebase.apps);
    if (firebase.apps.length > 0) {
      setTimeout(() => {
        setupNotifications(navigation).then(value => {
          console.log('notif init done');
        });
      }, 2000);
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
      fetchTipOfTheDay();
      const onBackPress = () => {
        if (route.name === 'HomeScreen') {
          return true;
        } else {
          return false;
        }
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [route]),
  );

  const takeMeToReports = () => {
    navigateTo('ReportsFlowNavigation');
  };
  const takeMeToJournal = () => {
    navigateTo('InsightHomeScreen');
  };
  const takeMeToAllActivities = () => {
    navigation.navigate('ActivityTopNavigation', {
      screen: 'ActivityNavigation',
    });
  };
  const filterBasedOnStage = (videos: any) => {
    switch (data?.patient?.stage) {
      case 'Pregnant':
        return videos.filter(
          (vid: any) =>
            vid.type.some(
              (typeOfPregnancy: string) => typeOfPregnancy === 'PREGNANCY',
            ) &&
            (!vid.pog_weeks_excluded ||
              !vid.pog_weeks_excluded.includes(
                Math.floor(data?.pregnancy_stage?.pregnancy_days / 7),
              )),
        );
      case 'Mom':
        return videos.filter((vid: any) =>
          vid.type.some(
            (typeOfPregnancy: string) => typeOfPregnancy === 'POSTPARTUM',
          ),
        );
      case 'Preconception':
        return videos.filter((vid: any) =>
          vid.type.some((typeOfPregnancy: string) => typeOfPregnancy === 'PRE'),
        );
    }
  };

  const takeMeToAllSession = (params: string) => {
    navigation.navigate('AllSessionScreen', {
      filter: params,
    });
  };
  const getFreemiumData = () => {
    fetch(
      'https://s3.ap-south-1.amazonaws.com/everheal.nexus.prod/app/patient/home.json',
      {
        headers: {
          'Cache-Control': 'no-cache',
        },
      },
    )
      .then(res => {
        res.json().then(freemium_data => {
          setMasterData(freemium_data.data);
        });
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    let sp = data?.care_team.service_providers.filter(
      s => s.type === 'Lead',
    )[0];
    setCareCordinator(sp);
  }, [data]);

  useEffect(() => {
    getActivePackages()
      .then(packages => {
        console.log('getActivePackages', packages);
        setActivePackages(packages.data);
      })
      .catch(reason => {
        console.log('getActivePackages error', reason);
      });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setShowText('There are 4 Must do to Complete !');
    }, 3000);
  }, [completed]);

  // const fetchCachedData = async () => {
  //   setLoading(true);
  //   try {
  //     const stored_week_data = await getLocalStoreData('week_all_details');
  //     let checkForUpdates = await checkStoredVersion();
  //     if (stored_week_data && !checkForUpdates) {
  //       console.log('The pog data was fetched from cache');
  //       setPogWeek(stored_week_data);
  //       setLoading(false);
  //     } else {
  //       console.log('The pog data needed an update making the api call');
  //       fetchPogData();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const setWeek = (week: number) => {
    if (week !== weekSelected) {
      setWeekSelected(week);
      setWeekOfPregnancy(week);
    }
  };
  useEffect(() => {
    fetchCachedData();
  }, []);

  useEffect(() => {
    fetchWeekInfo();
  }, []);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        checkAndUpdateWeekData();
      }
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
    };
  }, [checkAndUpdateWeekData]);

  // useEffect(() => {
  //   //Side effects when week is changed from the navigator

  //   let currentWeekDetails = pogWeek.filter(x => x.week === weekSelected);
  //   setCurrentWeekData(currentWeekDetails[0]);

  //   console.log(currentWeekDetails, weekSelected);
  // }, [weekSelected, pogWeek]);

  function fetchData() {
    setLoading(true);
    getHomeScreenInfo()
      .then(res => {
        if (res.data) {
          setData(res.data);
          setPatientDetails(res.data);
          let currentPatientWeek = res.data.pog_week_detail.week;
          setUserId(res.data.patient.id);
          setGroup('type', res.data.patient.stage);
          setGroup('status', res.data.patient.status);
          if (res.data.patient.name.split(' ').length > 1) {
            setDynamicName(res.data?.patient.name.split(' ')[0]);
          } else {
            setDynamicName(res.data?.patient.name);
          }
          let currentDate = new Date();
          setMoodTrackerDate(currentDate);
          setOnboarded(true);
          // if (currentPatientWeek) {
          //   setWeekSelected(currentPatientWeek);
          // }
          setLoading(false);
        }
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });

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
    Promise.all([getAllPersonalSessions(), getAllGroupSessions()])
      .then(([personalRes, groupRes]) => {
        const personalSessions = extractSessionInfo(personalRes.data.content);
        const groupSessions = extractSessionInfoFromTemplate(groupRes.data);
        const allSessions = [...personalSessions, ...groupSessions];
        setUnbookedSessionList(allSessions);
      })
      .catch(e => {
        console.log(e);
      });
    getActivities('status=ASSIGNED')
      .then(res => {
        setActivityList(res.data.content);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch(e => {
        setLoading(false);
        console.log('Exception in get activities', e);
      });
  }

  useLayoutEffect(() => {
    updateStatusBar(route.name);
  });

  const onRefresh = () => {
    fetchData();
  };

  useEffect(() => {
    console.log('rendered');
    getFreemiumData();
    fetchData();
    return () => {
      setUnbookedSessionList([]);
      setSessionList([]);
      setActivityList([]);
      setWeekSelected(undefined);
    };
  }, []);
  const openVideo = (link: string) => {
    navigation.navigate('VideoScreen', {
      url: link,
    });
  };

  return (
    <View style={styles.homeContainer}>
      {loading && pogLoading ? (
        <HomeScreenSkeleton />
      ) : (
        <>
          <View style={[styles.headerView]}>
            <HeaderWithIconsComponent
              count={countNotification}
              scrollDistance={headerShown}
            />
          </View>

          <Animated.ScrollView
            nestedScrollEnabled
            onScroll={event => {
              const scrolling = event.nativeEvent.contentOffset.y;

              if (scrolling > 55) {
                setHeaderShown(true);
              } else {
                setHeaderShown(false);
              }
            }}
            style={styles.scrollView}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={onRefresh} />
            }>
            <TipOfTheDayListContainer
              tipOfTheDayContent={contentTipOfDay}
              handleCard={tipOfTheDay}
            />
            <PregnancyTracker
              animationDone={animationDone}
              freemium={freemium}
              weekSelected={weekSelected}
              setWeek={setWeek}
              currentWeekData={currentWeekData}
            />

            {currentWeekData?.week_data?.pog_videos && (
              <MotiView
                delay={100}
                from={{translateY: 0}}
                animate={{translateY: visible}}
                exit={{translateY: 0}}
                key={currentWeekData?.week_data?.pog_videos[0]?.video_link}
                transition={{type: 'timing', duration: 1000}}
                onDidAnimate={(
                  styleProp,
                  didAnimationFinish,
                  maybeValue,
                  {attemptedValue},
                ) => {
                  console.log('[moti]', styleProp, didAnimationFinish); // [moti], opacity, true

                  if (styleProp === 'translateY' && didAnimationFinish) {
                    console.log(
                      'did animate translation to: ' + attemptedValue,
                    );
                    if (attemptedValue === -370) {
                      setAnimationDone(true);
                      setContent(-40);
                    }
                  }
                }}>
                <AnimatePresence exitBeforeEnter>
                  {!animationDone && (
                    <PogVideoList
                      defaultWeek={weekSelected}
                      weekUpdate={setWeek}
                      pogForWeekList={currentWeekData?.week_data?.pog_videos}
                      openVideo={openVideo}
                      key={'!@#$@$%'}
                    />
                  )}
                </AnimatePresence>
              </MotiView>
            )}
            <MotiView
              delay={100}
              from={{translateY: 0}}
              animate={{translateY: content}}
              exit={{translateY: 0}}
              transition={{type: 'timing', duration: 1000}}>
              <View style={styles.pregnancyWeek}>
                {/* <HeadingFontComponent style={{}}>
                  Pregnancy week {weekSelected}
                </HeadingFontComponent> */}
                {/* <PogCategoryList /> */}
                <MappedHorizontalList
                  renderItem={item => <InsightCard {...item} />}
                  title="How can we help?"
                  data={insightData}
                />
              </View>
            </MotiView>

            {data?.patient?.stage !== 'Pregnant' ? (
              <>
                {masterData.videos !== undefined ? (
                  <HorizontalVideoList
                    pregnancyStageText="Pregnancy wellness guide"
                    momStageText="Mother and child wellness guide"
                    stage={data?.patient?.stage}
                    videos={filterBasedOnStage(masterData.videos)}
                  />
                ) : null}
                {masterData.show_yoga_videos &&
                data?.patient?.stage !== 'Pregnant' ? (
                  <HorizontalVideoList
                    pregnancyStageText="Yoga for your needs"
                    momStageText="Yoga for your needs"
                    stage={data?.patient?.stage}
                    videos={filterBasedOnStage(masterData.yoga_videos)}
                  />
                ) : null}
              </>
            ) : null}
            {sessionList?.length > 0 && sessionList !== undefined && (
              <View
                style={{
                  marginVertical: verticalScale(5),
                  flex: 1,
                  paddingBottom: 10,
                  borderRadius: 20,
                }}>
                <HeaderTextComponent
                  mainText="Upcoming sessions"
                  callTextPresent={true}
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
                    sessionList={unbookedSessionList}
                  />
                </>
              )}

            {activityList?.length !== 0 && activityList !== undefined && (
              <View
                style={{
                  marginVertical: verticalScale(5),
                  flex: 1,
                  paddingBottom: 10,
                  borderRadius: 20,
                }}>
                <HeaderTextComponent
                  mainText="Your activities"
                  callTextPresent={true}
                  callText="View all"
                  style={{}}
                  callFuntion={takeMeToAllActivities}
                />
                <ActivityListComponent
                  showCta={false}
                  sessionList={activityList.slice(0, 6)}
                />
              </View>
            )}
            <LiveSessionContainer />
            <View style={{height: 20}} />

            <HeaderTextComponent
              mainText="Reports and prescriptions"
              callTextPresent={true}
              callText="View all"
              callFuntion={takeMeToReports}
              style={{color: Pallete.darkBlack, marginTop: 0, paddingTop: 0}}
            />
            <>
              {data?.patient_reports.length === 0 ? (
                <View style={styles.personalJournalCard}>
                  <PersonalJournalComponent />
                </View>
              ) : (
                <View style={styles.activityView}>
                  {data?.patient_reports.slice(0, 3).map((value, index) => {
                    return <ReportsHolderCard key={index} report={value} />;
                  })}
                </View>
              )}
            </>
            <HeaderTextComponent
              mainText="Journal"
              callTextPresent={true}
              callText="View all"
              callFuntion={takeMeToJournal}
              style={{color: Pallete.darkBlack}}
            />
            <View style={[styles.personalJournalCard, {padding: 0, margin: 0}]}>
              <MoodJournalComponent />
            </View>

            <View style={{height: verticalScale(200)}} />
          </Animated.ScrollView>
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  pregnancyWeek: {
    backgroundColor: '#ffe4fd',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  main: {
    paddingVertical: horizontalScale(10),
    backgroundColor: Pallete.homeBgColor,
    margin: 5,
    flex: 1,
  },
  activityView: {
    backgroundColor: Pallete.plainWhite,
    borderRadius: horizontalScale(20),
    marginHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(10),
    gap: 10,
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  placeholderView: {
    height: verticalScale(25),
    borderTopLeftRadius: horizontalScale(20),
    borderTopRightRadius: horizontalScale(20),
    backgroundColor: Pallete.homeBgColor,
    zIndex: 0,
  },
  coverView: {
    paddingLeft: 10,
    gap: 5,
    paddingHorizontal: horizontalScale(10),
  },
  careTeamView: {
    height: verticalScale(90),
    position: 'absolute',
    top: verticalScale(80),
    width: '90%',
    left: horizontalScale(20),
    right: 0,
    zIndex: 10,
  },
  checkInText: {
    textDecorationLine: 'underline',
    color: Pallete.plainWhite,
    fontFamily: fonts.PrimaryJakartaBold,
    paddingLeft: horizontalScale(10),
  },
  headingView: {
    paddingVertical: horizontalScale(20),
    paddingHorizontal: horizontalScale(19),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerView: {
    position: 'absolute',
    marginBottom: verticalScale(3),
    top: 0,
    zIndex: 100,
  },
  scrollView: {
    flex: 1,
    backgroundColor: Pallete.homeBgColor,
  },
  homeContainer: {
    flex: 1,
  },
  personalJournalCard: {
    height: verticalScale(90),
    width: '100%',
  },
  pogContainer: {
    width: SCREEN_WIDTH_WINDOW / 1.3,
    height: SCREEN_WIDTH_WINDOW / 1.3,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: SCREEN_WIDTH_WINDOW / 1.2 / 2,
    overflow: 'hidden',
    position: 'relative',
  },
});
export default HomeScreen;

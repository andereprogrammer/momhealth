import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  RefreshControl,
  BackHandler,
  useWindowDimensions,
  FlatList,
  AppStateStatus,
  AppState,
} from 'react-native';
import {
  horizontalScale,
  SCREEN_HEIGHT_WINDOW,
  SCREEN_WIDTH_WINDOW,
  verticalScale,
} from '../../../helpers/layoutHelper';
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
  getMasterclassBannerDetails,
  getNotifications,
  getTipOfTheDay,
} from '../../../api/homeapis';
import {AssignedActivity} from '../../../constants/types';

import {updateStatusBar} from '../../dashboard/components/ScreenHooks';
import {Pallete, fonts} from '../../../theme/enum';
import {
  logDeviceInfo,
  setupNotifications,
} from '../../../helpers/notifications';
import firebase from '@react-native-firebase/app';
import HeaderWithIconsComponent from '../../../components/HeaderWithIconsComponent';

import FreemiumActivityList from '../components/FreemiumActivityList';

import {setGroup, setUserId, track} from '@amplitude/analytics-react-native';
import {trigger} from 'react-native-haptic-feedback';
import {options} from '../../dashboard/navigation/BottomTabNavigation/HomeTabNavigator';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import AsyncStorage from '@react-native-async-storage/async-storage';
import FreemiumSkeletonLoader from '../components/FreemiumSkeletonLoader';
import HorizontalVideoList from '../../../components/HorizontalVideoList';

import NotActiveButton from '../components/NotActiveButton';
import {insightData, pregnancy_care_services} from '../constants';
import TestimonialsList from '../components/TestimonialsList';
import View3dBtn from '../../pog/components/View3dBtn';
import {logAppsFlyerEvent} from '../../../helpers/appsFlyer';
import {tr} from 'date-fns/locale';
import PogCategoryList from '../../pog/components/PogCategoryList';
import MappedHorizontalList from '../components/MappedHorizontalList';
import InsightCard from '../components/InsightCard';
import PogVideoList from '../../pog/components/PogVideoList';
import {AnimatePresence, MotiView} from 'moti';
import HeadingFontComponent from '../../../components/FontComponents/HeadingFontComponent/HeadingFontComponent';
import HeaderTextComponent from '../../dashboard/components/TextHeaderComponents/HeaderTextComponents/HeaderTextComponent';
import PackageOfferingIcon from '../components/PackageOfferingIcon';
import PregnancyTracker from '../../../components/PregnancyTracker';
import LiveSessionContainer from '../../../components/LiveSessionContainer';
import Shimmer from '../../../components/SkeletonComponent/Shimmer';
import MasterclassBanner from '../../../components/MasterclassBanner';
import usePogStore from '../store/usePogDataStore';
import {
  NOTIFICATION_BELL_RINGING_DURATION,
  NOTIFICATION_POLLING_INTERVAL,
} from '../../../constants';
import {NotificationIconStatusType} from '../../../components/NotifyIcon';
import DiagnosticCard from '../components/DiagnosticCard';
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
  doctor: null | any;
  profile_image: null | any;
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
export function countNotReadNotifications(notifications: any): number {
  return notifications.filter(
    notification => notification.status === 'NOT_READ',
  ).length;
}
const FreemiumHomeScreen: React.FC = () => {
  const route = useRoute();

  const {
    setMoodTrackerDate,
    setActivePackages,
    setOnboarded,
    contentTipOfDay,
    setContentTipOfDay,
    setNotifications,
    patientDetails,
    freemium,
    setPatientDetails,
    countNotification,
    setCountNotification,
  } = useDataProvider();

  const navigation = useNavigation<NavigationProp<any, any>>();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<PatientData>();
  let [activityList, setActivityList] = React.useState<AssignedActivity[]>();
  const [dynamicName, setDynamicName] = useState('');
  const [masterData, setMasterData] = useState([]);
  const [showWebinar, setShowWebinar] = useState(false);
  const [masterclassData, setMasterclassData] = useState<any>({});
  const [masterclassLoading, setMasterclassLoading] = useState(false);
  const [masterclassError, setMasterclassError] = useState(false);

  const [visible, setVisible] = useState(0);
  const [content, setContent] = useState(0);
  const [animationDone, setAnimationDone] = useState(false);
  const [headerShown, setHeaderShown] = useState(false);
  const [showMomPage, setShowMomPage] = useState(false);
  const scrollY = useSharedValue(0);
  const {height} = useWindowDimensions();

  const navigateTo = (screenName: string) => {
    navigation.navigate(screenName);
  };
  const [notificationBellRingingStatus, setNotificationBellRingingStatus] =
    useState<NotificationIconStatusType>('RESET');
  //Pog api calls

  const getOnboardStatus = async () => {
    const jsonString = await AsyncStorage.getItem('onboarded');
    if (jsonString !== null) {
      const jsonData = JSON.parse(jsonString);
      return jsonData;
    }
    console.log('No data found');
  };
  const fetchStatus = async () => {
    const status = await getOnboardStatus();
    if (!status) {
      setTimeout(() => navigation.navigate('PopUpPackageOfferingScreen'), 6000);
    }
  };

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

  const setWeek = (week: number) => {
    if (week !== weekSelected) {
      setWeekSelected(week);
      setWeekOfPregnancy(week);
    }
  };

  //TIP of the day fetch calls
  getTipOfTheDay()
    .then(res => {
      return res;
    })
    .catch(e => {
      console.log('tip of the day here', e);
      return;
    });

  const fetchTipOfTheDay = async () => {
    try {
      const res = await getTipOfTheDay();
      if (res.data) {
        setContentTipOfDay(res.data);
      }
      console.log(' fetching tip of the day', res.data);
    } catch (e) {
      console.error('Error fetching tip of the day', e);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchStatus();
      fetchTipOfTheDay();
      console.log('This is here', pogLoading, loading);

      const onBackPress = () => {
        if (route.name === 'FreemiumHomeScreen') {
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

  useEffect(() => {
    getActivePackages().then(packages => {
      setActivePackages(packages.data);
    });
  }, []);

  const fetchData = useCallback(() => {
    getHomeScreenInfo()
      .then(res => {
        if (res.data) {
          setData(res.data);
          setPatientDetails(res.data);
          setUserId(res.data.patient.id);
          setGroup('type', res.data.patient.stage);
          setGroup('status', res.data.patient.status);
          setLoading(false);
          if (res.data.patient.stage !== 'Pregnant') {
            setShowMomPage(true);
          }
          let currentDate = new Date();
          setMoodTrackerDate(currentDate);
          setOnboarded(true);
        }
      })
      .catch(error => {
        setLoading(false);
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
    getMasterclassBannerDetails()
      .then(res => {
        setMasterclassData(res.data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch(e => {
        setLoading(false);
      });
  }, []);

  useLayoutEffect(() => {
    updateStatusBar(route.name);
  });

  const onRefresh = () => {
    trigger('impactLight', options);
    fetchData();
    scrollY.value = 0;
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

  useEffect(() => {
    setShowWebinar(patientDetails?.patient?.stage === 'Pregnant');
  }, [patientDetails, masterData]);

  useEffect(() => {
    track('freemium_home_loaded');
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
    getFreemiumData();
    fetchData();
    setVisible(0);
    setContent(0);
    setAnimationDone(false);
    setHeaderShown(false);
    return () => {
      setActivityList([]);
    };
  }, []);

  const handleScroll = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y;
    },
    onEndDrag: () => {
      scrollY.value = withTiming(0, {duration: 1500});
    },
  });

  const openVideo = (link: string) => {
    navigation.navigate('VideoScreen', {
      url: link,
    });
  };

  const navigateToMasterclassScreen = () => {
    navigation.navigate('MasterclassScreen');
  };

  // const moveUpAnimation = useAnimationState({
  //   static: {
  //     translateY: 0,
  //   },
  //   moveUp: {
  //     translateY: -200,
  //   },
  //   MoveDown: {
  //     translateY: 0,
  //   },
  // });

  // const toggle = () => {
  //   if (visible === -370 && content === -40) {
  //     setVisible(0);
  //     setContent(0);
  //     setAnimationDone(false);
  //   } else {
  //     setVisible(-370);
  //   }
  // };

  // useEffect(() => {
  //   setNotificationBellRingingStatus('PLAY');
  //   const timeoutId = setTimeout(() => {
  //     setNotificationBellRingingStatus('RESET');
  //   }, NOTIFICATION_BELL_RINGING_DURATION);
  //
  //   return () => clearInterval(timeoutId);
  // }, [countNotification]);

  return (
    <View style={styles.homeContainer}>
      {loading ? (
        <FreemiumSkeletonLoader />
      ) : (
        <>
          <View style={[styles.headerView]}>
            <HeaderWithIconsComponent
              count={countNotification}
              scrollDistance={headerShown}
              // notificationIconStatus={notificationBellRingingStatus}
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
            {!loading && !pogLoading && !showMomPage ? (
              <>
                <PregnancyTracker
                  animationDone={true}
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
                          pogForWeekList={
                            currentWeekData?.week_data?.pog_videos
                          }
                          openVideo={openVideo}
                          key={'!@#$@$%'}
                        />
                      )}
                    </AnimatePresence>
                  </MotiView>
                )}
                {!masterclassLoading && !masterclassError && (
                  <View style={styles.masterclassBannerContainer}>
                    <MasterclassBanner
                      id={masterclassData.id}
                      title={masterclassData.title}
                      date={masterclassData.date}
                      startTime={masterclassData.start_time}
                      endTime={masterclassData.end_time}
                      hostName={masterclassData.host_name}
                      hostDesignation={masterclassData.host_designation}
                      hostCredentials={masterclassData.host_credentials}
                      bannerImageUrl={masterclassData.banner_image_url}
                      hostImageUrl={masterclassData.host_image_url}
                      recordedMeetingUrl={masterclassData.meeting_link}
                      videoDuration={masterclassData.video_duration}
                      staticBanner={masterclassData === ''}
                    />
                  </View>
                )}
                <MotiView
                  delay={100}
                  from={{translateY: 0}}
                  animate={{translateY: content}}
                  exit={{translateY: 0}}
                  transition={{type: 'timing', duration: 1000}}>
                  <LiveSessionContainer />

                  <View style={styles.pregnancyWeek}>
                    <MappedHorizontalList
                      renderItem={item => <InsightCard {...item} />}
                      title="Pregnancy care"
                      data={insightData}
                    />
                    {masterData?.show_diagnostic_videos && (
                      <MappedHorizontalList
                        renderItem={item => (
                          <DiagnosticCard
                            openVideo={openVideo}
                            title={item.title}
                            thumbnail={item.thumbnail}
                            video_link={item.video_link}
                          />
                        )}
                        title={masterData?.diagnostic_videos_title}
                        data={masterData?.diagnostic_videos}
                      />
                    )}
                  </View>
                </MotiView>
              </>
            ) : (
              <>
                {!showMomPage ? (
                  <Shimmer
                    width={SCREEN_WIDTH_WINDOW}
                    height={SCREEN_HEIGHT_WINDOW / 1.2}
                  />
                ) : null}
              </>
            )}

            {showMomPage ? (
              <>
                <View style={{height: verticalScale(100)}} />
                <View style={styles.pregnancyCareSpacing}>
                  <View style={styles.pregnancyCareContainer}>
                    <HeaderTextComponent
                      mainText="Pregnancy care program"
                      callTextPresent={false}
                      style={{flex: 1}}
                    />
                    <NotActiveButton clickFn={() => {}} />
                  </View>
                  <FlatList
                    data={pregnancy_care_services}
                    horizontal
                    style={{
                      flex: 1,
                    }}
                    contentContainerStyle={styles.spacingCon}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) => {
                      return (
                        <PackageOfferingIcon
                          navigation={navigation}
                          source={item.image}
                          name={item.name}
                        />
                      );
                    }}
                  />
                </View>
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
                {activityList?.length !== 0 && activityList !== undefined && (
                  <>
                    <HeaderTextComponent
                      mainText="Essential activities for you"
                      callTextPresent={false}
                    />
                    <View style={styles.spacing}>
                      <FreemiumActivityList
                        showCta={false}
                        sessionList={activityList}
                      />
                    </View>
                  </>
                )}
              </>
            ) : null}
            <HeaderTextComponent
              mainText="Testimonials"
              callTextPresent={false}
            />
            {masterData?.testimonials !== undefined ? (
              <TestimonialsList testimonials={masterData.testimonials} />
            ) : null}

            <View style={{height: verticalScale(100)}} />
          </Animated.ScrollView>
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  spacingCon: {
    paddingHorizontal: 9,
    paddingVertical: 10,
  },
  pregnancyWeek: {
    backgroundColor: '#ffe4fd',
    paddingVertical: 10,
  },
  pogContainer: {
    width: SCREEN_WIDTH_WINDOW,
    height: SCREEN_WIDTH_WINDOW / 0.82,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    overflow: 'hidden',
    position: 'relative',
    flex: 1,
    transform: [{scaleX: 0.5}],
  },
  pregnancyCareContainer: {
    width: '100%',
    paddingVertical: verticalScale(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 20,
  },
  pregnancyCareSpacing: {
    flex: 1,
    paddingBottom: 10,
    borderRadius: 20,
  },
  parent: {
    width: '100%',
    transform: [{scaleX: 2}],
    borderBottomStartRadius: 200,
    borderBottomEndRadius: 200,
    overflow: 'hidden',
  },
  child: {
    flex: 1,
    transform: [{scaleX: 0.5}],

    backgroundColor: 'yellow',
    alignItems: 'center',
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
  switch: {
    width: 60,
    height: 20,
    position: 'absolute',
    bottom: 10,
    right: -180,
  },
  checkInText: {
    textDecorationLine: 'underline',
    color: Pallete.plainWhite,
    fontFamily: fonts.PrimaryJakartaBold,
    paddingLeft: horizontalScale(10),
  },
  headingView: {
    flex: 1,
    paddingHorizontal: horizontalScale(20),
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerView: {
    position: 'absolute',
    marginBottom: verticalScale(3),
    top: 0,
    zIndex: 100,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'rgba(255, 241, 252, 0.7)',
  },
  homeContainer: {
    flex: 1,
  },
  personalJournalCard: {
    height: verticalScale(90),
    width: '100%',
  },

  spacing: {
    flex: 1,
    borderRadius: 20,
    paddingLeft: 24,
  },

  masterclassBannerContainer: {
    marginTop: verticalScale(12),
    marginBottom: verticalScale(16),
    paddingHorizontal: horizontalScale(16),
  },
});
export default FreemiumHomeScreen;

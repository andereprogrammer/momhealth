import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Video from 'react-native-video';
import {SCREEN_WIDTH_WINDOW, verticalScale} from '../helpers/layoutHelper';
import WeekNavigator from '../feature/pog/components/Weeknavigator';
import NumberSlider from '../feature/pog/components/NumberSlider';
import POGTracker from '../feature/pog/components/POGTracker';
import View3dBtn from '../feature/pog/components/View3dBtn';
import Shimmer from './SkeletonComponent/Shimmer';
import s from '../styles/GlobalStyles';
import {fonts, Pallete} from '../theme/enum';
import {MotiView} from 'moti';
import usePogStore from '../feature/freemium/store/usePogDataStore';
import BoldText from './BoldText';
import WeekNavigationList from '../feature/pog/components/WeekNavigationList';
import PogVideoList from '../feature/pog/components/PogVideoList';
import WeeklyVideos from '../feature/pog/components/WeeklyVideos';

type Props = {
  animationDone: boolean;
  currentWeekData: any;
  weekSelected: number;
  setWeek: (week: number) => void;
  freemium: boolean;
};

const PregnancyTracker = ({
  animationDone = true,
  currentWeekData,
  weekSelected,
  setWeek,
  freemium,
}: Props) => {
  const {currentWeek, fetchWeekInfo, pog_days} = usePogStore();
  const [loading, setLoading] = useState(false);
  function convertDaysToWeeksAndDays(totalDays) {
    const weeks = Math.floor(totalDays / 7);
    const days = totalDays % 7;
    return `${weeks} week${weeks !== 1 ? 's' : ''} ${days} day${
      days !== 1 ? 's' : ''
    }`;
  }
  const openVideo = (link: string) => {
    navigation.navigate('VideoScreen', {
      url: link,
    });
  };
  return (
    <>
      {loading ? (
        <View
          style={{
            width: SCREEN_WIDTH_WINDOW,
            height: SCREEN_WIDTH_WINDOW / 0.82,
            backgroundColor: '#f1f1f1',
          }}>
          <View style={{marginTop: verticalScale(90)}}>
            <Shimmer width={'100%'} height={'30%'} />
          </View>
          <View
            style={{
              width: 150,
              height: 150,
              borderRadius: 75,
              alignSelf: 'center',
              overflow: 'hidden',
            }}>
            <Shimmer width={'100%'} height={'100%'} />
          </View>
          <View
            style={{marginTop: 20, alignSelf: 'center', height: 30, width: 70}}>
            <Shimmer width={'100%'} height={'100%'} />
          </View>
        </View>
      ) : (
        <MotiView
          from={{translateY: -SCREEN_WIDTH_WINDOW, opacity: 0.2}}
          animate={{translateY: 1, opacity: 1}}
          transition={{type: 'timing', duration: 600}}>
          <View style={styles.parent}>
            <View
              style={[
                styles.pogContainer,
                s.positionRelative,
                {
                  backgroundColor: animationDone
                    ? 'rgba(0, 0, 0, 0.4)'
                    : 'transparent',
                },
              ]}>
              <View
                style={[
                  s.selfCenter,
                  {
                    top: verticalScale(75),
                    zIndex: 1000000,
                  },
                  s.positionAbsolute,
                  s.mb1,
                ]}>
                <BoldText
                  style={{
                    color: Pallete.Eggplant,
                    fontFamily: fonts.SecondaryDMSansMedium,
                    fontSize: 16,
                  }}
                  text={`You're ${convertDaysToWeeksAndDays(
                    pog_days,
                  )} pregnant!`}
                  boldText={`${convertDaysToWeeksAndDays(pog_days)}`}
                />
              </View>
              {!animationDone && (
                <POGTracker
                  week={weekSelected}
                  link={currentWeekData?.week_data?.preview_video_link}
                />
              )}

              {/* {!animationDone && (
                <WeekNavigator
                  pog_week={weekSelected}
                  selectedWeekNumber={setWeek}
                />
              )} */}
              {animationDone && (
                <WeekNavigationList
                  pog_week={weekSelected}
                  selectedWeekNumber={setWeek}
                />
              )}
              {!animationDone && (
                <View style={styles.sliderPos}>
                  <NumberSlider
                    defaultWeek={weekSelected}
                    weekUpdate={setWeek}
                  />
                </View>
              )}
              {animationDone && <View style={styles.spacer} />}
              {animationDone && (
                <View style={styles.videoPostion}>
                  <WeeklyVideos
                    defaultWeek={weekSelected}
                    weekUpdate={setWeek}
                    link={currentWeekData?.week_data?.pog_videos[0].video_link}
                    openVideo={openVideo}
                    key={'!@#$@$%'}
                  />
                </View>
              )}
              <View3dBtn
                screenName={
                  freemium ? 'PogBioDigitalScreen' : 'PogBioDigitalScreen'
                }
              />
            </View>
          </View>
        </MotiView>
      )}
    </>
  );
};

export default PregnancyTracker;

const styles = StyleSheet.create({
  spacer: {
    height: 400,
  },
  sliderPos: {
    position: 'absolute',
    top: 80,
  },
  videoPostion: {
    height: SCREEN_WIDTH_WINDOW / 0.8,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  videoAspect: {
    width: '100%',
    alignSelf: 'center',
    height: '100%',
  },
  pogContainer: {
    width: SCREEN_WIDTH_WINDOW,
    height: SCREEN_WIDTH_WINDOW / 0.75,
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
});

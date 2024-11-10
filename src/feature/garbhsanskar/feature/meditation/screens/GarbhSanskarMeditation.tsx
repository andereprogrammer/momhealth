import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import TrackPlayer, {
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import {setupPlayer} from 'react-native-track-player/lib/trackPlayer';
import {MeditationBg, Next, Prev} from '../../../../../assets';
import {formatMillisecondsToMMSS} from '../../mantrachanting/helpers/convertMilliSeconds';
import Slider from '@react-native-community/slider';
import HighlightedBackButton from '../../../../../components/HighlightedBackButton';
import FullPageImageBg from '../../../components/FullPageImageBg';
import LoadingAnimationScreen from '../../../../animations/LoadingAnimationScreen';
import {togglePlayBack} from '../../mantrachanting/screens/MantraChantingHomeScreen';
import BackHeader from '../../../../../components/MainContainer/BackHeader';

type Props = {
  navigation: any;
};

const GarbhSanskarMeditation = ({navigation}: Props) => {
  const [progressbar, setProgress] = useState(0);
  const progressBarUpdate = () => {
    setInterval(() => {
      setProgress(prev => prev + 1);
    }, 1000);
  };

  const takeMeBack = () => {
    navigation.goBack();
  };

  const playBackState = usePlaybackState();
  const progress = useProgress();
  const [intialRender, setInitialRender] = useState(false);
  const [songIndex, setsongIndex] = useState(0);
  const [repeatMode, setRepeatMode] = useState('off');
  const [durationValue, setDurationValue] = useState(true);
  const [meditations, setMeditations] = useState([]);
  const [loading, setLoading] = useState(false);

  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async event => {
    if (
      event.type === Event.PlaybackActiveTrackChanged &&
      event.track !== null
    ) {
      await TrackPlayer.pause();
    }
  });

  const repeatIcon = () => {
    if (repeatMode === 'off') {
      return 'repeat-off';
    }

    if (repeatMode === 'track') {
      return 'repeat-once';
    }

    if (repeatMode === 'repeat') {
      return 'repeat';
    }
  };

  const changeRepeatMode = () => {
    if (repeatMode === 'off') {
      TrackPlayer.setRepeatMode(RepeatMode.Track);
      setRepeatMode('track');
    }

    if (repeatMode === 'track') {
      TrackPlayer.setRepeatMode(RepeatMode.Queue);
      setRepeatMode('repeat');
    }

    if (repeatMode === 'repeat') {
      TrackPlayer.setRepeatMode(RepeatMode.Off);
      setRepeatMode('off');
    }
  };

  useEffect(() => {
    setLoading(true);
    fetch(
      'https://s3.ap-south-1.amazonaws.com/everheal.nexus.prod/app/patient/tools/mantra/content.json',
      {
        headers: {
          'Cache-Control': 'no-cache',
        },
      },
    )
      .then(res => {
        res.json().then(meditations => {
          setMeditations(meditations.data);
          setupPlayer(meditations.data[0].tracks);
          setLoading(false);
        });
      })
      .catch(e => {
        console.log(e);
      });

    return () => {
      TrackPlayer.reset();
    };
  }, []);
  const changeTrack = async (index: number) => {
    await TrackPlayer.reset();
    TrackPlayer.add(meditations[index]?.tracks)
      .then(res => {
        console.log(res);
        togglePlayBack(playBackState);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const skipToNext = async () => {
    setInitialRender(true);
    if (songIndex < meditations.length - 1) {
      setsongIndex(prev => {
        let newValue = prev + 1;
        if (newValue < meditations.length) {
          changeTrack(newValue);
        }
        return newValue;
      });
    }
  };

  const skipToPrevious = async () => {
    setInitialRender(true);
    if (songIndex > 0) {
      setsongIndex(prev => {
        let newValue = prev - 1;
        if (newValue >= 0) {
          changeTrack(newValue);
        }
        return newValue;
      });
    }
  };

  return (
    <View style={styles.main}>
      {loading ? (
        <LoadingAnimationScreen />
      ) : (
        <FullPageImageBg sourceImage={MeditationBg}>
          <View
            style={{
              height: 10,
            }}
          />
          <BackHeader
            showHighlightedIcon
            bgcolor="transparent"
            title={meditations[songIndex]?.name}
            titleColor={'#fff'}
          />
          <View
            style={{
              marginTop: 20,
              paddingHorizontal: 20,
            }}>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
              }}>
              <Slider
                style={{width: '100%', height: 40}}
                value={progress.position}
                minimumValue={0}
                maximumValue={progress.duration}
                thumbTintColor="#FFD369"
                minimumTrackTintColor="#FFD369"
                maximumTrackTintColor="#fff"
                onSlidingComplete={async value => {
                  await TrackPlayer.seekTo(value);
                }}
              />
            </View>
            <View style={styles.progressLevelDuraiton}>
              <Text style={styles.progressLabelText}>
                {formatMillisecondsToMMSS(progress.position * 1000)}
              </Text>
              <Text style={styles.progressLabelText}>
                {formatMillisecondsToMMSS(
                  (progress.duration - progress.position) * 1000,
                )}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              paddingHorizontal: 20,
              alignItems: 'center',
              gap: 50,
              marginTop: 10,
            }}>
            <TouchableOpacity
              onPress={skipToPrevious}
              style={{
                width: 30,
                height: 30,
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
              }}>
              <Image
                source={Prev}
                resizeMethod="resize"
                resizeMode="contain"
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                togglePlayBack(playBackState);
                setInitialRender(true);
              }}
              style={{
                width: 40,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={playBackState.state === State.Playing ? Pause : PlayBtn}
                resizeMethod="resize"
                resizeMode="contain"
                style={{
                  width: '100%',
                  height: '100%',
                  transform: [{scale: 1.6}],
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={skipToNext}
              style={{
                width: 30,
                height: 30,
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
              }}>
              <Image
                source={Next}
                resizeMethod="resize"
                resizeMode="contain"
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </TouchableOpacity>
          </View>
        </FullPageImageBg>
      )}
    </View>
  );
};

export default GarbhSanskarMeditation;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  tile: {
    paddingHorizontal: 25,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 12,
  },
  progressBar: {
    width: 350,
    height: 40,
    marginTop: 25,
    flexDirection: 'row',
  },
  progressLevelDuraiton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: horizontalScale(5),
    paddingVertical: verticalScale(3),
  },
  progressLabelText: {
    color: '#FFF',
  },

  musicControlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    width: '60%',
  },
});

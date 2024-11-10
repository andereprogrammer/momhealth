import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import HighlightedBackButton from '../../../../../components/HighlightedBackButton';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {Pallete, fonts} from '../../../../../theme/enum';
import PlayerImage from '../components/PlayerImage';
import DropdownComponent from '../../../../packages/components/DropDown';
import {OmBackground, Pause, PlayBtn, VolumeBtn} from '../../../../../assets';
import Slider from '@react-native-community/slider';

import TrackPlayer, {
  Capability,
  Event,
  State,
  RepeatMode,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
  AppKilledPlaybackBehavior,
} from 'react-native-track-player';
import BlurredImageBackground from '../../../components/BlurredImageBackground';
import RingAnimation from '../components/RingAnimation';
import {duration} from '../constants/omchating';
import VolumeSlider from '../components/VolumeSlider';
import {Platform} from 'react-native';
import {verticalScale} from '../../../../../helpers/layoutHelper';
import LinearGradient from 'react-native-linear-gradient';
import GradientButton from '../components/GradientButton';
import BackHeader from '../../../../../components/MainContainer/BackHeader';

type Props = {};
const om_chats = [
  {
    id: '0',
    url: 'https://s3.ap-south-1.amazonaws.com/everheal.nexus.prod/app/patient/tools/mantra/Chants/OM+5sec.mp3',
    title: 'Om',
    artist: 'tobylane',
    duration: 5,
  },
  {
    id: '1',
    url: 'https://s3.ap-south-1.amazonaws.com/everheal.nexus.prod/app/patient/tools/mantra/Chants/OM+10sec.mp3',
    title: 'Om',
    artist: 'tobylane',
    duration: 10,
  },
  {
    id: '2',
    url: 'https://s3.ap-south-1.amazonaws.com/everheal.nexus.prod/app/patient/tools/mantra/Chants/OM+15sec.mp3',
    title: 'Om',
    artist: 'tobylane',
    duration: 15,
  },
];

const setupPlayer = async () => {
  try {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.SeekTo,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
      ],
      progressUpdateEventInterval: 2,
    });
    await TrackPlayer.add(om_chats);
  } catch (error) {
    await TrackPlayer.add(om_chats);
  }
};
const togglePlayBack = async (playBackState: any) => {
  const currentTrack = await TrackPlayer.getActiveTrack();
  console.log(currentTrack, playBackState);
  if (currentTrack != null) {
    if (
      playBackState.state === State.Paused ||
      playBackState.state === State.Ready
    ) {
      await TrackPlayer.play();
      await TrackPlayer.setRepeatMode(RepeatMode.Track);
    } else {
      await TrackPlayer.pause();
    }
  }
};
const OmChantingHomeScreen = (props: Props) => {
  const navigation = useNavigation<NavigationProp<any, any>>();
  const playBackState = usePlaybackState();
  const progress = useProgress();
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(0);
  const [songIndex, setsongIndex] = useState(0);
  const [repeatMode, setRepeatMode] = useState('off');
  const [chantDuration, setChantDuration] = useState(60);
  const [omLength, setOmLength] = useState('short');
  const [currentOmIndex, setCurrentOmIndex] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [intialRender, setInitialRender] = useState(false);

  const repeatIcon = () => {
    if (repeatMode == 'off') {
      return 'repeat-off';
    }

    if (repeatMode == 'track') {
      return 'repeat-once';
    }

    if (repeatMode == 'repeat') {
      return 'repeat';
    }
  };

  const changeRepeatMode = () => {
    if (repeatMode == 'off') {
      TrackPlayer.setRepeatMode(RepeatMode.Track);
      setRepeatMode('track');
    }

    if (repeatMode == 'track') {
      TrackPlayer.setRepeatMode(RepeatMode.Queue);
      setRepeatMode('repeat');
    }

    if (repeatMode == 'repeat') {
      TrackPlayer.setRepeatMode(RepeatMode.Off);
      setRepeatMode('off');
    }
  };

  const startStopwatch = () => {
    startTimeRef.current = Date.now() - time * 1000;
    intervalRef.current = setInterval(() => {
      setTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);
    setRunning(true);
  };

  const pauseStopwatch = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
  };

  const resetStopwatch = () => {
    clearInterval(intervalRef.current);
    setTime(0);
    setRunning(false);
  };

  const resumeStopwatch = () => {
    startTimeRef.current = Date.now() - time * 1000;
    intervalRef.current = setInterval(() => {
      setTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);
    setRunning(true);
  };

  const updateVolume = async (value: number) => {
    console.log(value);
    await TrackPlayer.setVolume(value);
    setVolume(value);
  };

  const progressBarUpdate = () => {
    if (playBackState.state === State.Paused) {
      resumeStopwatch();
    } else {
      pauseStopwatch();
    }
  };

  const takeMeBack = () => {
    setRunning(false);
    navigation.goBack();
  };

  const handleDuration = async (val: any) => {
    TrackPlayer.reset();
    resetStopwatch();
    setChantDuration(parseInt(val));
    await TrackPlayer.add(om_chats);
    onLengthChange(currentOmIndex, omLength);
  };

  const changeDuration = async () => {
    if (time === chantDuration && intialRender) {
      console.log('object');
      TrackPlayer.reset();
      resetStopwatch();
      await TrackPlayer.add(om_chats);
      onLengthChange(currentOmIndex, omLength);
    }
  };

  const skipTo = async (index: number) => {
    await TrackPlayer.skip(index);
  };

  const onLengthChange = async (length: number, lengthValue: string) => {
    await TrackPlayer.reset();
    await TrackPlayer.add(om_chats);
    resetStopwatch();
    skipTo(length);
    setOmLength(lengthValue);
    setCurrentOmIndex(length);
  };

  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async event => {
    if (
      event.type === Event.PlaybackActiveTrackChanged &&
      event.track !== null
    ) {
      const track = await TrackPlayer.getTrack(event.lastIndex || -1);
    }
  });

  useEffect(() => {
    console.log('aksjhfkjashkjf');
  }, []);

  useEffect(() => {
    setupPlayer();
    setInitialRender(true);
    return () => {
      setInitialRender(false);
      scrollX.removeAllListeners();
      TrackPlayer.reset();
    };
  }, []);

  useEffect(() => {
    changeDuration();
  }, [time, chantDuration]);

  return (
    <View style={styles.main}>
      <BlurredImageBackground sourceImage={OmBackground}>
        <View
          style={{
            height: verticalScale(10),
          }}
        />
        <BackHeader
          showHighlightedIcon
          bgcolor="transparent"
          title={'Om chanting'}
          titleColor={'#000'}
        />
        <View style={styles.lengthButtonView}>
          <View style={[styles.tile]}>
            <TouchableOpacity
              onPress={() => onLengthChange(0, 'short')}
              style={[styles.innerTile]}>
              <GradientButton
                callText="Short"
                selected={omLength === 'short'}
              />
            </TouchableOpacity>
          </View>
          <View style={[styles.tile]}>
            <TouchableOpacity
              onPress={() => onLengthChange(1, 'medium')}
              style={[styles.innerTile]}>
              <GradientButton
                callText="Medium"
                selected={omLength === 'medium'}
              />
            </TouchableOpacity>
          </View>
          <View style={[styles.tile]}>
            <TouchableOpacity
              onPress={() => onLengthChange(2, 'long')}
              style={[styles.innerTile]}>
              <GradientButton callText="Long" selected={omLength === 'long'} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.playerImageView}>
          <PlayerImage />
          <View style={styles.ringAnimationView}>
            {running && <RingAnimation />}
          </View>
        </View>
        <View style={styles.seekBarView}>
          <View style={styles.seekBar}>
            <Slider
              style={styles.seekBarDimension}
              value={time}
              minimumValue={0}
              maximumValue={chantDuration}
              thumbTintColor="#FFD369"
              minimumTrackTintColor="#FFD369"
              maximumTrackTintColor="#fff"
              disabled
              onSlidingComplete={async value => {
                await TrackPlayer.seekTo(value);
              }}
            />
          </View>
        </View>
        <View style={styles.dropDownView}>
          <View style={styles.dropDown}>
            <DropdownComponent passData={handleDuration} data={duration} />
          </View>
          <TouchableOpacity
            onPress={() => {
              togglePlayBack(playBackState);
              if (!running) {
                startStopwatch();
              } else {
                progressBarUpdate();
              }
            }}
            style={styles.play_btn_view}>
            <Image
              source={playBackState.state === State.Playing ? Pause : PlayBtn}
              resizeMethod="resize"
              resizeMode="contain"
              style={styles.play_btn_img}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.volume_btn_view}
            onPress={() => setShowVolumeControl(!showVolumeControl)}>
            <Image
              source={VolumeBtn}
              resizeMethod="resize"
              resizeMode="cover"
              style={styles.volume_btn_img}
              tintColor={showVolumeControl ? Pallete.GoldenGlow : '#fff'}
            />
          </TouchableOpacity>
        </View>
        {showVolumeControl && (
          <VolumeSlider volume={volume} changeVolume={updateVolume} />
        )}
        <View style={styles.space} />
      </BlurredImageBackground>
    </View>
  );
};

export default OmChantingHomeScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  tile: {
    width: 100,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    shadowColor: '#c3c3c3',
    shadowOffset: {
      width: 1,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 12,
    backgroundColor: 'transparent',
  },
  innerTile: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  space: {
    height: 40,
  },
  volume_btn_img: {
    width: '100%',
    height: '100%',
    transform: [{scale: 1.2}],
  },
  volume_btn_view: {
    width: 110,
    height: 100,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  play_btn_img: {
    width: '100%',
    height: '100%',
  },
  play_btn_view: {
    width: 60,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropDown: {
    width: 100,
  },
  dropDownView: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  seekBarDimension: {width: '100%', height: 40},
  seekBar: {
    width: '100%',
    alignItems: 'center',
  },
  seekBarView: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  ringAnimationView: {
    position: 'absolute',
    top: -10,
    width: '100%',
    height: 320,
  },
  playerImageView: {
    width: '100%',
    height: 'auto',
    justifyContent: 'center',
    flexDirection: 'row',
    display: 'flex',
    position: 'relative',
  },
  lengthButtonView: {
    width: '100%',
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 40,
    paddingHorizontal: 20,
  },
  titleText: {
    color: 'black',
    fontSize: 20,
    fontFamily: fonts.PrimaryJakartaExtraBold,
    paddingBottom: 25,
  },
  titleView: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: Platform.OS === 'ios' ? 40 : 80,
    display: 'flex',
    flexDirection: 'row',
    marginTop: Platform.OS === 'ios' ? verticalScale(45) : verticalScale(12),
    marginLeft: 80,
  },
});

import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Dimensions,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import HighlightedBackButton from '../../../../../components/HighlightedBackButton';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {Pallete, fonts} from '../../../../../theme/enum';
import DropdownComponent from '../../../../packages/components/DropDown';
import {
  Cross,
  Gayatri,
  Gayatribg,
  HumanarIcon,
  MusicIcon,
  Next,
  Pause,
  Play,
  PlayBtn,
  Prev,
  Shiva,
} from '../../../../../assets';
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
import PlayerImage from '../components/PlayerImage';
import LinearGradient from 'react-native-linear-gradient';
import LyricCard from '../components/LyricCard';
import BottomSheet, {
  BottomSheetRef,
} from '../../../../session/components/BottomSheet';
import LoadingAnimationScreen from '../../../../animations/LoadingAnimationScreen';
import MeaningPopUp from '../components/MeaningPopUp';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../../../helpers/layoutHelper';
import {formatMillisecondsToMMSS} from '../helpers/convertMilliSeconds';
import BackHeader from '../../../../../components/MainContainer/BackHeader';
const {height} = Dimensions.get('window');
const setupPlayer = async (tracks: any) => {
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

    await TrackPlayer.add(tracks);
  } catch (error) {
    console.log(error);
    await TrackPlayer.add(tracks);
  }
};
export const togglePlayBack = async (playBackState: any) => {
  const currentTrack = await TrackPlayer.getActiveTrack();
  console.log(currentTrack, playBackState);
  if (currentTrack != null) {
    if (
      playBackState.state === State.Paused ||
      playBackState.state === State.Ready
    ) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  }
};
const MantraChantingHomeScreen = ({navigation}) => {
  //   const navigation = useNavigation<NavigationProp<any, any>>();
  const [progressbar, setProgress] = useState(0);
  const progressBarUpdate = () => {
    setInterval(() => {
      setProgress(prev => prev + 1);
    }, 1000);
  };

  const takeMeBack = () => {
    navigation.goBack();
  };
  const handleDuration = async (val: any) => {
    await TrackPlayer.skip(val);
  };

  const duration = [
    {
      label: `3 times`,
      value: 0,
      is_default: true,
    },
    {
      label: `7 times`,
      value: 1,
      is_default: false,
    },
    {
      label: `11 times`,
      value: 2,
      is_default: false,
    },
    {
      label: `21 times`,
      value: 3,
      is_default: false,
    },
  ];
  const months = [
    {
      label: `Month 1`,
      value: 'Month 1',
      is_default: true,
    },
    {
      label: `Month 1`,
      value: 'Month 1',
      is_default: false,
    },
    {
      label: `Month 1`,
      value: 'Month 1',
      is_default: false,
    },
  ];
  const playBackState = usePlaybackState();
  const progress = useProgress();
  const [intialRender, setInitialRender] = useState(false);
  const [songIndex, setsongIndex] = useState(0);
  const [repeatMode, setRepeatMode] = useState('off');
  const [showLyric, setShowLyric] = useState(false);
  const [showMeaning, setShowMeaning] = useState(false);

  const [durationValue, setDurationValue] = useState(true);
  const [mantras, setMantras] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showBottomCard, setShowBottomCard] = useState(true);

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
    // https://s3.ap-south-1.amazonaws.com/everheal.nexus.prod/app/patient/tools/mantra/content.json
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
        res.json().then(mantras => {
          setMantras(mantras.data);
          setupPlayer(mantras.data[0].tracks);
          setLoading(false);
          bottomSheetRef.current?.expand();
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
    TrackPlayer.add(mantras[index]?.tracks)
      .then(res => {
        console.log(res);
        togglePlayBack(playBackState);
      })
      .catch(e => {
        console.log(e);
        setDurationValue(true);
      });
  };
  const bottomSheetRef = useRef<BottomSheetRef>(null);

  const skipToNext = async () => {
    setInitialRender(true);
    if (songIndex < mantras.length - 1) {
      setsongIndex(prev => {
        let newValue = prev + 1;
        if (newValue < mantras.length) {
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
  const skipTo = async (index: number) => {
    setsongIndex(prev => {
      let newvalue = index;
      setDurationValue(false);
      changeTrack(newvalue);
      return newvalue;
    });
    bottomSheetRef.current?.close();
  };
  const showLyricHideMeaning = () => {
    setShowLyric(!showLyric);
    setShowMeaning(false);
  };
  const showMeaningHideLyric = () => {
    setShowMeaning(!showMeaning);
    setShowLyric(false);
  };
  return (
    <View style={styles.main}>
      {loading ? (
        <LoadingAnimationScreen />
      ) : (
        <BlurredImageBackground sourceImage={Gayatribg}>
          <View
            style={{
              height: 10,
            }}
          />
          <BackHeader
            showHighlightedIcon
            bgcolor="transparent"
            title={mantras[songIndex]?.name}
            titleColor={'#fff'}
          />

          {/* <View
          style={{
            width: '100%',
            height: 80,
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            gap: 10,
            marginTop: 20,
            paddingHorizontal: 20,
          }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
            }}>
            <View
              style={{
                width: '25%',
              }}>
              <DropdownComponent data={months} passData={() => {}} />
            </View>
            <View
              style={{
                height: '80%',
                width: '75%',
                borderRadius: 20,
                gap: 10,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#fff',
                  fontFamily: fonts.SecondaryDMSansMedium,
                }}>
                60 % complted
              </Text>
              <View
                style={{
                  height: '20%',
                  width: '100%',
                  backgroundColor: '#fff',
                  borderRadius: 20,
                }}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 3, y: 2}}
                  colors={[Pallete.Eggplant, Pallete.linearGradientLight]}
                  style={{
                    backgroundColor: Pallete.Eggplant,
                    width: '40%',
                    height: '100%',
                    borderRadius: 20,
                  }}></LinearGradient>
              </View>
            </View>
          </View>
        </View> */}
          <View
            style={{
              width: '100%',
              height: 'auto',
              justifyContent: 'center',
              flexDirection: 'row',
              display: 'flex',
              position: 'relative',
              marginVertical: 5,
            }}>
            <PlayerImage sourceImage={mantras[songIndex]?.image} />
            {showLyric ? (
              <LyricCard
                name={mantras[songIndex]?.name}
                lyrics={mantras[songIndex].lyrics}
              />
            ) : null}
          </View>
          <View
            style={{
              width: '90%',
              flexDirection: 'row',
              alignSelf: 'center',
              paddingVertical: 5,
              marginVertical: 10,
            }}>
            <View
              style={{
                width: 100,
              }}>
              <DropdownComponent
                refresh={songIndex}
                passData={handleDuration}
                data={duration}
              />
            </View>
            <View
              style={{
                width: '70%',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                gap: 10,
              }}>
              <LinearGradient
                start={{x: 0, y: 1}}
                end={{x: 1, y: 2}}
                style={{
                  width: '35%',
                  height: 35,
                  borderRadius: 30,
                }}
                colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.3)']}>
                <TouchableOpacity
                  onPress={showLyricHideMeaning}
                  style={{
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: showLyric ? '#fff' : 'transparent',
                    borderRadius: 30,
                  }}>
                  <Text
                    style={{
                      color: showLyric ? '#000' : '#fff',
                      fontFamily: fonts.PrimaryJakartaBold,
                    }}>
                    Lyrics
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
              {showMeaning && (
                <MeaningPopUp meaning={mantras[songIndex].meaning} />
              )}

              <LinearGradient
                start={{x: 0, y: 1}}
                end={{x: 1, y: 2}}
                style={{
                  width: '35%',
                  height: 35,
                  borderRadius: 30,
                  position: 'relative',
                }}
                colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.4)']}>
                <TouchableOpacity
                  onPress={showMeaningHideLyric}
                  style={{
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: showMeaning ? '#fff' : 'transparent',
                    borderRadius: 30,
                  }}>
                  <Text
                    style={{
                      color: showMeaning ? '#000' : '#fff',
                      fontFamily: fonts.PrimaryJakartaBold,
                    }}>
                    Meaning
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
          <View
            style={{
              marginTop: verticalScale(10),
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
                width: horizontalScale(30),
                height: verticalScale(40),
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
          {showBottomCard && (
            <LinearGradient
              start={{x: 0, y: 1}}
              end={{x: 1, y: 2}}
              colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.3)']}
              style={{
                width: '90%',
                alignSelf: 'center',
                borderRadius: 15,
                flexDirection: 'row',
                position: 'absolute',
                top:
                  Platform.OS === 'ios'
                    ? height - verticalScale(64)
                    : height - verticalScale(70),
                paddingVertical: 10,
              }}>
              <TouchableOpacity
                onPress={() => {
                  bottomSheetRef.current?.expand();
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    width: '20%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    style={{
                      width: '80%',
                      height: '60%',
                    }}
                    resizeMethod="resize"
                    resizeMode="contain"
                    source={MusicIcon}
                  />
                </View>
                <View
                  style={{
                    width: '60%',
                    height: '100%',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 16,
                      fontFamily: fonts.SecondaryDMSansBold,
                    }}>
                    {mantras.length - 1 === songIndex
                      ? 'Previous mantra'
                      : 'Next mantra'}
                  </Text>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 12,
                      fontFamily: fonts.SecondaryDMSansBold,
                    }}>
                    {songIndex < mantras.length - 1
                      ? mantras[songIndex + 1]?.name // Show next mantra's image
                      : mantras[songIndex - 1]?.name}
                  </Text>
                </View>
                <View
                  style={{
                    width: '20%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    style={{
                      width: '80%',
                      height: '60%',
                    }}
                    resizeMethod="resize"
                    resizeMode="contain"
                    source={{
                      uri:
                        songIndex < mantras.length - 1
                          ? mantras[songIndex + 1]?.image
                          : mantras[songIndex - 1]?.image,
                    }}
                  />
                </View>
              </TouchableOpacity>
            </LinearGradient>
          )}
          <BottomSheet
            backcolor="transparent"
            ref={bottomSheetRef}
            maxCardHeight="50%">
            <LinearGradient
              start={{x: 0, y: 1}}
              end={{x: 1, y: 2}}
              colors={['rgba(0,0,0,0.9)', 'rgba(0,0,0,0.3)']}
              style={{
                height: '100%',
                width: '100%',
                alignSelf: 'center',
                borderRadius: 15,
                flexDirection: 'column',
              }}>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  height: 60,
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    width: '24%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    style={{
                      width: '80%',
                      height: '60%',
                    }}
                    resizeMethod="resize"
                    resizeMode="contain"
                    source={MusicIcon}
                  />
                </View>
                <View
                  style={{
                    width: '40%',
                    height: '100%',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 16,
                      fontFamily: fonts.SecondaryDMSansBold,
                    }}>
                    List of mantras
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => bottomSheetRef.current?.close()}
                  style={{
                    width: 25,
                    height: 25,
                    alignSelf: 'center',
                    marginRight: 20,
                  }}>
                  <Image
                    resizeMethod="resize"
                    resizeMode="contain"
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    tintColor={'#fff'}
                    source={Cross}
                  />
                </TouchableOpacity>
              </View>
              {mantras?.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => skipTo(index)}
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      height: verticalScale(70),
                      borderBottomWidth: 0.5,
                      borderColor: '#fff',
                    }}>
                    <View
                      style={{
                        width: '18%',
                        height: '75%',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        borderRadius: 15,
                        overflow: 'hidden',
                      }}>
                      <Image
                        style={{
                          width: '100%',
                          height: '100%',
                        }}
                        resizeMethod="resize"
                        resizeMode="cover"
                        source={{uri: item.image}}
                      />
                    </View>
                    <View
                      style={{
                        width: '35%',
                        height: '100%',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 16,
                          fontFamily: fonts.SecondaryDMSansBold,
                        }}>
                        {item.name}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => skipTo(index)}
                      style={{
                        width: '20%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image
                        style={{
                          width: '50%',
                          height: '50%',
                        }}
                        resizeMethod="resize"
                        resizeMode="contain"
                        source={Play}
                        tintColor={'#fff'}
                      />
                    </TouchableOpacity>
                  </TouchableOpacity>
                );
              })}
            </LinearGradient>
          </BottomSheet>
        </BlurredImageBackground>
      )}
    </View>
  );
};

export default MantraChantingHomeScreen;

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

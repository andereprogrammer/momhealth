import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {
  HMSLocalPeer,
  HMSPIPListenerActions,
  HMSRoom,
  HMSTrack,
  HMSTrackSource,
  HMSTrackType,
  HMSUpdateListenerActions,
  HMSVideoViewMode,
} from '@100mslive/react-native-hms';
import {useDispatch, useSelector} from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import type {RootState} from '../redux';
import {COLORS} from '../utils/theme';
import {CustomButton} from './CustomButton';
import {getInitials} from '../utils/functions';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {BackBtn} from '../../../assets';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  clearHmsReference,
  clearMessageData,
  clearPeerData,
} from '../redux/actions';
import {Pallete} from '../../../theme/enum';

export const PreviewModal = ({
  previewTracks,
  join,
  setLoadingButtonState,
  loadingButtonState,
}: {
  previewTracks: HMSTrack[];
  join: Function;
  setLoadingButtonState: React.Dispatch<React.SetStateAction<boolean>>;
  loadingButtonState: boolean;
}) => {
  const navigation = useNavigation<NavigationProp<any, any>>();
  const dispatch = useDispatch();

  const hmsInstance = useSelector((state: RootState) => state.user.hmsInstance);
  const {top, bottom, left, right} = useSafeAreaInsets();
  const mirrorCamera = useSelector(
    (state: RootState) => state.app.joinConfig.mirrorCamera,
  );
  const autoSimulcast = useSelector(
    (state: RootState) => state.app.joinConfig.autoSimulcast,
  );

  const [previewVideoTrack, setPreviewVideoTrack] = useState<HMSTrack>();

  const [isAudioMute, setIsAudioMute] = useState<boolean>();
  const [isVideoMute, setIsVideoMute] = useState<boolean>();
  const [previewPeer, setPreviewPeer] = useState<HMSLocalPeer>();
  const [numberOfLines, setNumberOfLines] = useState(true);

  const HmsView = hmsInstance?.HmsView;
  const audioAllowed =
    previewPeer?.role?.publishSettings?.allowed?.includes('audio');
  const videoAllowed =
    previewPeer?.role?.publishSettings?.allowed?.includes('video');

  useEffect(() => {
    hmsInstance?.getLocalPeer().then(localPeer => setPreviewPeer(localPeer));
  }, [hmsInstance]);

  useEffect(() => {
    previewTracks.map(track => {
      if (
        track?.type === HMSTrackType.VIDEO &&
        track?.source === HMSTrackSource.REGULAR
      ) {
        setPreviewVideoTrack(track);
        setIsVideoMute(track?.isMute());
      }
      if (
        track?.type === HMSTrackType.AUDIO &&
        track?.source === HMSTrackSource.REGULAR
      ) {
        setIsAudioMute(track?.isMute());
      }
    });
  }, [previewTracks]);
  const removeHmsInstanceListeners = (hms?: HMSSDK) => {
    hms?.removeEventListener(HMSUpdateListenerActions.ON_ROOM_UPDATE);
    hms?.removeEventListener(HMSUpdateListenerActions.ON_PEER_UPDATE);
    hms?.removeEventListener(HMSUpdateListenerActions.ON_TRACK_UPDATE);
    hms?.removeEventListener(HMSUpdateListenerActions.ON_ERROR);
    hms?.removeEventListener(HMSUpdateListenerActions.ON_REMOVED_FROM_ROOM);
    hms?.removeEventListener(HMSUpdateListenerActions.ON_MESSAGE);
    // hms?.removeEventListener(HMSUpdateListenerActions.ON_SPEAKER);
    // hms?.removeEventListener(HMSUpdateListenerActions.RECONNECTING);
    // hms?.removeEventListener(HMSUpdateListenerActions.RECONNECTED);
    hms?.removeEventListener(HMSUpdateListenerActions.ON_ROLE_CHANGE_REQUEST);
    hms?.removeEventListener(
      HMSUpdateListenerActions.ON_CHANGE_TRACK_STATE_REQUEST,
    );
    hms?.removeEventListener(HMSPIPListenerActions.ON_PIP_ROOM_LEAVE);
  };
  const destroy = async () => {
    await hmsInstance
      ?.destroy()
      .then(s => {
        dispatch(clearMessageData());
        dispatch(clearPeerData());
        dispatch(clearHmsReference());

        console.log('Destroy Success: ', s);
      })
      .catch(e => {
        console.log(`Destroy HMS instance Error: ${e}`);
        // Toast.showWithGravity(
        //   `Destroy HMS instance Error: ${e}`,
        //   Toast.LONG,
        //   Toast.TOP,
        // );
      });
  };
  const sessionStoreListeners = useRef<Array<{remove: () => void}>>([]);

  const onLeavePress = async () => {
    await hmsInstance
      ?.leave()
      .then(async d => {
        console.log('Leave Success: ', d);
        removeHmsInstanceListeners(hmsInstance);

        // remove Session Store key update listener on cleanup
        sessionStoreListeners.current.forEach(listener => listener.remove());
        destroy();
      })
      .catch(e => {
        console.log(`Leave Room Error: ${e}`);
        // Toast.showWithGravity(`Leave Room Error: ${e}`, Toast.LONG, Toast.TOP);
      });
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
          onLeavePress();
        }}
        containerStyle={{
          width: '10%',
          height: '4%',
          left: 20,
          zIndex: 100,
          position: 'absolute',
          top: 50,
          backgroundColor: COLORS.BACKGROUND.DARK,
          borderRadius: 5,
        }}
        style={{
          zIndex: 100,
          padding: 5,
        }}>
        <Image
          resizeMethod="resize"
          resizeMode="contain"
          tintColor={'#fff'}
          style={{
            width: '100%',
            height: '100%',
            zIndex: 100,
          }}
          source={BackBtn}
        />
      </TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          {isVideoMute || !HmsView || !previewVideoTrack?.trackId ? (
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {getInitials(previewPeer?.name)}
                </Text>
              </View>
              <Text style={styles.name}>{previewPeer?.name}</Text>
            </View>
          ) : (
            <HmsView
              trackId={previewVideoTrack?.trackId}
              key={previewVideoTrack?.trackId}
              mirror={mirrorCamera}
              autoSimulcast={autoSimulcast}
              scaleType={HMSVideoViewMode.ASPECT_FILL}
              style={styles.hmsView}
            />
          )}
        </View>
        <View style={[styles.textContainer, {top: 48 + top}]}>
          <Text style={styles.heading}>Configure Video and Audio</Text>
        </View>
        <View style={[styles.buttonRow, {bottom: 90 + bottom, left, right}]}>
          <View style={styles.iconContainer}>
            <View style={styles.iconSubContainer}>
              {audioAllowed && (
                <CustomButton
                  onPress={() => {
                    setIsAudioMute(!isAudioMute);
                    previewPeer?.localAudioTrack()?.setMute(!isAudioMute);
                  }}
                  viewStyle={[
                    styles.singleIconContainer,
                    isAudioMute && styles.mute,
                  ]}
                  LeftIcon={
                    <Feather
                      name={isAudioMute ? 'mic-off' : 'mic'}
                      style={[
                        styles.videoIcon,
                        isAudioMute && styles.muteVideoIcon,
                      ]}
                      size={32}
                    />
                  }
                />
              )}
              {videoAllowed && (
                <CustomButton
                  onPress={() => {
                    setIsVideoMute(!isVideoMute);
                    previewPeer?.localVideoTrack()?.setMute(!isVideoMute);
                  }}
                  viewStyle={[
                    styles.singleIconContainer,
                    isVideoMute && styles.mute,
                  ]}
                  LeftIcon={
                    <Feather
                      name={isVideoMute ? 'video-off' : 'video'}
                      style={[
                        styles.videoIcon,
                        isVideoMute && styles.muteVideoIcon,
                      ]}
                      size={32}
                    />
                  }
                />
              )}
            </View>
            <View style={styles.iconSubContainer}>
              {previewPeer && (
                <CustomButton
                  onPress={() => {}}
                  disabled={true}
                  viewStyle={[
                    styles.singleIconContainer,
                    isAudioMute && styles.mute,
                  ]}
                  LeftIcon={
                    <Image
                      resizeMode="contain"
                      style={styles.image}
                      source={
                        previewPeer?.networkQuality?.downlinkQuality === 0
                          ? require('../assets/network_0.png')
                          : previewPeer?.networkQuality?.downlinkQuality === 1
                          ? require('../assets/network_1.png')
                          : previewPeer?.networkQuality?.downlinkQuality === 2
                          ? require('../assets/network_2.png')
                          : previewPeer?.networkQuality?.downlinkQuality === 3
                          ? require('../assets/network_3.png')
                          : require('../assets/network_4.png')
                      }
                    />
                  }
                />
              )}
            </View>
          </View>
          <CustomButton
            title="Start Session"
            onPress={() => {
              join();
              setLoadingButtonState(true);
            }}
            loading={loadingButtonState}
            viewStyle={styles.joinButton}
            textStyle={styles.joinButtonText}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: '100%',
    position: 'relative',
    backgroundColor: Pallete.Whitishpink,
  },
  modalContainer: {
    width: '80%',
    height: '40%',
    backgroundColor: '#000',
    alignSelf: 'center',
    borderRadius: 20,
    marginBottom: 40,
  },
  hmsView: {
    height: '100%',
    width: '100%',
  },
  buttonTextContainer: {
    backgroundColor: COLORS.PRIMARY.DEFAULT,
    padding: 10,
    borderRadius: 5,
    width: '48%',
  },
  videoIcon: {
    color: COLORS.TEXT.HIGH_EMPHASIS,
    height: 32,
  },
  muteVideoIcon: {
    color: COLORS.BORDER.LIGHT,
  },
  image: {
    height: 32,
    width: 32,
  },
  buttonRow: {
    position: 'absolute',
    maxWidth: '100%',
    zIndex: 99,
  },
  textContainer: {
    position: 'absolute',
    width: '80%',
    zIndex: 99,
    alignItems: 'center',
    flexDirection: 'row',
  },
  peerList: {
    top: 16,
    minWidth: '70%',
    maxWidth: '90%',
    backgroundColor: COLORS.OVERLAY,
    borderRadius: 20,
  },
  iconContainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    alignSelf: 'center',
  },
  iconSubContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  singleIconContainer: {
    padding: 8,
    backgroundColor: Pallete.Eggplant,
    borderColor: Pallete.Eggplant,
    borderWidth: 1,
    width: 'auto',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginHorizontal: 4,
  },
  mute: {
    backgroundColor: COLORS.TEXT.HIGH_EMPHASIS,
    borderColor: COLORS.TEXT.HIGH_EMPHASIS,
  },
  joinButtonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  collapsibleText: {
    paddingVertical: 8,
    color: COLORS.TEXT.MEDIUM_EMPHASIS,
    fontSize: 18,
    fontFamily: 'DMSans-Regular',
    letterSpacing: 0.15,
    paddingHorizontal: 16,
  },
  name: {
    fontFamily: 'DMSans-Regular',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    letterSpacing: 0.25,
    color: COLORS.TEXT.HIGH_EMPHASIS,
    paddingTop: 16,
  },
  lowOpacity: {
    opacity: 0.5,
  },
  highOpacity: {
    opacity: 1,
  },
  joinButton: {
    backgroundColor: Pallete.Eggplant,
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Pallete.Eggplant,
    borderRadius: 8,
    width: '50%',
    alignSelf: 'center',
  },
  joinButtonText: {
    fontFamily: 'DMSans-Medium',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
    color: COLORS.TEXT.HIGH_EMPHASIS_ACCENT,
  },
  avatarContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.SURFACE.DEFAULT,
  },
  avatar: {
    width: 144,
    aspectRatio: 1,
    backgroundColor: COLORS.TWIN.PURPLE,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontFamily: 'DMSans-Medium',
    fontSize: 48,
    lineHeight: 52,
    textAlign: 'center',
    color: COLORS.TEXT.HIGH_EMPHASIS,
  },
  heading: {
    fontFamily: 'DMSans-Medium',
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'center',
    letterSpacing: 0.15,
    color: '#FFF',
  },
});

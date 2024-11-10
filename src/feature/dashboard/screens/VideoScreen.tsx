import React, {useState, useRef, useEffect, useLayoutEffect} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import VideoPlayer from 'react-native-media-console';
import Orientation from 'react-native-orientation-locker';
import {VideoRef} from 'react-native-video';

const VideoScreen = ({navigation, route}) => {
  const videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  let url = route.params.url;
  const [closeVideo, setCloseVideo] = useState(false);

  const renderToolbar = () => (
    <View>
      <Text style={styles.toolbar}> toolbar </Text>
    </View>
  );

  const onSeeking = currentTime => setCurrentTime(currentTime);

  useEffect(() => {
    if (closeVideo) {
      navigation.goBack();
    }
  }, [closeVideo]);

  useLayoutEffect(() => {
    setTimeout(
      () => {
        Orientation.unlockAllOrientations();
      },
      Platform.select({
        android: 0,
        ios: 600,
      }),
    );
    return () => {
      setTimeout(
        () => {
          Orientation.lockToPortrait();
        },
        Platform.select({
          android: 0,
          ios: 600,
        }),
      );
    };
  }, []);

  return (
    !closeVideo && (
      <VideoPlayer
        source={{uri: url}}
        navigator={navigation}
        fullscreenOrientation={'landscape'}
        ignoreSilentSwitch={'ignore'}
        isFullscreen={true}
        fullscreenAutorotate={true}
        onBack={() => {
          setCloseVideo(true);
        }}
      />
    )
  );
};

export default VideoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
});

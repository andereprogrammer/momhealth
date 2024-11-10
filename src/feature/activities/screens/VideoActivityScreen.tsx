// React Native Video Library to Play Video in Android and IOS
// https://aboutreact.com/react-native-video/

// import React in our code
import React, {useState, useRef, useEffect, useLayoutEffect} from 'react';

// import all the components we are going to use
import {
  Alert,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import VideoPlayer from 'react-native-media-console';
import Orientation from 'react-native-orientation-locker';
import {VideoRef} from 'react-native-video';

const VideoActivityScreen = ({navigation, route}) => {
  const videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(true);
  const [screenType, setScreenType] = useState('content');
  let url = route.params.url;
  const [closeVideo, setCloseVideo] = useState(false);

  const renderToolbar = () => (
    <View>
      <Text style={styles.toolbar}> toolbar </Text>
    </View>
  );

  const onSeeking = currentTime => setCurrentTime(currentTime);

  useEffect(() => {
    if(closeVideo){
      navigation.goBack();
    }
  }, [closeVideo]);

  useLayoutEffect(() => {
    setTimeout(
      () => {
        Orientation.lockToLandscape();
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

export default VideoActivityScreen;

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

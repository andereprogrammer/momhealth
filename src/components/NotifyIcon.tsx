import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {fonts, Pallete} from '../theme/enum';
import LottieView from 'lottie-react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';

export type NotificationIconStatusType = 'PLAY' | 'PAUSE' | 'RESET';

type Props = {
  count: number;
  status?: NotificationIconStatusType;
};

const NotifyIcon = ({count, status = 'PAUSE'}: Props) => {
  const navigation = useNavigation<NavigationProp<any, any>>();
  const notificationLottieRef = useRef(null);

  useEffect(() => {
    if (count === 0) {
      return;
    }
    switch (status) {
      case 'PLAY':
        notificationLottieRef?.current?.play();
        break;
      case 'PAUSE':
        notificationLottieRef?.current?.pause();
        break;
      case 'RESET':
        notificationLottieRef?.current?.reset();
        break;
    }
  }, [status]);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('NotificationBayScreen');
      }}
      style={styles.btnContainer}>
      {count !== 0 ? (
        <View style={styles.countContainer}>
          <Text style={styles.countText}>{count > 9 ? '9+' : count}</Text>
        </View>
      ) : null}
      <LottieView
        ref={notificationLottieRef}
        style={styles.animtedView}
        autoPlay={false}
        // autoPlay={count >= 1}
        loop={count >= 1}
        source={require('../assets/animations/bellblack.json')}
      />
    </TouchableOpacity>
  );
};

export default NotifyIcon;

const styles = StyleSheet.create({
  btnContainer: {
    width: 30,
    height: 30,
    position: 'relative',
  },
  countContainer: {
    padding: 1.4,
    borderRadius: 6,
    backgroundColor: 'red',
    position: 'absolute',
    right: -6,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 12,
    minHeight: 12,
    zIndex: 10,
  },
  countText: {
    fontSize: 8,
    color: Pallete.whiteBackground,
    fontFamily: fonts.PrimaryJakartaBold,
  },
  animtedView: {
    width: '100%',
    height: '100%',
  },
});

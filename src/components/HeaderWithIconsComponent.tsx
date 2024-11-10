import React, {useEffect} from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  Platform,
  Text,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {
  ChatI,
  ChatIcon,
  FreemiumChat,
  MainLogo,
  ProfileDefault,
  ProfileIcon,
  Settings,
  White,
  WhiteLogo,
} from '../assets';
import {horizontalScale, verticalScale} from '../helpers/layoutHelper';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import {fonts, Pallete} from '../theme/enum';
import ClickableIcon from './ClickableIcon';
import NotifyIcon, {NotificationIconStatusType} from './NotifyIcon';
import {SharedValue} from 'react-native-reanimated';
import {AnimatePresence, MotiView} from 'moti';
import useDataProvider from '../context-store/useDataProvider';
import s from '../styles/GlobalStyles';
import {
  NOTIFICATION_BELL_RINGING_DURATION,
  NOTIFICATION_POLLING_INTERVAL,
} from '../constants';
import {getNotifications} from '../api/homeapis';
import {countNotReadNotifications} from '../feature/freemium/screens/FreemiumHomeScreen';
import ImageWithView from './ImageWithView';

type Props = {
  count?: number | undefined;
  scrollDistance: boolean;
  notificationIconStatus?: NotificationIconStatusType;
  hideNotifications?: boolean;
};

const HeaderContent = ({
  takeMethere,
  count,
  notificationIconStatus,
  hideNotifications = false,
}: {
  takeMethere: (screenName: string, routeParams?: Object) => void;
  count: number;
  notificationIconStatus?: NotificationIconStatusType;
  hideNotifications?: boolean;
}) => {
  const {freemium} = useDataProvider();
  return (
    <>
      <View style={styles.containerLeft}>
        <ClickableIcon
          iconAsset={ProfileDefault}
          iconColor=""
          onClickFn={() => takeMethere('ProfileFlowNavigation')}
          variant="circle"
        />
        <ImageWithView
          imageSource={WhiteLogo}
          mode="contain"
          tintColor={Pallete.Eggplant}
          customStyle={{width: '48%', height: '100%'}}
          isLocalImage
          width={'100%'}
          height={'100%'}
        />
      </View>
      <View style={[styles.containerRight, s.pr3]}>
        <ClickableIcon
          iconAsset={freemium ? FreemiumChat : ChatI}
          iconColor={Pallete.Eggplant}
          onClickFn={() =>
            takeMethere(
              freemium ? 'LockedFeaturesScreen' : 'ChatScreenNavigation',
              freemium
                ? {
                    headerTitle: 'Chat Sessions',
                    contentKey: 'ChatSession',
                  }
                : undefined, // Pass undefined to omit route parameters
            )
          }
          variant="box"
        />
        {hideNotifications ? null : (
          <NotifyIcon count={count} status={notificationIconStatus} />
        )}
      </View>
    </>
  );
};
const HeaderWithIconsComponent = ({
  count,
  scrollDistance,
  notificationIconStatus = 'PLAY',
  hideNotifications = false,
}: Props) => {
  const {countNotification, setNotifications, setCountNotification} =
    useDataProvider();
  const navigation = useNavigation<NavigationProp<any, any>>();
  const takeMethere = (screen: string, routeParams?: Object) => {
    navigation.navigate(screen, routeParams);
  };

  const initNotifications = () => {
    getNotifications()
      .then(res => {
        setNotifications(res.data.content);
        let count = countNotReadNotifications(res.data.content);
        setCountNotification(count);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    initNotifications();
    const intervalId = setInterval(() => {
      initNotifications();
    }, NOTIFICATION_POLLING_INTERVAL);

    return () => clearInterval(intervalId);
  }, []);

  const [notificationBellRingingStatus, setNotificationBellRingingStatus] =
    React.useState<NotificationIconStatusType>('RESET');

  useEffect(() => {
    setNotificationBellRingingStatus(notificationIconStatus);

    const timeoutId = setTimeout(() => {
      setNotificationBellRingingStatus('RESET');
    }, NOTIFICATION_BELL_RINGING_DURATION);

    return () => clearInterval(timeoutId);
  }, [notificationIconStatus, countNotification]);
  return (
    <>
      {!scrollDistance && (
        <View style={styles.mainContainer}>
          <HeaderContent
            takeMethere={takeMethere}
            count={count}
            notificationIconStatus={notificationBellRingingStatus}
            hideNotifications={hideNotifications}
          />
        </View>
      )}
      {scrollDistance && (
        <MotiView
          animate={{opacity: scrollDistance ? 1 : 0}}
          transition={{
            type: 'timing',
            duration: 500,
          }}>
          <ImageBackground
            style={[styles.mainContainer]}
            blurRadius={90}
            source={White}
            imageStyle={{width: null, height: null, opacity: 0.9}}>
            <HeaderContent
              takeMethere={takeMethere}
              count={count}
              notificationIconStatus={notificationBellRingingStatus}
              hideNotifications={hideNotifications}
            />
          </ImageBackground>
        </MotiView>
      )}
    </>
  );
};

export default HeaderWithIconsComponent;
export const styles = StyleSheet.create({
  containerLeft: {
    width: '55%',
    height: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  containerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    justifyContent: 'flex-end',
    width: '45%',
    height: '95%',
  },
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: verticalScale(33),
    height: verticalScale(64),
    backgroundColor: 'transparent',
    flex: 1,
  },
});

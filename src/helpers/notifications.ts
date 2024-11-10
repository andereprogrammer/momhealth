import {api} from '../api/useAuth';
import {apiEndPointList} from '../constants';
import {Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee, {
  AndroidImportance,
  EventDetail,
  EventType,
} from '@notifee/react-native';
import firebase from '@react-native-firebase/app';
import {NavigationProp} from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {getSessionInfoById} from '../api/sessionBooking';
import {extractSingleSessionInfo} from '../feature/session/helpers/sessionObjectDestructuring';
import {openUrl} from 'react-native-markdown-display';

export const setupNotifications = async (
  navigation: NavigationProp<any, any>,
) => {
  console.log('setupNotifications-' + Platform.OS + '-called');

  let androidPermission = true;
  if (Platform.OS === 'android') {
    let permissionStatus = await request(
      PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
    );
    androidPermission = permissionStatus === RESULTS.GRANTED;
  }

  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled && androidPermission) {
    console.log('Authorization status:', authStatus);

    messaging().onTokenRefresh(onTokenRefresh);

    await checkChannelPermission();

    const token = await messaging().getToken();

    let regResponse = await registerDevice(token);
    if (regResponse.status === 200) {
      console.log('Device Registered successfully on ' + Platform.OS);
    } else {
      console.log('Issue registering device');
    }

    const channelId = await notifee.createChannel({
      id: 'chat',
      name: 'Chat',
      importance: AndroidImportance.HIGH,
    });

    const initialNotification = await notifee.getInitialNotification();

    if (initialNotification) {
      console.log(
        'Notification caused application to open',
        initialNotification,
      );
    }

    notifee.onForegroundEvent(async ({type, detail}) => {
      if (type === EventType.PRESS) {
        actionMapping(navigation, detail);
        console.log('User pressed the foreground notification.', detail);
      }
    });
  }
};
const registerDevice = (deviceToken: string) => {
  const data = {
    os: Platform.OS === 'ios' ? 'IOS' : 'ANDROID',
    type: 'MOBILE',
    token: deviceToken,
  };
  return api.post(apiEndPointList.DEVICE_REGISTER, data);
};

export const onMessageReceived = async (message: any) => {
  const channelId = 'chat';
  console.log('foreground-notification on ', Platform.OS, message);
  await notifee.displayNotification({
    id: message.messageId,
    title: message.notification.title,
    body: message.notification.body,
    data: message.data,
    android: {
      channelId,
      importance: AndroidImportance.HIGH,
    },
  });
};

export const onBackgroundMessageReceived = async (message: any) => {
  console.log('background-notification on ', Platform.OS, message);
  const channelId = 'chat';
  await notifee.displayNotification({
    title: message.notification.title,
    body: message.notification.body,
    data: message.data,
    android: {
      channelId,
      importance: AndroidImportance.HIGH,
    },
  });
};

const onTokenRefresh = async (message: any) => {
  console.log('token-refresh on ', Platform.OS, message);
};

const actionMapping = (
  navigation: NavigationProp<any, any>,
  detail: EventDetail,
) => {
  switch (detail.notification?.data?.type) {
    case 'CHAT':
      navigation.navigate('ChatScreenNavigation');
      break;
    case 'SESSION':
      console.log('Action Mapping data', detail.notification?.data);
      const sessionId = detail.notification?.data?.refId;
      openUrl(`everheal://sessions/${sessionId}`);
      break;
    case 'WEBINAR':
      openUrl('everheal://webinars/webinar');
      break;
    case 'NOTIFICATION_CENTER':
      openUrl('everheal://notification_center');
      break;
  }
};

async function checkChannelPermission() {
  const channel = await notifee.getChannel('chat');

  if (channel?.blocked) {
    console.log('Channel is disabled');
  } else {
    console.log('Channel is enabled');
  }
}

export const logDeviceInfo = () => {
  let data = {
    system_version: DeviceInfo.getSystemVersion(),
    system_type: DeviceInfo.getSystemName(),
    device_id: DeviceInfo.getDeviceId(),
    device_brand: DeviceInfo.getBrand(),
    app_version: DeviceInfo.getReadableVersion(),
  };
  console.log('device data', data);
  api
    .post(apiEndPointList.DEVICE_LOG, data)
    .then(response => {
      console.log('logDeviceInfo', response.headers);
    })
    .catch(reason => {
      console.log('logDeviceInfo', reason);
    });
};

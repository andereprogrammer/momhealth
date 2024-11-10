import {logFacebookEvent} from '../api/homeapis';
import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';

export type FacebookEventLog = {
  name: string;
  device_os: string;
  device_os_version: string;
  ip: string;
  user_agent: string;
};

export const logEvent = async (eventName: string) => {
  let device_os = Platform.OS === 'android' ? 'ANDROID' : 'IOS';
  let event: FacebookEventLog = {
    name: eventName,
    device_os: device_os,
    device_os_version: DeviceInfo.getSystemVersion(),
    ip: await DeviceInfo.getIpAddress(),
    user_agent: await DeviceInfo.getUserAgent(),
  };
  console.log('logEvent event', event);
  try {
    let res = await logFacebookEvent(event);
    console.log('logEvent event res', res);
  } catch (error) {
    console.log('logEvent event error', error);
  }
};

import appsFlyer from 'react-native-appsflyer';
import {Platform} from 'react-native';

export const initAppFlyer = () => {
  let options = {};
  if (
    process.env.APPSFLYER_ANDROID_KEY === undefined ||
    process.env.APPSFLYER_IOS_KEY === undefined
  ) {
    console.log('Could not init Appsflyer, keys not present');
    return;
  }
  if (Platform.OS === 'android') {
    console.log('Setting appsflyer for android');
    options = {
      devKey: process.env.APPSFLYER_ANDROID_KEY,
      isDebug: false,
      onInstallConversionDataListener: true, //Optional
      onDeepLinkListener: true, //Optional
      timeToWaitForATTUserAuthorization: 10, //for iOS 14.5
    };
  } else if (Platform.OS === 'ios') {
    console.log('Setting appsflyer for ios');
    options = {
      devKey: process.env.APPSFLYER_IOS_KEY,
      isDebug: false,
      appId: 'id6462846061',
      onInstallConversionDataListener: true, //Optional
      onDeepLinkListener: true, //Optional
      timeToWaitForATTUserAuthorization: 10, //for iOS 14.5
    };
  }
  appsFlyer.initSdk(
    options,
    result => {
      console.log(result);
    },
    error => {
      console.error(error);
    },
  );
};

export const logAppsFlyerEvent = (eventName: string, eventValues: object) => {
  appsFlyer.logEvent(eventName, eventValues).then(value => {
    console.log('AppsFlyer log event response', eventName, eventValues, value);
  });
};

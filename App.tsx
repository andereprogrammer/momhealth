/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useRef} from 'react';
import {ThemeProvider} from '@shopify/restyle';
import theme from './src/theme/Theme';
import {Linking, Platform, StatusBar, Text, useColorScheme} from 'react-native';
import 'react-native-get-random-values';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import OnboardingStackNavigatior from './src/feature/onboarding/navigation/OnboardingStackNavigatior';
import {DataProvider} from './src/context-store/useDataProvider';
import {AxiosProvider} from './src/context-store/AxiosContent';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RealmProvider} from './src/feature/chat/database/contextForRealm';
import * as Sentry from '@sentry/react-native';
import {BASE_URL} from './src/constants';
import ChatProvider from './src/context-store/chat/ChatProvider';
import Orientation from 'react-native-orientation-locker';
import messaging from '@react-native-firebase/messaging';
import {onMessageReceived} from './src/helpers/notifications';
import {CacheManager} from '@georstat/react-native-image-cache';
import {Dirs} from 'react-native-file-access';
import notifee, {EventType} from '@notifee/react-native';
import SpInAppUpdates, {IAUUpdateKind} from 'sp-react-native-in-app-updates';
import {StartUpdateOptions} from 'sp-react-native-in-app-updates/lib/typescript/types';
import SessionNotificationNavigationScreen from './src/feature/session/screens/SessionNotificationNavigationScreen';
import SessionNotificationNavigation from './src/feature/notifications/sessions/SessionNotificationNavigation';
import FreemiumFlowNavigation from './src/feature/freemium/navigation/FreemiumFlowNavigation';
import {isAuthenticated} from './src/api/useAuth';
import {getPatientBasic} from './src/api/homeapis';
import {navigationOnLoad} from './src/components/InputComponent/PressableOTPComponent';
import * as amplitude from '@amplitude/analytics-react-native';
import {trackEvent} from './src/helpers/product_analytics';
import YourTheme from './src/feature/dashboard/navigation/BottomTabNavigation/theme';
import {Pallete} from './src/theme/enum';
import {initAppFlyer} from './src/helpers/appsFlyer';
import * as Updates from 'expo-updates';

CacheManager.config = {
  baseDir: `${Dirs.CacheDir}/images_cache/`,
  blurRadius: 15,
  cacheLimit: 1024 * 1024 * 256,
  maxRetries: 3 /* optional, if not provided defaults to 0 */,
  retryDelay: 100 /* in milliseconds, optional, if not provided defaults to 0 */,
  sourceAnimationDuration: 100,
  thumbnailAnimationDuration: 100,
  getCustomCacheKey: (source: string) => {
    let newCacheKey = source;
    if (source.includes('?')) {
      newCacheKey = source.substring(0, source.lastIndexOf('?'));
    }
    return newCacheKey;
  },
};
let env = process.env.REACT_APP_ENV;

const config = {
  screens: {
    HomeTabNavigator: {
      screens: {
        // ChatStackNavigation: {
        //   screens: {
        //     ChatScreenNavigation: {
        //       screens: {
        //         ChatUserListScreen: 'chat',
        //       },
        //     },
        //   },
        // },
        FreemiumFlowNavigation: {
          initialRouteName: 'FreemiumHomeScreen',
          screens: {
            NotificationBayScreen: 'notification_center',
          },
        },
      },
    },
    WebinarFlowNavigation: {
      screens: {
        WebinarHomeScreen: 'webinars/:type',
      },
    },
    SessionNotificationNavigation: {
      screens: {
        SessionNotificationNavigationScreen: 'sessions/:id',
      },
    },
  },
};

// TODO: Revamp the linking object to better accommodate extension
const linking = {
  prefixes: ['everheal://'],
  config,
  async getInitialURL() {
    let url = await Linking.getInitialURL();
    console.log('################# getInitialURL', url);
    if (url !== null) {
      return url;
    }
    const message = await messaging().getInitialNotification();
    console.log('getInitialNotification', message);
    switch (message?.data?.type) {
      case 'CHAT':
        return 'everheal://chat';
      case 'SESSION':
        const sessionId = message?.data?.ref_id;
        url = `everheal://sessions/${sessionId}`;
        break;
      case 'WEBINAR':
        const webinarType = message?.data?.sub_type;
        url = `everheal://webinars/${webinarType}`;
        break;
      case 'NOTIFICATION_CENTRE':
        url = 'everheal://notification_center';
    }
  },
  subscribe(listener) {
    // Listen to incoming links from deep linking

    const onReceiveURL = ({url}: {url: string}) => {
      console.log('got link addEventListener', url);
      listener(url);
    };

    const linkingSubscription = Linking.addEventListener('url', onReceiveURL);

    const unsubscribeNotification = messaging().onNotificationOpenedApp(
      message => {
        console.log('onNotificationOpenedApp', message);
        let url;
        switch (message?.data?.type) {
          case 'CHAT':
            url = 'everheal://chat';
            break;
          case 'SESSION':
            const sessionId = message?.data?.ref_id;
            url = `everheal://sessions/${sessionId}`;
            break;
          case 'WEBINAR':
            const webinarType = message?.data?.sub_type;
            url = `everheal://webinars/${webinarType}`;
            break;
          case 'NOTIFICATION_CENTRE':
            url = 'everheal://notification_center';
        }
        if (url) {
          // Any custom logic to check whether the URL needs to be handled

          // Call the listener to let React Navigation handle the URL
          listener(url);
        }
      },
    );

    return () => {
      // Clean up the event listeners
      linkingSubscription.remove();
      unsubscribeNotification();
    };
  },
};

if (env === 'dev') {
  Sentry.init({
    dsn: 'https://9a515df0f1bf50c84d80a00cfbc0158a@o4505833077407744.ingest.sentry.io/4506302662180869',
    enabled: false,
    environment: 'dev',
  });
} else if (env === 'beta') {
  Sentry.init({
    dsn: 'https://9a515df0f1bf50c84d80a00cfbc0158a@o4505833077407744.ingest.sentry.io/4506302662180869',
    environment: 'beta',
    tracesSampleRate: 1.0,
  });
} else if (env === 'prod') {
  Sentry.init({
    dsn: 'https://9a515df0f1bf50c84d80a00cfbc0158a@o4505833077407744.ingest.sentry.io/4506302662180869',
    environment: 'prod',
    tracesSampleRate: 1.0,
  });
}
let options =
  Platform.OS === 'android'
    ? {deploymentKey: process.env.CODE_PUSH_ANDROID}
    : {};

const inAppUpdates = new SpInAppUpdates(
  false, // isDebug
);
// curVersion is optional if you don't provide it will automatically take from the app using react-native-device-info
inAppUpdates.checkNeedsUpdate().then(result => {
  console.log('checkNeedsUpdate', result);
  if (result.shouldUpdate) {
    let updateOptions: StartUpdateOptions = {};
    if (Platform.OS === 'android') {
      // android only, on iOS the user will be promped to go to your app store page
      updateOptions = {
        updateType: IAUUpdateKind.FLEXIBLE,
      };
    } else {
      updateOptions = {
        message:
          'There is an updated version available on the App Store. Would you like to update?',
      };
    }
    inAppUpdates.startUpdate(updateOptions); // https://github.com/SudoPlz/sp-react-native-in-app-updates/blob/master/src/types.ts#L78
  }
});

initAppFlyer();

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  if (Platform.OS === 'android') {
    StatusBar.setBarStyle('default');
    StatusBar.setBackgroundColor('rgba(0,0,0,0)');
    StatusBar.setTranslucent(true);
  } else {
    StatusBar.setBarStyle('dark-content');
  }
  console.log(
    'Started with backend endpoint ',
    process.env.REACT_APP_NEXUS_BASE_URL,
  );
  console.log('Started with baseurl endpoint ', BASE_URL);

  Orientation.lockToPortrait();
  amplitude.init(process.env.AMPLITUDE_API_KEY);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(onMessageReceived);

    return unsubscribe;
  }, []);

  // const onBgMessage = messaging().setBackgroundMessageHandler(
  //   onBackgroundMessageReceived,
  // );

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };
  const navigationContainerRef = useNavigationContainerRef();
  const routeNameRef = useRef();

  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync();
      console.log(update);

      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      console.warn(
        `EAS_UPDATE_ERROR: Error fetching latest Expo update: ${error}`,
      );
    }
  }
  const getChannelName = () => {
    if (Updates.channel) {
      return Updates.channel;
    } else {
      return 'Channel information is not available';
    }
  };

  async function getAndroidUpdateId() {
    console.log('Update id', Updates.updateId);
    if (Platform.OS !== 'android') {
      console.log('This is not an Android device');
      return null;
    }
    if (Updates.manifest) {
      const updateId = Updates.manifest.id;
      console.log('Android Update ID:', Updates.manifest);
      return updateId;
    } else {
      console.log('No update manifest found');
      return null;
    }
  }

  async function fetchAndroidId() {
    const updateId = await getAndroidUpdateId();
    if (updateId) {
      console.log('Current Android Update ID:', updateId);
    }
  }

  useEffect(() => {
    console.log("User's channel: ", getChannelName());
    fetchAndroidId();
  }, []);

  useEffect(() => {
    onFetchUpdateAsync().then(data => console.log('EAS_UPDATE_SUCCESS', data));
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ThemeProvider theme={theme}>
        <NavigationContainer
          ref={navigationContainerRef}
          theme={YourTheme}
          onStateChange={async () => {
            const previousRouteName = routeNameRef.current;
            const currentRouteName =
              navigationContainerRef.getCurrentRoute().name;
            if (previousRouteName !== currentRouteName) {
              // Save the current route name for later comparison
              routeNameRef.current = currentRouteName;

              // Replace the line below to add the tracker from a mobile analytics SDK
              trackEvent('screen', currentRouteName, 'loaded');
            }
          }}
          linking={linking}
          fallback={<Text>Loading...</Text>}>
          <AxiosProvider>
            <DataProvider>
              <RealmProvider>
                <ChatProvider>
                  <OnboardingStackNavigatior />
                </ChatProvider>
              </RealmProvider>
            </DataProvider>
          </AxiosProvider>
        </NavigationContainer>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

export default Sentry.wrap(App);

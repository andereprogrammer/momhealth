import React, {useEffect, useLayoutEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../../screens/HomeScreen';
import ChatScreenNavigation from '../../../chat/Navigation/ChatScreenNavigation';
import CareTeamChat from '../../../chat/components/CareTeamChat';
import ContentHomeScreen from '../../../content/screens/ContentHomeScreen';
import PersonalJournalHomeScreen from '../../../personaljournal/screens/PersonalJournalHomeScreen';
import PersonalJournalWritingScreen from '../../../personaljournal/screens/PersonalJournalWritingScreen';
import CalendarListScreen from '../../../personaljournal/components/CalendarListScreen';
import {
  getFocusedRouteNameFromRoute,
  useFocusEffect,
} from '@react-navigation/native';
import {verticalScale} from '../../../../helpers/layoutHelper';
import ReportsFlowNavigation from '../../../reports/navigation/ReportsFlowNavigation';
import SessionFullDetailsScreen from '../../../session/screens/SessionFullDetailsScreen';
import {Welcome} from '../../../videoStreaming/screens/Welcome';
import PackagesFlowNavigation from '../../../packages/navigation/PackagesFlowNavigation';
import ActivityFlowNavigation from '../../../activities/navigation/ActivityFlowNavigation';
import AppStackNavigator from '../../../videoStreaming/navigator';
import SessionHomeScreen from '../../../session/screens/SessionHomeScreen';
import SessionFlowNavigation from '../../../session/navigation/SessionFlowNavigation';
import DownloadWebViewScreen from '../../../../components/DownloadWebViewComponent/DownloadWebViewScreen';
import ProfileFlowNavigation from '../../../profile/navigation/ProfileFlowNavigation';
import CareTeamFlowNavigation from '../../../careteam/navigation/CareTeamFlowNavigation';
import {Provider} from 'react-redux';
import {store} from '../../../videoStreaming/redux';
import MustDoHomeScreen from '../../../activities/screens/MustDoHomeScreen';
import {updateStatusBar} from '../../components/ScreenHooks';
import useDataProvider from '../../../../context-store/useDataProvider';
import {isUserLoggedIn} from '../../../../api/useAuth';
import ActivityHomeScreen from '../../../activities/screens/ActivityHomeScreen';
import VideoActivityScreen from '../../../activities/screens/VideoActivityScreen';
import ActivityContentScreen from '../../../activities/screens/ActivityContentScreen';
import PDFActivityScreen from '../../../activities/screens/PDFActivityScreen';
import MustDoTopNavigation from '../../../activities/navigation/MustDoTopNavigation';
import ReportsUploadScreen from '../../../reports/screens/ReportsUploadScreen';
import AllSessionScreen from '../../../session/screens/AllSessionScreen';
import {Meeting} from '../../../videoStreaming/screens/MeetingScreen';
import SessionNotesViewScreen from '../../../session/screens/SessionNotesViewScreen';
import ActivityTopNavigation from '../../../activities/navigation/ActivityTopNavigation';
import InsightHomeScreen from '../../../insights/screens/InsightHomeScreen';
import InsightMainScreen from '../../../insights/screens/InsightMainScreen';
import CarePersonDetailsScreen from '../../../careteam/screens/CarePersonDetailsScreen';
import ExpertNotesDetailsScreen from '../../../chat/components/ExpertNoteDetailsScreen';
import POGHomeScreen from '../TopNavigation/POGHomeScreen';
import WebViewScreen from '../../../../components/DownloadWebViewComponent/WebViewScreen';
import ReportsHomeScreen from '../../../reports/screens/ReportsHomeScreen';
import NotificationBayScreen from '../../../inappnotifications/screens/NotificationBayScreen';
import VideoScreen from '../../screens/VideoScreen';
import TipOfTheDayScreen from '../../../tipoftheday/screens/TipOfTheDayScreen';
import PogFlowNavigation from '../../../pog/navigation/PogFlowNavigation';
import PogBioDigitalScreen from '../../../pog/screens/PogBioDigitalScreen';
import PogFreemiumAdScreen from '../../../pog/screens/PogFreemiumAdScreen';

const DashboardNavigationStack = ({navigation, route}) => {
  const Stack = createNativeStackNavigator();
  const {setStatusBarStyle, setActivePackages} = useDataProvider();

  useFocusEffect(
    React.useCallback(() => {
      const routeName = getFocusedRouteNameFromRoute(route) ?? 'HomeScreen';
      // updateStatusBar(routeName);
      updateStatusBar(routeName);
      // if(routeName === 'HomeScreen') {
      //   setStatusBarStyle("light-content");
      // } else {
      //   setStatusBarStyle("dark-content");
      // }
      console.log('Dashboard_Calling_isUserLoggedIn', navigation);
      isUserLoggedIn().then(value => {
        console.log('Value', value);
        if (value !== 'true') {
          navigation.navigate('OnboardingShowCase');
        }
      });
      console.log('Current', routeName);
      if (
        routeName === 'SessionFullDetailsScreen' ||
        routeName === 'PackagesFlowNavigation' ||
        routeName === 'SessionFlow' ||
        routeName === 'CareTeamChat' ||
        routeName === 'PersonalJournalWritingScreen' ||
        routeName === 'ReportsFlowNavigation' ||
        routeName === 'ReportsUploadScreen' ||
        routeName === 'WelcomeScreen' ||
        routeName === 'MeetingScreen' ||
        routeName === 'AllSessionScreen' ||
        routeName === 'InsightMainScreen' ||
        routeName === 'VideoActivityScreen' ||
        routeName === 'InsightHomeScreen' ||
        routeName === 'SessionNotificationNavigationScreen' ||
        routeName === 'ActivityContentScreen' ||
        routeName === 'NotificationBayScreen' ||
        routeName === 'VideoScreen' ||
        routeName === 'TipOfTheDayScreen' ||
        routeName === 'PogFlowNavigation' ||
        routeName === 'PogBioDigitalScreen' ||
        routeName === 'PogFreemiumAdScreen'
      ) {
        navigation.setOptions({tabBarStyle: {display: 'none'}});
      } else {
        navigation.setOptions({
          tabBarStyle: {
            display: 'flex',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            width: '100%',
            backgroundColor: 'rgba(0,0,0,0)',
            marginBottom: verticalScale(8),
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
        });
      }
    }, [navigation, route]),
  );
  const WelcomeScreen = () => {
    return (
      <Provider store={store}>
        <Welcome />
      </Provider>
    );
  };
  const SecondComponent = () => {
    return (
      <Provider store={store}>
        <Meeting />
      </Provider>
    );
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="PogFlowNavigation"
        component={PogFlowNavigation}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="PogBioDigitalScreen"
        component={PogBioDigitalScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="PogFreemiumAdScreen"
        component={PogFreemiumAdScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="VideoScreen"
        component={VideoScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TipOfTheDayScreen"
        component={TipOfTheDayScreen}
        options={{
          headerShown: false,
          gestureDirection: 'vertical',
        }}
      />

      <Stack.Screen
        name="NotificationBayScreen"
        component={NotificationBayScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Group>
        <Stack.Screen
          name="ChatScreenNavigation"
          component={ChatScreenNavigation}
          options={{
            headerShown: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="CareTeamChat"
          component={CareTeamChat}
          options={{
            headerShown: false,
            headerTitle: '',
          }}
        />

        <Stack.Screen
          name="ExpertNotesDetailsScreen"
          component={ExpertNotesDetailsScreen}
          options={{
            headerShown: false,
            headerTitle: '',
          }}
        />
      </Stack.Group>
      <Stack.Screen
        name="ContentHomeScreen"
        component={ContentHomeScreen}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Group>
        <Stack.Screen
          name="PersonalJournalHomeScreen"
          component={PersonalJournalHomeScreen}
          options={{
            headerShown: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="PersonalJournalWritingScreen"
          component={PersonalJournalWritingScreen}
          options={{
            headerShown: true,
            headerTitle: 'New Entry',
            title: '',
            headerBackButtonMenuEnabled: false,
          }}
        />
      </Stack.Group>
      <Stack.Screen
        name="InsightHomeScreen"
        component={InsightHomeScreen}
        options={{
          headerShown: false,
          title: '',
          headerBackButtonMenuEnabled: false,
        }}
      />
      <Stack.Screen
        name="InsightMainScreen"
        component={InsightMainScreen}
        options={{
          headerShown: false,
          headerBackTitle: '',
          headerBackTitleVisible: false,
          header: () => {
            return <CustomHeader title="Mood Tracker" />;
          },
        }}
      />
      <Stack.Group>
        <Stack.Screen
          name="ReportsFlowNavigation"
          component={ReportsFlowNavigation}
          options={{
            headerShown: false,
            headerTitle: 'Reports',
            title: '',
            headerBackButtonMenuEnabled: false,
          }}
        />
        <Stack.Screen
          name="ReportsUploadScreen"
          component={ReportsUploadScreen}
          options={{
            headerShown: true,
            headerTitle: 'Reports',
            title: '',
            headerBackButtonMenuEnabled: false,
          }}
        />
        <Stack.Screen
          name="ReportsHomeScreen"
          component={ReportsHomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DownloadWebViewScreen"
          component={DownloadWebViewScreen}
          options={({route}) => ({
            headerShown: true,
            headerTitle: route.params.name,
          })}
        />
        <Stack.Screen
          name="WebViewScreen"
          component={WebViewScreen}
          options={({route}) => ({
            headerShown: true,
            headerTitle: route.params.name,
          })}
        />
      </Stack.Group>

      <Stack.Screen
        name="CalendarListScreen"
        component={CalendarListScreen}
        options={{
          headerShown: true,
          headerTitle: 'Calendar',
          title: '',
          headerBackButtonMenuEnabled: false,
        }}
      />
      <Stack.Group>
        <Stack.Screen
          name="SessionFullDetailsScreen"
          component={SessionFullDetailsScreen}
          options={{
            headerShown: false,
            headerTitle: 'Calendar',
            title: '',
            headerBackButtonMenuEnabled: true,
          }}
        />
        <Stack.Screen
          name="CarePersonDetailsScreen"
          component={CarePersonDetailsScreen}
          options={{
            headerShown: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="SessionHomeScreen"
          component={SessionHomeScreen}
          options={{
            headerShown: false,
            headerTitle: 'Calendar',
            title: '',
            headerBackButtonMenuEnabled: true,
          }}
        />
        <Stack.Screen
          name="SessionNotesViewScreen"
          component={SessionNotesViewScreen}
          options={{
            headerShown: false,
            title: '',
            headerBackButtonMenuEnabled: true,
          }}
        />
        <Stack.Screen
          name="SessionFlow"
          component={SessionFlowNavigation}
          options={{
            headerShown: false,
            headerTitle: 'Calendar',
            title: '',
            headerBackButtonMenuEnabled: true,
          }}
        />
        <Stack.Screen
          name="AllSessionScreen"
          component={AllSessionScreen}
          options={{
            headerShown: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{
            headerShown: false,
            headerTitle: 'Session',
            title: '',
            headerBackButtonMenuEnabled: true,
          }}
        />
        <Stack.Screen
          name="MeetingScreen"
          component={SecondComponent}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SessionHMS"
          component={AppStackNavigator}
          options={{
            headerShown: true,
            headerTitle: 'Session',
            title: '',
            headerBackButtonMenuEnabled: true,
          }}
        />
      </Stack.Group>
      <Stack.Screen
        name="PackagesFlowNavigation"
        component={PackagesFlowNavigation}
        options={{
          headerShown: false,
          headerTitle: 'Calendar',
          title: '',
          headerBackButtonMenuEnabled: true,
        }}
      />
      <Stack.Group>
        <Stack.Screen
          name="ActivityFlowNavigation"
          component={ActivityFlowNavigation}
          options={{
            headerShown: true,
            headerTitle: 'Activities',
            // title: 'Activities',
            // headerBackButtonMenuEnabled: true,
          }}
        />
        <Stack.Screen
          name="ActivityHomeScreen"
          component={ActivityHomeScreen}
          options={{
            headerShown: true,
            headerTitle: 'Activities',
            // title: 'Activities',
            // headerBackButtonMenuEnabled: true,
          }}
        />
        <Stack.Screen
          name="ActivityTopNavigation"
          component={ActivityTopNavigation}
          options={{
            headerShown: false,
            headerTitle: 'Activities',
            // title: 'Activities',
            // headerBackButtonMenuEnabled: true,
          }}
        />

        <Stack.Screen
          name="ActivityContentScreen"
          component={ActivityContentScreen}
          options={{
            headerShown: false,
            headerTitle: 'Must Do',
          }}
        />
        <Stack.Screen
          name="VideoActivityScreen"
          component={VideoActivityScreen}
          options={{
            headerShown: false,
            headerTitle: ' ',
            headerBackTitle: '',
          }}
        />
        <Stack.Screen
          name="PDFActivityScreen"
          component={PDFActivityScreen}
          options={{
            headerShown: true,
            headerTitle: ' ',
            headerBackTitle: '',
          }}
        />
      </Stack.Group>

      <Stack.Screen
        name="MustDoTopNavigation"
        component={MustDoTopNavigation}
        options={{
          headerShown: true,
          headerTitle: 'Lifestyle Recommendations',
          title: '',
          headerBackButtonMenuEnabled: true,
        }}
      />
      <Stack.Screen
        name="ProfileFlowNavigation"
        component={ProfileFlowNavigation}
        options={{
          headerShown: false,
          headerTitle: 'Profile',
          title: '',
          headerBackButtonMenuEnabled: true,
        }}
      />
      <Stack.Screen
        name="CareTeamFlowNavigation"
        component={CareTeamFlowNavigation}
        options={{
          headerShown: false,
          headerTitle: '',
          title: '',
          headerBackButtonMenuEnabled: true,
        }}
      />
    </Stack.Navigator>
  );
};
export default DashboardNavigationStack;

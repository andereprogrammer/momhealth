import React from 'react';
import {View, StyleSheet, ImageProps} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
//Navigation imports
import DashboardNavigationStack from '../StackNavigations/DashboardNavigationStack';
import InsightsFlowNavigation from '../../../insights/navigation/InsightsFlowNavigation';
import GarbhSanskarFlowNavigation from '../../../garbhsanskar/navigation/GarbhSanskarFlowNavigation';
import ActivityFlowNavigation from '../../../activities/navigation/ActivityFlowNavigation';
import FreemiumFlowNavigation from '../../../freemium/navigation/FreemiumFlowNavigation';
import ContentInsightFlowNavigation from '../../../content-insights/navigation/ContentInsightFlowNavigation';
import FreemiumPackageNavigation from '../../../freemium/features/packages/navigation/FreemiumPackageNavigation';
import FreemiumSessionNavigationScreen from '../../../freemium/features/sessions/FreemiumSessionNavigationScreen';
//helpers & events
import {isAuthenticated} from '../../../../api/useAuth';
import useDataProvider from '../../../../context-store/useDataProvider';
import {trackEvent} from '../../../../helpers/product_analytics';
import {trigger} from 'react-native-haptic-feedback';
//assets & components
import {
  GarbhSanskarHomeIcon,
  HomeTabChat,
  HomeTabChatFilled,
  HomeTabHome,
  HomeTabHomeFilled,
  HomeTabSessions,
  HomeTabSessionsFilled,
  InsightCareIcon,
  PackageMain,
  ToolsFilled,
} from '../../../../assets';
import {fonts} from '../../../../theme/enum';
import BottomTabs from '../../components/BottomTabs';

export const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const HomeTabNavigator = () => {
  const Tab = createBottomTabNavigator();
  const navigation = useNavigation<NavigationProp<any, any>>();
  const route = useRoute();
  const {setAuthenticated, freemium} = useDataProvider();
  let free = freemium;
  useFocusEffect(
    React.useCallback(() => {
      isAuthenticated().then(value => {
        if (!value) {
          navigation.navigate('OnboardingShowCase');
        } else {
          setAuthenticated(true);
        }
      });
    }, [navigation, route]),
  );
  const renderIcon = (
    {focused}: {focused: boolean},
    filledIcon: ImageProps,
    nonFocussedIcon: ImageProps,
    tabTitle: string,
    freemiumIcon?: ImageProps,
    paid?: ImageProps,
  ) => {
    return (
      <BottomTabs
        filledIcon={filledIcon}
        nonFocussedIcon={nonFocussedIcon}
        tabTitle={tabTitle}
        free={free}
        focused={focused}
        freemiumIcon={freemiumIcon}
        paidAppicon={paid}
      />
    );
  };
  const renderBarView = () => <View style={styles.tabView} />;
  return (
    <Tab.Navigator
      screenListeners={({route}) => ({
        tabPress: () => {
          let workflow = free ? 'hometab' : 'freehometab';
          trackEvent(workflow, route.name, 'clicked');
          trigger('impactLight', options);
        },
      })}
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        headerShadowVisible: false,
        tabBarBackground: renderBarView,
        tabBarStyle: styles.barStyle,
      })}>
      <Tab.Screen
        name={free ? 'FreemiumFlowNavigation' : 'DashboardNavigationStack'}
        component={free ? FreemiumFlowNavigation : DashboardNavigationStack}
        options={{
          unmountOnBlur: true,
          tabBarStyle: styles.barStyle,
          tabBarIcon: props =>
            renderIcon(
              {...props},
              HomeTabHomeFilled,
              HomeTabHome,
              'Home',
              HomeTabHomeFilled,
              HomeTabHome,
            ),
        }}
      />
      <Tab.Screen
        name={
          free ? 'ContentInsightFlowNavigation' : 'ContentInsightFlowNavigation'
        }
        component={
          free ? ContentInsightFlowNavigation : ContentInsightFlowNavigation
        }
        options={{
          unmountOnBlur: true,
          tabBarStyle: styles.barStyle,
          tabBarIcon: props =>
            renderIcon(
              {...props},
              InsightCareIcon,
              InsightCareIcon,
              'Care',
              InsightCareIcon,
              InsightCareIcon,
            ),
        }}
      />

      <Tab.Screen
        name={free ? 'PackageHomeScreen' : 'InsightsFlowNavigation'}
        component={free ? FreemiumPackageNavigation : InsightsFlowNavigation}
        options={{
          unmountOnBlur: true,
          tabBarStyle: styles.barStyle,
          tabBarIcon: props =>
            renderIcon(
              {...props},
              PackageMain,
              PackageMain,
              free ? 'Sign-up' : 'Check-in',
              PackageMain,
              HomeTabSessions,
            ),
        }}
      />
      <Tab.Screen
        name={
          free ? 'FreemiumSessionNavigationScreen' : 'ActivityFlowNavigation'
        }
        component={
          free ? FreemiumSessionNavigationScreen : ActivityFlowNavigation
        }
        options={{
          tabBarStyle: styles.barStyle,
          unmountOnBlur: true,
          tabBarIcon: props =>
            renderIcon(
              {...props},
              HomeTabSessionsFilled,
              HomeTabSessions,
              'Sessions',
              HomeTabSessionsFilled,
              HomeTabSessions,
            ),
        }}
      />
      <Tab.Screen
        name="GarbhSanskarFlowNavigation"
        component={GarbhSanskarFlowNavigation}
        options={{
          unmountOnBlur: true,
          tabBarStyle: styles.barStyle,
          tabBarIcon: props =>
            renderIcon(
              {...props},
              GarbhSanskarHomeIcon,
              ToolsFilled,
              'Garbh sanskar',
              GarbhSanskarHomeIcon,
              ToolsFilled,
            ),
        }}
      />
    </Tab.Navigator>
  );
};
export default HomeTabNavigator;
const styles = StyleSheet.create({
  shadow: {
    elevation: 100,
  },
  tabView: {
    flex: 1,
    backgroundColor: '#2E0D47',
    borderTopWidth: 0,
    shadowColor: '#777',
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    paddingBottom: 90,
  },

  mainNavBar: {
    width: '100%',
    backgroundColor: '#2E0D47',
  },
  tabViewIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  sessionFont: {
    fontFamily: fonts.SecondaryDMSansBold,
    fontSize: 20,
    textAlign: 'center',
    flexDirection: 'row',
    width: '86%',
  },
  barStyle: {
    borderTopWidth: 0,
    elevation: 0, // for Android
    shadowOffset: {
      width: 0,
      height: 0, // for iOS
    },
    shadowColor: '#c3c3c3',
  },
});

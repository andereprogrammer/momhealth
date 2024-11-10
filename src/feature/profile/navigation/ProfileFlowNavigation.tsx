import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  getFocusedRouteNameFromRoute,
  useFocusEffect,
} from '@react-navigation/native';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import ProfileHomeScreen from '../screens/ProfileHomeScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import TermsAndConditionsScreen from '../screens/TermsAndConditionsScreen';
import ContactSupportScreen from '../screens/ContactSupportScreen';
import {updateStatusBar} from '../../dashboard/components/ScreenHooks';
import useDataProvider from '../../../context-store/useDataProvider';
import ChatScreenNavigation from '../../chat/Navigation/ChatScreenNavigation';
import CareTeamChat from '../../chat/components/CareTeamChat';
import ChatStackNavigation from '../../chat/Navigation/ChatStackNavigation';
import ExpertNotesDetailsScreen from '../../chat/components/ExpertNoteDetailsScreen';
import SessionNoteDetailsScreen from '../../chat/components/SessionNoteDetailsScreen';
import {ChatSearchScreen} from '../../chat/screens/ChatSearchScreen';
import FreemiumPackageHomeScreen from "../../freemium/features/packages/FreemiumPackageHomeScreen";
import PackageSuccessScreen from "../../packages/screens/PackageSuccessScreen";

// export type RootStackParamList = {
//   InsightHomeScreen: undefined;
//   InsightMainScreen: undefined;
// };
const Stack = createNativeStackNavigator();

const ProfileFlowNavigation = ({navigation, route}) => {
  const {setStatusBarStyle} = useDataProvider();
  useFocusEffect(
    React.useCallback(() => {
      const routeName =
        getFocusedRouteNameFromRoute(route) ?? 'ProfileHomeScreen';
      console.log('Current', routeName);
      updateStatusBar(routeName);
      if (routeName !== 'ProfileHomeScreen') {
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
          },
        });
      }
    }, [navigation, route]),
  );

  return (
    <Stack.Navigator initialRouteName="ProfileHomeScreen">
      <Stack.Screen
        name="ProfileHomeScreen"
        component={ProfileHomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Group>
        <Stack.Screen
          name="ChatScreenNavigation"
          component={ChatScreenNavigation}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CareTeamChat"
          component={CareTeamChat}
          options={{
            headerShown: false,
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
        <Stack.Screen
          name="SessionNoteDetailsScreen"
          component={SessionNoteDetailsScreen}
          options={{
            headerShown: false,
            headerTitle: '',
          }}
        />

        <Stack.Screen
          name="ChatSearchScreen"
          component={ChatSearchScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Group>

      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PrivacyPolicyScreen"
        component={PrivacyPolicyScreen}
        options={{
          headerShown: true,
          headerTitle: 'Privacy policy',
        }}
      />
      <Stack.Screen
        name="Terms"
        component={TermsAndConditionsScreen}
        options={{
          headerShown: true,
          headerTitle: 'Terms and conditions',
        }}
      />
      <Stack.Screen
        name="Contact"
        component={ContactSupportScreen}
        options={{
          headerShown: true,
          headerTitle: 'Support',
        }}
      />
      <Stack.Screen
        name="FreemiumPackageHomeScreen"
        component={FreemiumPackageHomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PackageSuccessScreen"
        component={PackageSuccessScreen}
        options={{
          headerShown: false,
          headerTitle: 'Packages',
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileFlowNavigation;

const styles = StyleSheet.create({});

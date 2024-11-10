import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {View} from 'react-native';
import CareTeamChat from '../components/CareTeamChat';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ChatUserListScreen from '../screens/ChatUserListScreen';
import SessionListScreen from '../screens/SessionListScreen';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../helpers/layoutHelper';
import DoctorsListScreen from '../screens/DoctorsListScreen';
import XMPPChatComponent from '../components/XMPPChatComponent';
import {Realm} from '@realm/react';
import {Agent} from 'stanza';
import useDataProvider from '../../../context-store/useDataProvider';
import {
  getFocusedRouteNameFromRoute,
  useFocusEffect,
} from '@react-navigation/native';
import {updateStatusBar} from '../../dashboard/components/ScreenHooks';
import {designPalette} from '../../../theme/Theme';
import {Searchbar} from 'react-native-paper';
import {ChatSearchScreen} from '../screens/ChatSearchScreen';
import {
  ChatExpertNotesScreen,
  MedicalJournal,
} from '../screens/ChatExpertNotesScreen';
import {ChatSessionNotesScreen} from '../screens/ChatSessionNotesScreen';
import {fonts} from '../../../theme/enum';
import ChatHeader from '../components/ChatHeader';
import {Note} from '../../careteam/components/ExpertNotesCardV2';
import {SessionNote} from '../../careteam/components/SessionNotesCard';
import ChatHeaderV2 from '../components/ChatHeaderV2';
import {XmppUser} from '../../../context-store/chat/type';

export type RootStackParamList = {
  XMPPChatComponent: undefined;
  ChatUserListScreen: {id: string};
  DoctorsListScreen: {jid: string};
  CareChatWrapper: {jid: string; realm: Realm};
  CareTeamChat: {
    jid: string;
    name: string;
    isGroup: boolean;
    role: string;
    image: string;
    scrollToMessage: string;
    unreadMessage: {
      count: number;
      firstMessageId: string;
    };
    xmppUser: XmppUser;
  };
  ChatExpertNotesScreen: undefined;
  ChatSessionNotesScreen: undefined;
  ExpertNotesDetailsScreen: {
    medicalJournal: MedicalJournal;
  };
  SessionNoteDetailsScreen: {
    note: SessionNote;
    landedFrom: string;
  };
  ChatGroupDetailsScreen: {
    userId: string;
  };
};

const Tab = createMaterialTopTabNavigator<RootStackParamList>();
const ChatScreenNavigation = ({navigation, route}) => {
  const takeToChatSearch = () => {
    navigation.navigate('ChatSearchScreen');
  };
  useFocusEffect(
    React.useCallback(() => {
      const routeName =
        getFocusedRouteNameFromRoute(route) ?? 'ChatUserListScreen';
      console.log('Current', routeName);
      updateStatusBar(routeName);
    }, [navigation, route]),
  );
  const {setStatusBarStyle} = useDataProvider();
  return (
    // <SafeAreaView style={{flex: 1}}>
    <View
      style={[
        styles.container,
        Platform.OS === 'ios' ? {paddingTop: verticalScale(38)} : {},
      ]}>
      {/*<TouchableOpacity onPress={takeToChatSearch}>*/}
      {/*<Searchbar placeholder="Search" onPressIn={takeToChatSearch} />*/}
      <ChatHeader searchTerm={''} nickName={'Chat Center'} />
      {/*</TouchableOpacity>*/}
      <Tab.Navigator
        style={styles.tabContainer}
        screenOptions={{
          tabBarStyle: styles.tabBarStyle,
          tabBarLabelStyle: styles.tabLabel,
          tabBarIndicatorStyle: styles.tabIndicator,
        }}>
        <Tab.Screen
          name="ChatUserListScreen"
          component={ChatUserListScreen}
          options={({navigation}) => ({
            title: 'Care team',
            tabBarLabel: 'Care team',
            activeTintColor: '#21147a',
            inactiveTintColor: '21147a',
            activeBackgroundColor: '#21147a',
            inactiveBackgroundColor: '#21147a',
            style: {
              backgroundColor: '#FFF2D1',
            },
          })}
        />
        <Tab.Screen
          name="ChatExpertNotesScreen"
          component={ChatExpertNotesScreen}
          options={({navigation}) => ({
            title: 'Expert notes',
            tabBarLabel: 'Expert notes',
            activeTintColor: '#21147a',
            inactiveTintColor: '21147a',
            activeBackgroundColor: '#21147a',
            inactiveBackgroundColor: '#21147a',
            style: {
              backgroundColor: '#FFF2D1',
            },
          })}
        />
        <Tab.Screen
          name="ChatSessionNotesScreen"
          component={ChatSessionNotesScreen}
          options={({navigation}) => ({
            title: 'Session notes',
            tabBarLabel: 'Session notes',
            activeTintColor: '#21147a',
            inactiveTintColor: '21147a',
            activeBackgroundColor: '#21147a',
            inactiveBackgroundColor: '#21147a',
            style: {
              backgroundColor: '#FFF2D1',
            },
          })}
        />
        {/*<Tab.Screen*/}
        {/*  name="XMPPChatComponent"*/}
        {/*  component={XMPPChatComponent}*/}
        {/*  options={({navigation}) => ({*/}
        {/*    title: 'Sessions',*/}
        {/*    tabBarLabel: 'Sessions',*/}
        {/*    activeTintColor: '#21147a',*/}
        {/*    inactiveTintColor: '21147a',*/}
        {/*    activeBackgroundColor: '#21147a',*/}
        {/*    inactiveBackgroundColor: '#21147a',*/}
        {/*    style: {*/}
        {/*      backgroundColor: '#21147a',*/}
        {/*    },*/}
        {/*  })}*/}
        {/*/>*/}
        {/*<Tab.Screen*/}
        {/*  name="DoctorsListScreen"*/}
        {/*  component={DoctorsListScreen}*/}
        {/*  options={({navigation}) => ({*/}
        {/*    title: 'Doctors',*/}
        {/*    tabBarLabel: 'Doctors',*/}
        {/*    activeTintColor: '#21147a',*/}
        {/*    inactiveTintColor: '21147a',*/}
        {/*    activeBackgroundColor: '#21147a',*/}
        {/*    inactiveBackgroundColor: '#21147a',*/}
        {/*    style: {*/}
        {/*      backgroundColor: '#21147a',*/}
        {/*    },*/}
        {/*  })}*/}
        {/*/>*/}
      </Tab.Navigator>
    </View>
    // </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: horizontalScale(20),

    backgroundColor: '#fff',
  },
  tabContainer: {
    backgroundColor: 'white',
    paddingTop: verticalScale(10),
  },
  tabBarStyle: {
    borderRadius: 20,
    width: '98%',
    alignSelf: 'center',
    backgroundColor: '#FFF2D1',
  },
  tabLabel: {
    fontFamily: fonts.SecondaryDMSansBold,
    textTransform: 'none',
    fontSize: horizontalScale(14),
    marginHorizontal: 0,
  },
  tabIndicator: {
    backgroundColor: designPalette.primary.PinkHopbrush,
    width: '10%',
    borderRadius: 20,
    left: 45,
  },
});

export default ChatScreenNavigation;

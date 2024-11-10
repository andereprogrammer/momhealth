import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {Alert, Animated, ScrollView, Text, View, ViewToken} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {horizontalScale} from '../../../helpers/layoutHelper';
import UserCardComponent, {
  UserCardProps,
} from '../components/UserCardComponent';
import {Agent, createClient} from 'stanza';
import useDataProvider from '../../../context-store/useDataProvider';
import {RosterItem} from 'stanza/protocol';
import LoadingAnimationScreen from '../../animations/LoadingAnimationScreen';
import {authorizeUserchat} from '../../../api/chat';
import {RosterSubscription} from 'stanza/Constants';
import ChatContext from '../../../context-store/chat/ChatContext';
import {XmppUser} from '../../../context-store/chat/type';
import GroupChatCardComponent from '../components/GroupChatCardComponent';
import {fonts} from '../../../theme/enum';
import {items} from '@sentry/react-native/dist/js/utils/envelope';
import ChatHomeSkeleton from '../components/ChatHomeSkeleton';

export type chatProps = {
  // client: Agent;
  jid: string;
  name?: string;
  subscription: any;
  approved?: boolean;
  ask?: boolean;
  isGroup: boolean;
  groups?: string[];
  presence: boolean;
  role: string;
  image?: string;
  xmppUser: XmppUser;
};
const ChatUserListScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any, any>>();
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState<number | null>();
  let [careTeam, setCareTeam] = useState<chatProps[]>();
  const {jidUser, tokenForChat, patientDetails} = useDataProvider();
  const onboardingRef = useRef(null);
  const [client, setClient] = useState<Agent>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const {users, unreadMessageMap, chatLoaded} = useContext(ChatContext);
  const viewAbleItemChanged = useRef(
    ({viewableItems, changed}: {viewableItems: ViewToken[]}) => {
      setCurrentIndex(viewableItems[0].index);
    },
  ).current;
  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;
  const [chatUsers, setChatUsers] = useState<XmppUser[]>([]);
  const [chatGroups, setChatGroups] = useState<XmppUser[]>([]);

  useEffect(() => {
    console.log('updated users', users);
    let userArray = Array.from(users.values());
    let cUsers = userArray.filter(value => !value.isGroup);
    let groups = userArray.filter(value => value.isGroup);
    setChatUsers(Array.from(cUsers));
    setChatGroups(Array.from(groups));
  }, [users]);

  // useEffect(() => {
  //   setLoading(true);
  //   const xmppClient = createClient({
  //     jid: jidUser, // Replace with your user JID
  //     credentials: {
  //       token: tokenForChat,
  //     }, // Replace with your user password
  //     transports: {
  //       bosh: process.env.REACT_APP_XMPP_BOSH_URL, // Replace with your BOSH connection URL
  //     },
  //   });
  //
  //   xmppClient.sasl.disable('SCRAM-SHA-1');
  //   xmppClient.sasl.disable('PLAIN');
  //   xmppClient.sasl.disable('DIGEST-MD5');
  //   xmppClient.sasl.disable('SCRAM-SHA-512');
  //   xmppClient.sasl.disable('SCRAM-SHA-256');
  //
  //   setClient(xmppClient);
  //   xmppClient.on('session:started', () => {
  //     xmppClient.sendPresence();
  //
  //     xmppClient
  //       .getRoster()
  //       .then(res => {
  //         console.log('Roster', res.items);
  //         let careTeam = res?.items.map(value => {
  //           let item: chatProps = {
  //             name: value.name,
  //             ask: value.ask,
  //             approved: value.approved,
  //             jid: value.jid,
  //             groups: value.groups,
  //             isGroup: false,
  //             subscription: value.subscription,
  //           };
  //           return item;
  //         });
  //         setClient(xmppClient);
  //         getGroups(careTeam, xmppClient);
  //         setLoading(false);
  //       })
  //       .catch(e => {
  //         setLoading(false);
  //         Alert.alert('Something went wrong');
  //         console.log(e);
  //       });
  //
  //   });
  //
  //   xmppClient.connect();
  // }, []);

  useEffect(() => {
    setLoading(true);
    if (users && chatLoaded) {
      // console.log('Users on ChatUserList', users);
      // console.log('unreadMap', unreadMessageMap);
      console.log('Chat Loaded');
      setLoading(false);
    }
  }, [users, chatLoaded]);

  return (
    <View
      style={{
        flex: 1,

        backgroundColor: '#fff',
        padding: 1,
      }}>
      {loading ? (
        <ChatHomeSkeleton />
      ) : (
        <ScrollView>
          <View style={{marginLeft: 20, marginTop: 15, marginBottom: 10}}>
            <Text
              style={{
                fontFamily: fonts.SecondaryDMSansBold,
                fontSize: 12,
                color: '#9F9BA0',
              }}>
              GROUPS
            </Text>
          </View>
          {chatGroups !== null &&
            chatGroups.map(item => (
              <GroupChatCardComponent
                key={item.jid}
                name={item?.name}
                jid={item.jid}
                groups={item.groups}
                subscription={item.subscription}
                isGroup={item.isGroup}
                presence={item.presence}
                role={item.role}
                xmppUser={item}
                // client={client}
              />
            ))}
          <View style={{marginLeft: 20, marginTop: 15, marginBottom: 10}}>
            <Text
              style={{
                fontFamily: fonts.SecondaryDMSansBold,
                fontSize: 12,
                color: '#9F9BA0',
              }}>
              YOUR CARE TEAM
            </Text>
          </View>
          {chatUsers !== null &&
            chatUsers
              .filter(value => value.isVisible)
              .map(item => (
                <UserCardComponent
                  key={item.jid}
                  name={item?.name}
                  jid={item.jid}
                  groups={item.groups}
                  subscription={item.subscription}
                  isGroup={item.isGroup}
                  presence={item.presence}
                  role={item.role}
                  image={item.image}
                  xmppUser={item}
                  // client={client}
                />
              ))}
          <View
            style={{
              height: 130,
              backgroundColor: 'transparent',
            }}
          />
        </ScrollView>
      )}
    </View>
  );
};

export default ChatUserListScreen;

import {
  Image,
  ImageProps,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import theme from '../../../theme/Theme';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RosterItem} from 'stanza/protocol';
import {ChatPlacerHolder, Instructor, Placeholder} from '../../../assets';
import {useObject, useQuery, useRealm} from '../database/contextForRealm';
// import {chatProps} from '../screens/DoctorsListScreen';
import useDataProvider from '../../../context-store/useDataProvider';
import {chatProps} from '../screens/ChatUserListScreen';
import {Badge} from 'react-native-paper';
import ChatContext from '../../../context-store/chat/ChatContext';
import {IMessage} from 'react-native-gifted-chat';
import {
  mapToIMessage,
  MessageStatus,
  XmppMessage,
} from '../../../context-store/chat/type';
import moment from 'moment';
import {fonts} from '../../../theme/enum';

export type UserCardProps = {
  source: ImageProps['source'];
  userName: string;
  notifications?: number;
};

const UserCardComponent = (props: chatProps) => {
  const navigation = useNavigation<NavigationProp<any, any>>();
  const {unreadMessageMap, messages} = useContext(ChatContext);
  const {jidUser, patientDetails} = useDataProvider();
  const count = unreadMessageMap.has(props.jid)
    ? unreadMessageMap.get(props.jid)
    : 0;

  const id = props.xmppUser.jid.split('@')[0].toUpperCase().split('.')[0];
  const sp = patientDetails?.care_team?.service_providers?.filter(
    s => s.id === id,
  )[0];
  const [unreadMessageId, setUnreadMessageId] = useState<string>(null);
  const [unreadMessage, setUnreadMessage] = useState<XmppMessage>(null);

  const isUnread = (msg: XmppMessage) => {
    switch (msg.status) {
      case MessageStatus.received:
        return true;
      default:
        return false;
    }
  };

  const calcFirstUnreadMessage = () => {
    let conversationId = `${props.jid}_${jidUser}`;
    // console.log('messages', messages);
    console.log('conversationId', conversationId);
    console.log('messages of all', messages);
    let relevantMessagesMap = messages.conversationOf(conversationId);
    if (relevantMessagesMap) {
      // console.log('messages of conversationId', conversationId, relevantMessagesMap);
      let relevantMessages = Array.from(relevantMessagesMap.values());
      relevantMessages?.sort((a, b) => {
        return a.generated.valueOf() - b.generated.valueOf();
      });

      let unreadCount = unreadMessageMap.get(props.jid);
      let isUnreadAdded = false;
      if (unreadCount && unreadCount > 0) {
        for (
          let relIndex = 0;
          relIndex < relevantMessages?.length;
          relIndex++
        ) {
          let relMessage = relevantMessages[relIndex];
          if (isUnread(relMessage) && unreadCount && !isUnreadAdded) {
            setUnreadMessageId(relMessage.id);
            setUnreadMessage(relMessage);
            isUnreadAdded = true;
          }
        }
      }
    }
  };

  useEffect(() => {
    setUnreadMessage(null);
    calcFirstUnreadMessage();
  }, [unreadMessageMap]);
  // const {setClientXmpp, clientxmpp} = useDataProvider();
  // const realm = useRealm();
  // const User = useObject('UserRoster', props.jid);
  // if (realm) {
  //   if (!User) {
  //     realm.write(() => {
  //       realm.create('UserRoster', {
  //         _id: props.jid,
  //       });
  //     });
  //   } else {
  //     console.log(User);
  //   }
  // }
  const takeMetoChat = () => {
    // navigation.navigate('CareTeamChat', {
    //   jid: props.jid,
    //   name: props.name,
    //   // realm: realm,
    //   isGroup: props.isGroup,
    //   scrollToMessage: null,
    // });
    navigation.navigate({
      name: 'CareTeamChat',
      key: props?.jid,
      params: {
        xmppUser: props?.xmppUser,
        jid: props?.jid,
        name: props?.name,
        isGroup: props?.isGroup,
        role: props?.role,
        scrollToMessage: null,
        image: sp?.profile_image,
        unreadMessage: {
          count: count,
          firstMessageId: unreadMessageId,
        },
      },
    });
  };
  // useEffect(() => {
  //   console.log('client', props.client);
  //   setClientXmpp(props.client);
  // }, []);
  return (
    <View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          // activeOpacity={1}
          onPress={takeMetoChat}
          style={{
            width: '90%',
            minHeight: verticalScale(75),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            backgroundColor: 'rgba(255, 255, 255, 1)',
            paddingVertical: verticalScale(6),
            paddingHorizontal: horizontalScale(10),
            borderRadius: horizontalScale(20),
            marginVertical: verticalScale(6),
            borderColor: 'rgba(250, 242, 255, 1)',
            // borderWidth: 1,
            elevation: 20,
            shadowColor:
              Platform.OS === 'ios'
                ? 'rgba(71, 31, 185, 0.4)'
                : 'rgba(71, 31, 185, 0.2)',
            shadowOffset: {width: 2, height: 2},
            shadowOpacity: 1,
            shadowRadius: 3,
          }}>
          <View
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              overflow: 'hidden',
              backgroundColor: theme.colors.inputBg,
              alignItems: 'center',
            }}>
            <Image
              source={sp?.profile_image ? {uri: sp.profile_image} : Instructor}
              resizeMethod="resize"
              resizeMode="cover"
              style={{width: '100%', height: '100%'}}
            />
          </View>
          <View
            style={{
              width: '60%',
              height: '100%',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              padding: 10,
            }}>
            <Text style={styles.userName}>{props.name}</Text>
            <Text style={styles.role}>{props.role}</Text>
            <Text style={styles.msg} numberOfLines={1}>
              {unreadMessage &&
                (unreadMessage?.contentType === 'text'
                  ? unreadMessage?.body
                  : 'File')}
            </Text>
            {/*{count > 0 && <Badge>{count}</Badge>}*/}
          </View>
          {unreadMessage && (
            <View
              style={{
                width: '25%',
                paddingRight: 10,
                height: '70%',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
              }}>
              {
                <Text
                  style={{
                    fontSize: 12,
                    color: '#3F3641',
                    fontFamily: fonts.SecondaryDMSansRegular,
                  }}>
                  {moment(unreadMessage.generated).format('LT')}
                </Text>
              }
              {
                <View
                  style={{
                    backgroundColor: '#FF76E1',
                    borderRadius: 15,
                    width: 25,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#FFF',
                      fontFamily: fonts.SecondaryDMSansBold,
                      padding: 5,
                    }}>
                    {count}
                  </Text>
                </View>
              }
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserCardComponent;

const styles = StyleSheet.create({
  msg: {
    color: '#3F3641',
    fontFamily: fonts.SecondaryDMSansRegular,
    marginTop: 5,
  },
  role: {
    color: '#777',
    fontFamily: fonts.SecondaryDMSansRegular,
  },
  userName: {
    fontFamily: fonts.SecondaryDMSansRegular,
    fontSize: 16,
  },
});

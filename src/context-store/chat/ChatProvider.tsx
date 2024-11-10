import React, {
  PropsWithChildren,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {Agent} from 'stanza';
import ChatContext from './ChatContext';
import {init} from './initXmpp';
import useDataProvider from '../useDataProvider';
import {MessageStatus, XmppMessage, XmppMessages, XmppUser} from './type';
import {addAttachment, addToRawMessages, parseMessage} from './eventListener';
import {useRealm} from '../../feature/chat/database/contextForRealm';
import {
  addRoster,
  getMessageUnreadCountByJid,
  getRoster,
  loadConversations,
  saveMessage,
  setupRealmUser,
  updateMessageServerId,
  updateMessageStatus,
} from '../../feature/chat/database/Messages';
import {StanzaHeader} from 'stanza/protocol';
import * as Sentry from '@sentry/react-native';
import Analytics from 'appcenter-analytics';
import {AppState, Linking} from 'react-native';
import {logDeviceInfo} from '../../helpers/notifications';

const ChatProvider = ({children}: PropsWithChildren): JSX.Element => {
  const {
    setJID,
    setTokenChat,
    jidUser,
    authenticated,
    patientDetails,
    onboarded,
  } = useDataProvider();
  const realm = useRealm();
  const [messages, setMessages] = useState(new XmppMessages());
  const [rawMessages, setRawMessages] = useState<XmppMessage[]>([]);
  const [users, setUsers] = useState(new Map<string, XmppUser>());
  const [xmppUsers, setXmppUsers] = useState(new Map<string, XmppUser>());
  const [xmpp, setXmpp] = useState<Agent | null>(null);
  const [outgoingMessages, setOutgoingMessages] = useState<XmppMessage[]>([]);
  const [readMessages, setReadMessages] = useState<XmppMessage[]>([]);
  const [unreadMessageMap, setUnreadMessageMap] = useState(
    new Map<string, number>(),
  );
  const [chatLoaded, setChatLoaded] = useState(false);

  const [xmppStatus, setXmppStatus] = useState(false);

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  Realm.setLogLevel('warn');
  const context = useMemo(
    () => ({
      xmpp: xmpp,
      messages: messages,
      users: users,
      rawMessages: rawMessages,
      setOutgoingMessages: setOutgoingMessages,
      setReadMessages: setReadMessages,
      unreadMessageMap: unreadMessageMap,
      chatLoaded: chatLoaded,
    }),
    [
      xmpp,
      messages,
      users,
      rawMessages,
      setOutgoingMessages,
      setReadMessages,
      unreadMessageMap,
      chatLoaded,
    ],
  );

  useEffect(() => {
    xmppUsers.forEach(user => addRoster(realm, user));
    setUsers(xmppUsers);
  }, [xmppUsers]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
        if (xmpp) {
          console.log('App foreground xmpp', xmpp?.sessionStarted);
          xmpp
            ?.getRoster()
            .then(value => console.log('roster available', value))
            .catch(reason => {
              console.log('roster unavailable');
              Sentry.captureMessage('reconnection based on roster');
              Sentry.captureException(reason);
              setXmppStatus(false);
            });
        } else {
          console.log('xmpp not init');
        }
        logDeviceInfo();
      } else if (
        appState.current === 'active' &&
        nextAppState.match(/inactive|background/)
      ) {
        console.log('App has come to the background!');
        // xmpp?.disconnect();
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    // console.log('Trigger useEffect initXmpp');
    // console.log(
    //   'Trigger useEffect initXmpp authenticated',
    //   authenticated,
    //   patientDetails,
    // );
    // console.log('Trigger useEffect initXmpp jid', jidUser);
    // console.log('Trigger useEffect initXmpp token', tokenForChat);
    if (authenticated && realm) {
      // initXmpp(jidUser, tokenForChat, setXmpp, setUsers, setRawMessages);
      setupRealmUser(realm, jidUser).then(() => console.log('User created'));
      let rosterMap = getRoster(realm);
      if (rosterMap) {
        setUsers(rosterMap);
      }
      init(
        false,
        setJID,
        setTokenChat,
        setXmpp,
        setXmppUsers,
        setRawMessages,
        setXmppStatus,
        setChatLoaded,
      ).then(value => {
        loadConversations(realm, setMessages, messages).then(() => {
          console.log('Loaded All Conversations from init');
        });
      });
    }
  }, [authenticated, realm, onboarded]);

  useEffect(() => {
    if (chatLoaded) {
      console.log('users when chat loaded', users);
    }
  }, [chatLoaded]);

  useEffect(() => {
    // console.log('xmppStatus updated', xmppStatus);
    if (!xmppStatus) {
      // console.log('xmppStatus updated inside', xmppStatus);
      init(
        true,
        setJID,
        setTokenChat,
        setXmpp,
        setXmppUsers,
        setRawMessages,
        setXmppStatus,
        setChatLoaded,
      ).then(value => {
        loadConversations(realm, setMessages, messages).then(() => {
          // console.log('Loaded All Conversations from xmppStatus');
        });
      });
    }
  }, []);

  useEffect(() => {
    // console.log('Trigger useEffect initEvents');
    if (xmpp) {
      // console.log('Set Events handler');
      // events(realm, jidUser, xmpp, setMessages, setRawMessages);
      const handleMessage = (msg: any) => {
        // console.log('handleMessage', msg);
        const newMessage = parseMessage(msg, jidUser);

        setRawMessages((msgs: XmppMessage[]) => {
          return addToRawMessages(msgs, newMessage);
        });
      };
      xmpp.on('message', handleMessage);

      return () => xmpp.removeListener('message', handleMessage);
    }
  }, [xmpp]);

  function saveAndReRender(msg: XmppMessage) {
    let ids = saveMessage(msg, realm);
    // console.log('Ids Saved rawOut', ids);
    if (ids !== undefined && ids !== null) {
      msg.id = ids.messageId;
      setMessages(prevState => {
        return prevState
          .addMessageForConversation(msg.conversation_id, msg)
          .newStateObject();
      });
    }
  }

  // function getConversationId(message: XmppMessage): string {
  //   return `${message.from}_${message.to}`;
  // }

  function updateMessageAsRead(msg: XmppMessage) {
    updateMessageStatus(realm, msg.id, 'read');
    msg.status = MessageStatus.read;
    setMessages(prevState => {
      return messages
        .updateMessageForConversation(msg.conversation_id, msg)
        .newStateObject();
    });
    updateUnreadMessageMap();
  }

  useEffect(() => {
    // console.log('Messages are updated');
    // console.log('current rawMessagees', rawMessages.length);

    while (rawMessages.length > 0) {
      const msg: XmppMessage | undefined = rawMessages.pop();
      // console.log('Popped msg', msg);
      if (msg) {
        saveAndReRender(msg);
        updateUnreadMessageMap();
      }
      setRawMessages(prevState => {
        return prevState.filter(value => value.server_id !== msg?.server_id);
      });
    }
  }, [rawMessages]);

  const updateUnreadMessageMap = () => {
    let unreadMap = getMessageUnreadCountByJid(realm, users);
    // console.log('getMessageUnreadCountByJid', unreadMap);
    setUnreadMessageMap(prevState => {
      return new Map<string, number>(unreadMap);
    });
  };

  function sendXmppAndSaveReRenderText(msg: XmppMessage) {
    msg.conversation_id = `${msg.to}_${msg.from}`;
    saveAndReRender(msg);
    sendXmppAndSaveReRender(msg);
  }

  function sendXmppAndSaveReRenderMedia(xmpp: Agent, msg: XmppMessage) {
    msg.conversation_id = `${msg.to}_${msg.from}`;
    saveAndReRender(msg);
    addAttachment(xmpp, msg).then(value => sendXmppAndSaveReRender(value));
  }

  function sendXmppAndSaveReRender(msg: XmppMessage) {
    let messageHeader: StanzaHeader[] = [
      {name: 'contentType', value: msg?.contentType},
      {name: 'generated', value: msg.generated.toISOString()},
    ];

    let xmppSendMessage = {
      to: msg?.to,
      body: msg?.body,
      type: msg?.type,
      headers: messageHeader,
    };

    let serverId = xmpp.sendMessage(xmppSendMessage);
    if (!xmpp?.transport?.hasStream) {
      Analytics.trackEvent('Message_not_sent');
      Sentry.captureMessage('sending message failed');
    } else {
      Analytics.trackEvent('Message_sent');
      Sentry.captureMessage('Message_sent');
    }
    msg.server_id = serverId;
    console.log('Xmpp Sent response', msg);
    updateMessageServerId(realm, msg.id, serverId);
  }

  useEffect(() => {
    console.log('stream', xmpp?.transport?.hasStream);
    if (
      xmpp?.transport?.hasStream &&
      xmppStatus &&
      outgoingMessages.length > 0
    ) {
      const msg: XmppMessage | undefined = outgoingMessages.pop();
      if (msg.contentType !== 'text') {
        sendXmppAndSaveReRenderMedia(xmpp, msg);
      } else {
        sendXmppAndSaveReRenderText(msg);
      }
    }
  }, [xmppStatus, outgoingMessages]);

  useEffect(() => {
    if (xmpp && readMessages.length > 0) {
      while (readMessages.length > 0) {
        // console.log('processing readmessages');
        const msg: XmppMessage = readMessages.pop();
        // console.log('processing messageId', msg);
        updateMessageAsRead(msg);
      }
    }
  }, [readMessages]);
  return (
    <ChatContext.Provider value={context}>{children}</ChatContext.Provider>
  );
};

export default ChatProvider;

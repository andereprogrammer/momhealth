import React, {useEffect, useState} from 'react';
import {Button, SafeAreaView, View} from 'react-native';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';
import {createClient, BOSH_TRANSPORT, Agent} from 'stanza';
import theme from '../../../theme/Theme';
import {verticalScale} from '../../../helpers/layoutHelper';
import RNFS from 'react-native-fs';
import {getDBConnection} from '../../../../db-service';
import {SQLiteDatabase} from 'react-native-sqlite-storage';

interface XMPPChatComponentProps {
  roomJID: string;
  onLeaveRoom: () => void;
}

const XMPPChatComponent: React.FC<XMPPChatComponentProps> = ({
  roomJID,
  onLeaveRoom,
}) => {
  const backupFilePath =
    RNFS.DocumentDirectoryPath + '/appData/chathistory/ChatBackup.json';
  const [client, setClient] = useState<Agent>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [db, setDB] = useState<SQLiteDatabase>();

  useEffect(() => {
    getDBConnection()
      .then(database => setDB(database))
      .catch(error =>
        console.error('Failed to get database connection:', error),
      );
    const xmppClient = createClient({
      jid: 'keshav@localhost', // Replace with your user JID
      password: 'password', // Replace with your user password
      transports: {
        bosh: process.env.REACT_APP_XMPP_BOSH_URL, // Replace with your BOSH connection URL
      },
    });

    setClient(xmppClient);

    xmppClient.on('session:started', () => {
      console.log('i am keshav');
      xmppClient.sendPresence();
    });

    xmppClient.on('message', handleMessageReceived);

    xmppClient.connect();
  }, []);

  const handleSessionStarted = () => {
    console.log('came here');
    joinRoom();
  };

  const joinRoom = async () => {
    try {
      await client.joinRoom(roomJID, 'admin@localhost');
      console.log('done');
    } catch (error) {
      console.error('Error joining room:', error);
    }
  };

  const handleMessageReceived = (msg: any) => {
    const {from, body} = msg;
    if (body) {
      const newMessage: IMessage = {
        _id: msg.id,
        text: body,
        createdAt: new Date(),
        user: {
          _id: from,
        },
      };
      setMessages(prevMessages => GiftedChat.append(prevMessages, newMessage));
    }
  };

  const onSend = (newMessages: IMessage[]) => {
    const message = newMessages[0];
    if (client) {
      client.sendMessage({
        to: 'admin@localhost',
        body: message.text,
        type: 'chat',
      });
      setMessages(prevMessages => GiftedChat.append(prevMessages, newMessages));
    }
  };

  return (
    <SafeAreaView style={theme.textVariants.defaults}>
      <View style={{flex: 1, marginVertical: verticalScale(90)}}>
        <GiftedChat
          messages={messages}
          onSend={onSend}
          user={{
            _id: 'keshav@localhost', // Replace with the appropriate user ID
          }}
        />
      </View>

      {/* <Button title="Leave Room" onPress={onLeaveRoom} /> */}
    </SafeAreaView>
  );
};

export default XMPPChatComponent;

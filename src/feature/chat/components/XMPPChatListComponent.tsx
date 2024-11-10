import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';
import {createClient, jid} from 'stanza';
import {CareTeam} from '../../../assets';

interface ChatRoom {
  name: string;
  jid: string;
  messageCount: number;
  latestMessage: string;
}

type XMPPChatRoomListComponentProps = {
  onRoomSelect: (roomJID: string) => void;
};

const XMPPChatRoomListComponent: React.FC = ({onRoomSelect}) => {
  const [client, setClient] = useState<any>(null);
  const [rooms, setRooms] = useState<ChatRoom[]>([]);

  useEffect(() => {
    const xmppClient = createClient({
      jid: 'admin@localhost',
      password: 'password',
      transports: {
        bosh: 'http://localhost:5280/bosh',
      },
    });
    setClient(xmppClient);
    xmppClient.connect();

    xmppClient.on('session:started', () => {
      handleSessionStarted;
    });

    return () => {
      xmppClient.disconnect();
    };
  }, []);

  const handleSessionStarted = () => {
    fetchRooms();
  };

  const fetchRooms = async () => {
    try {
      const response = await client.getDiscoItems('admin@localhost');
      const items = response.discoItems.items;
      const chatRooms: ChatRoom[] = items.map((item: any) => ({
        name: item.name,
        jid: item.jid,
        messageCount: 0,
        latestMessage: '',
      }));
      setRooms(chatRooms);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const renderRoomItem = ({item}: {item: ChatRoom}) => {
    return (
      <TouchableOpacity onPress={() => onRoomSelect(item.jid)}>
        <View style={{flexDirection: 'row', padding: 16}}>
          <Image
            source={CareTeam}
            style={{width: 50, height: 50, borderRadius: 25, marginRight: 16}}
          />
          <View>
            <Text>{item.name}</Text>
            <Text>{item.latestMessage}</Text>
          </View>
          {item.messageCount > 0 && (
            <View
              style={{
                backgroundColor: 'red',
                borderRadius: 10,
                padding: 4,
                marginLeft: 'auto',
              }}>
              <Text style={{color: 'white'}}>{item.messageCount}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Text>XMPP</Text>
      <FlatList
        data={rooms}
        renderItem={renderRoomItem}
        keyExtractor={item => item.jid}
      />
    </>
  );
};

export default XMPPChatRoomListComponent;

import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {createClient, BOSH_TRANSPORT, Agent} from 'stanza';

interface XMPPUserListComponentProps {
  onRoomSelect: (roomJID: string) => void;
  onUserSelect: (userJID: string) => void;
}

const XMPPUserListComponent: React.FC<XMPPUserListComponentProps> = ({
  onRoomSelect,
  onUserSelect,
}) => {
  const [client, setClient] = useState<Agent>(null);
  const [chatRooms, setChatRooms] = useState<string[]>([]);
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    const xmppClient = createClient({
      jid: 'admin@localhost', // Replace with your user JID
      password: 'password', // Replace with your user password
      transports: {
        bosh: 'http://localhost:5280/bosh', // Replace with your BOSH connection URL
      },
    });

    setClient(xmppClient);

    xmppClient.on('session:started', () => {
      xmppClient.getRoster().then(res => {
        console.log(
          res.items.map(it => {
            setUsers(it.jid);
          }),
        );
        // setUsers(res.items[0].jid);
      });
      xmppClient.joinRoom('keshav@localhost', 'keshav');
    });

    xmppClient.connect();

    return () => {
      xmppClient.disconnect();
    };
  }, []);

  const renderRoomItem = ({item}: {item: string}) => {
    return (
      <TouchableOpacity onPress={() => onRoomSelect(item)}>
        <View>
          <Text>{item}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderUserItem = ({item}: {item: string}) => {
    return (
      <TouchableOpacity onPress={() => onUserSelect(item)}>
        <View>
          <Text>{item}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Text>Chat Rooms:</Text>
      <FlatList
        data={chatRooms}
        renderItem={renderRoomItem}
        keyExtractor={item => item}
      />

      <Text>Users:</Text>
      <FlatList
        data={users}
        renderItem={renderUserItem}
        keyExtractor={item => item}
      />
    </View>
  );
};

export default XMPPUserListComponent;

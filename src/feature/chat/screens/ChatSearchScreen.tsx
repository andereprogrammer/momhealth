import {
  FlatList,
  ListRenderItem,
  SafeAreaView, StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import {List, Searchbar} from 'react-native-paper';
import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {XmppUser} from '../../../context-store/chat/type';
import UserCardComponent from '../components/UserCardComponent';
import {searchMessagesOnRealm} from '../database/Messages';
import {useRealm} from '../database/contextForRealm';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import ChatContext from '../../../context-store/chat/ChatContext';
import moment from 'moment';
import {Button} from 'react-native-paper';
import { horizontalScale, verticalScale } from "../../../helpers/layoutHelper";

export const ChatSearchScreen = () => {
  const navigation = useNavigation<NavigationProp<any, any>>();
  const [searchQuery, setSearchQuery] = useState('');
  const realm = useRealm();
  const [messageList, setMessageList] = useState([]);
  const [messageId, setMessageId] = useState(null);
  const {users, messages} = useContext(ChatContext);
  const searchBarRef = useRef(null);
  const [focus, setFocus] = useState(true);

  // useLayoutEffect(() => {
  //   console.log('searchBarRef.current', searchBarRef.current);
  //   searchBarRef.current.focus();
  // });

  useLayoutEffect(() => {
    setFocus(true);
    return () => {
      setFocus(false);
    };
  }, []);

  const onChangeSearch = query => setSearchQuery(query);

  useEffect(() => {
    if (searchQuery) {
      let messageIds = searchMessagesOnRealm(realm, searchQuery);
      let mappedMessages = messageIds.map(message => {
        let user = users.get(message.from._id);
        if (message.type === 'groupchat') {
          let group = message.conversation_id.split('_')[0];
          user = users.get(group);
        }
        let time = moment(message.generated).format('DD/MM/yyyy');
        if (!user) {
          let toUser = users.get(message.to._id);
          console.log('toUser', message);
          return {
            fromJid: toUser?.jid,
            fromName: toUser?.name,
            body: message.body,
            time: time,
            _id: message._id.toString(),
          };
        } else {
          return {
            fromJid: user?.jid,
            fromName: user?.name,
            body: message.body,
            time: time,
            _id: message._id.toString(),
          };
        }
      });
      setMessageList(mappedMessages);
      console.log('Search Ids', messages);
    }
  }, [searchQuery]);

  useEffect(() => {
    console.log('Message Id selected', messageId);
  }, [messageId]);

  const handleClick = message => {
    console.log('searched message', message);
    let user = users.get(message.fromJid);
    console.log('Got User', user);
    // navigation.navigate('CareTeamChat', {
    //   jid: user?.jid,
    //   name: user?.name,
    //   isGroup: user?.isGroup,
    //   scrollToMessage: message._id.toString(),
    // });
    navigation.navigate({
      name: 'CareTeamChat',
      key: user?.jid,
      params: {
        xmppUser: user,
        jid: user?.jid,
        name: user?.name,
        isGroup: user?.isGroup,
        scrollToMessage: message._id,
        unreadMessage: {
          count: 0,
          firstMessageId: null,
        },
      },
    });
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        {focus && (
          <Searchbar
            // ref={searchBarRef}
            placeholder="Search..."
            onChangeText={onChangeSearch}
            autoFocus={focus}
            value={searchQuery}
            right={props => (
              <Button mode="text" onPress={() => navigation.goBack()}>
                Cancel
              </Button>
            )}
          />
        )}

        <FlatList
          data={messageList}
          renderItem={({item, index}: {item: any; index: number}) => (
            <View>
              <TouchableOpacity onPress={() => handleClick(item)}>
                <List.Item
                  key={index}
                  title={item.fromName}
                  description={item.body}
                  right={props => <Text>{item.time}</Text>}
                  left={props => <List.Icon {...props} icon="message" />}
                />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: horizontalScale(20),
    paddingTop: StatusBar.currentHeight+ verticalScale(10),
  },
});

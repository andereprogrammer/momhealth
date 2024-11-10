import {
  FlatList,
  ListRenderItem,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Banner, List, Searchbar} from 'react-native-paper';
import React, {useContext, useEffect, useState} from 'react';
import {XmppUser} from '../../../context-store/chat/type';
import UserCardComponent from '../components/UserCardComponent';
import {searchMessagesOnRealm} from '../database/Messages';
import {useRealm} from '../database/contextForRealm';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import ChatContext from '../../../context-store/chat/ChatContext';
import ExpertNotesCard, {Note} from '../../careteam/components/ExpertNotesCard';
import {getMedicalJournal, getSessionNotes} from '../../../api/homeapis';
import theme from '../../../theme/Theme';
import {green} from 'react-native-reanimated';
import SessionNotesCard, {
  SessionNote,
} from '../../careteam/components/SessionNotesCard';
import BannerCard from "../../careteam/components/BannerCard";

export const ChatSessionNotesScreen = () => {
  const navigation = useNavigation<NavigationProp<any, any>>();
  const [notes, setNotes] = useState<SessionNote[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  function fetchData() {
    setLoading(true);
    getSessionNotes(0).then(res => {
      console.log('Got New session Notes', res.data);
      let responseNotes: SessionNote[] = res.data.content.map(note => {
        return {
          id: note.id,
          title: note.title,
          description: note.description,
          date: note.created,
          created_by_user: note.created_by_user,
          session: note.session,
          has_read: note.has_read,
        };
      });
      console.log('Got mapped session Notes', responseNotes);
      setNotes(responseNotes);
      setLoading(false);
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView
      style={{backgroundColor: '#fff'}}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={fetchData} />
      }>
      <View style={{backgroundColor: '#fff'}}>
        <BannerCard text={'Session notes are notes associated to each session'} />
        {notes &&
          notes.length > 0 &&
          notes.map(note => {
            return <SessionNotesCard key={note.id} note={note} />;
          })}
      </View>
      <View style={{height: 100}} />
    </ScrollView>
  );
};

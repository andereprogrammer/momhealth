import {
  FlatList,
  Image,
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
import {authorizeUserchat} from '../../../api/chat';
import {getMedicalJournal} from '../../../api/homeapis';
import ExpertNotesCard, {Note} from '../../careteam/components/ExpertNotesCard';
import ExpertNotesCardV2 from '../../careteam/components/ExpertNotesCardV2';
import {Pallete} from '../../../theme/enum';
import { Icon } from "react-native-elements";
import BannerCard from "../../careteam/components/BannerCard";


export type MedicalJournal = {
  id: string;
  title: string;
  description: string;
  date: string;
  created_by: {
    category: string;
    name: string;
  };
  read: boolean;
};

export const ChatExpertNotesScreen = () => {
  const navigation = useNavigation<NavigationProp<any, any>>();
  const [medicalJournals, setMedicalJournals] = useState<MedicalJournal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  function fetchData() {
    setLoading(true);
    getMedicalJournal(0).then(res => {
      setMedicalJournals(res.data.content);
      console.log('getMedicalJournal', medicalJournals);
      setLoading(false);
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView
      style={{flex: 1, backgroundColor: Pallete.plainWhite}}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={fetchData} />
      }>
      <View style={{backgroundColor: '#fff'}}>
        {/*<Banner*/}
        {/*  style={{*/}
        {/*    marginVertical: 10,*/}
        {/*    borderRadius: 20,*/}
        {/*    marginHorizontal: 10,*/}
        {/*    shadowOpacity: 0,*/}
        {/*  }}*/}
        {/*  visible={true}*/}
        {/*  icon={"information"}>*/}
        {/*  Expert notes are inputs shared by your care team*/}
        {/*</Banner>*/}
        <BannerCard text={'Expert notes are inputs shared by your care team'} />
        {medicalJournals &&
          medicalJournals.map(medicalJournal => {
            return (
              <ExpertNotesCardV2
                key={medicalJournal.id}
                journal={medicalJournal}
              />
            );
          })}
      </View>
      <View style={{height: 100}} />
    </ScrollView>
  );
};

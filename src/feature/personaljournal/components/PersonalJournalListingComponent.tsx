import {FlatList, StyleSheet, Text, View, ViewToken} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import PersonalJournalCardComponent from './PersonalJournalCardComponent';
import {horizontalScale} from '../../../helpers/layoutHelper';
import {getPatientsPersonalJournals} from '../../../api/homeapis';

export type Journal = {
  id?: string;
  symptoms: any;
  date: string;
  onSelected?: (journal: any) => void;
  moodId: number | string;
  item: any;
  image: any;
};

const PersonalJournalListingComponent = (props: Props) => {
  const navigation = useNavigation<NavigationProp<any, any>>();
  const [currentIndex, setCurrentIndex] = useState<number | null>();
  const [journalList, setList] = useState();
  const onboardingRef = useRef(null);
  const viewAbleItemChanged = useRef(
    ({viewableItems, changed}: {viewableItems: ViewToken[]}) => {
      console.log(changed);
      setCurrentIndex(viewableItems[0].index);
    },
  ).current;
  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;
  useEffect(() => {
    getPatientsPersonalJournals().then(res => {
      setList(res.data);
    });
  }, []);
  return (
    <View
      style={{
        flex: 1,
      }}>
      <FlatList
        data={journalList}
        horizontal={false}
        //   numColumns={col}
        // centerContent
        style={{
          flex: 1,
          paddingHorizontal: horizontalScale(10),
        }}
        contentContainerStyle={{
          gap: 30,
          paddingRight: 20,
        }}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        pagingEnabled
        viewabilityConfig={viewConfig}
        scrollEventThrottle={32}
        keyExtractor={item => item.id}
        // onViewableItemsChanged={viewAbleItemChanged}
        ref={onboardingRef}
        renderItem={({item}: {item: Journal}) => (
          <PersonalJournalCardComponent
            key={item.id}
            date={item.date}
            description={item.description}
            title={item.title}
            id={item.id}
            // onSelected={}
          />
        )}
      />
    </View>
  );
};

export default PersonalJournalListingComponent;

const styles = StyleSheet.create({});

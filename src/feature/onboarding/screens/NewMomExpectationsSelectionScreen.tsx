import React, {useEffect, useState} from 'react';
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import HeaderComponent from '../../../components/MainContainer/HeaderComponent/HeaderComponent';
import {syptomslist} from '../../../components/MainContainer/SyptomsListComponent/listOfSyptoms';
import ItemCardComponent from '../../../components/MainContainer/SyptomsListComponent/ItemCardComponent';
import MainCtaComponent from '../../../components/ButtonComponents/MainCtaComponent/MainCtaComponent';
import { getChallenges, getChallengesV2, getSyptoms, setupPregnant } from "../../../api/userCreationHelper";
import useDataProvider from '../../../context-store/useDataProvider';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import ProgressBarComponent from '../../../components/MainContainer/ProgressBarComponent';
import BackHeader from '../../../components/MainContainer/BackHeader';
import {fonts} from '../../../theme/enum';

type Item = {
  key: number;
  syptom: string;
  selected: boolean;
};
const NewMomExpectationsScreen: React.FC = () => {
  const {newMomDetails, setNewMomDetails} = useDataProvider();
  const navigation = useNavigation<NavigationProp<any, any>>();

  let [selectedItems, setSelectedItems] = useState([]);
  const setUpProfile = (item: Item) => {
    setSelectedItems(prev => {
      let newVal = [...prev];
      newVal.map(it => {
        if (item.key === it.key) {
          it.selected = !it.selected;
        }
      });
      return newVal;
    });
  };

  useEffect(() => {
    console.log('challenges stringify', selectedItems);
    setNewMomDetails(prev => {
      let next = {...prev};
      next.challenges = selectedItems;
      return next;
    });
    console.log('setNewMomDetails useEffect', JSON.stringify(newMomDetails));
  }, [selectedItems]);

  useEffect(() => {
    getChallengesV2().then(res => {
      let challengesList = res.data;
      let challenges = [];
      for (
        let challengesIndex = 0;
        challengesIndex < challengesList.length;
        challengesIndex++
      ) {
        let challengeData = challengesList[challengesIndex];
        if (challengeData.type !== 'ONBOARDING') {
          continue;
        }
        let challenge = {
          key: challengeData.id,
          name: challengeData.name,
          type: challengeData.type,
          selected: false,
        };
        challenges.push(challenge);
      }
      setSelectedItems(challenges);
      console.log('setChallengesMasterData', challenges);
    });
  }, []);

  const finisProfile = () => {
    navigation.navigate('SettingUpYourExperienceScreen');
  };
  return (
    <SafeAreaView style={styles.default}>
      <BackHeader title="" />
      <ProgressBarComponent tile1="100%" tile2="100%" tile3="100%" />
      <View style={styles.textContainer}>
        <Text style={styles.mainText}>
          To provide the best assistance, please share your key aspirations
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.aimText}>I want to</Text>
          <Text style={styles.shortText}> (Select one or more)</Text>
        </View>
      </View>

      <View style={styles.wordCloud}>
        {selectedItems.map((item, i) => {
          return (
            <TouchableOpacity key={item.key} onPress={() => setUpProfile(item)}>
              <ItemCardComponent
                style={item.selected && styles.cardSeletecd}
                key={item.key}
                syptom={item.name}
                selected={item.selected}
              />
            </TouchableOpacity>
          );
        })}
      </View>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: '94%',
            marginBottom: verticalScale(20),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <MainCtaComponent
            onClick={() => finisProfile()}
            active={true}
            style={styles.cta}>
            Continue
          </MainCtaComponent>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  cta: {
    bottom: 0,
    left: 0,
    right: 0,
    marginBottom: 10,
    position: 'absolute',
  },
  cardSeletecd: {
    backgroundColor: 'rgba(255, 242, 209, 1)',
    borderColor: 'rgba(255, 222, 145, 1)',
    borderWidth: 1,
    color: 'rgba(15, 4, 18, 1)',
  },
  default: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: Platform.OS === 'ios' ? horizontalScale(10) : 0,
    height: '100%',
    position: 'relative',
  },
  wordCloud: {
    gap: 10,
    height: '44%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignSelf: 'center',
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(20),
  },
  shortText: {
    paddingTop: 10,
    textAlign: 'left',
    fontSize: 14,
    color: '#000',
    fontFamily: fonts.SecondaryDMSansRegular,
  },
  aimText: {
    paddingTop: 10,
    textAlign: 'left',
    fontSize: 14,
    color: '#000',
    fontFamily: fonts.SecondaryDMSansRegular,
  },
  mainText: {
    textAlign: 'left',
    fontSize: 16,
    marginBottom: 0,
    color: '#000',
    fontFamily: fonts.PrimaryJakartaExtraBold,
  },
  textContainer: {
    marginTop: 10,
    marginBottom: 10,
    // padding: 8,
    color: '#000',
    paddingHorizontal: horizontalScale(20),
  },
});

export default NewMomExpectationsScreen;

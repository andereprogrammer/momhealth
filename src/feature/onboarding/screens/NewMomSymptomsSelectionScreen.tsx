import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import HeaderComponent from '../../../components/MainContainer/HeaderComponent/HeaderComponent';
import {
  newMomSymptomsMapping,
  syptomslist,
} from '../../../components/MainContainer/SyptomsListComponent/listOfSyptoms';
import ItemCardComponent from '../../../components/MainContainer/SyptomsListComponent/ItemCardComponent';
import MainCtaComponent from '../../../components/ButtonComponents/MainCtaComponent/MainCtaComponent';
import {
  getChallenges,
  getSyptoms,
  setupPregnant,
} from '../../../api/userCreationHelper';
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
const NewMomSymptomsSelectionScreen: React.FC = () => {
  const {newMomDetails, setNewMomDetails} = useDataProvider();
  const navigation = useNavigation<NavigationProp<any, any>>();

  console.log('NewMomSymptomsSelectionScreen newMomDetails', newMomDetails);

  const [challengesMasterData, setChallengesMasterData] = useState(
    new Map<string, any[]>(),
  );
  let questions = newMomSymptomsMapping;
  let [selectedItems, setSelectedItems] = useState(questions);

  const setUpProfile = (index: string, key: number, i: number) => {
    setChallengesMasterData(prev => {
      let newVal = prev.get(index);
      newVal[i].selected = !newVal[i].selected;
      prev.set(index, newVal);
      console.log('Prev', prev);
      return new Map(prev);
    });
  };

  useEffect(() => {
    console.log('challenges stringify', challengesMasterData);
    setNewMomDetails(prev => {
      let next = {...prev};
      next.challenges = challengesMasterData;
      return next;
    });
    console.log('setNewMomDetails useEffect', JSON.stringify(newMomDetails));
  }, [challengesMasterData]);

  useEffect(() => {
    getChallenges().then(res => {
      let challengesList = res.data;
      console.log('challengesList',challengesList);
      let challenges = new Map<string, any[]>();
      for (
        let challengesIndex = 0;
        challengesIndex < challengesList.length;
        challengesIndex++
      ) {
        let challengeData = challengesList[challengesIndex];
        let challenge = {
          id: challengeData.id,
          name: challengeData.name,
          type: challengeData.type,
          selected: false,
        };
        if (challenges.has(challenge.type)) {
          challenges.get(challenge.type)?.push(challenge);
        } else {
          challenges.set(challenge.type, [challenge]);
        }
      }
      console.log('setChallengesMasterData', challenges);
      setChallengesMasterData(challenges);
    });
  }, []);
  const finisProfile = () => {
    console.log('Completed');
    navigation.navigate('SettingUpYourExperienceScreen');
  };
  return (
    <SafeAreaView style={styles.default}>
      <BackHeader title="" />
      <ProgressBarComponent tile1="100%" tile2="100%" tile3="100%" />
      <View style={styles.textContainer}>
        <Text style={styles.mainText}>
          Are you facing any challenges in your motherhood journey so far?
        </Text>
        <Text style={styles.shortText}>Select options you can relate to</Text>
      </View>
      {Array.from(challengesMasterData.keys()).map((value, index) => {
        return (
          <>
            <View style={styles.questionContainer}>
              <Text style={styles.questionText}>{value}</Text>
            </View>
            <View style={styles.wordCloud}>
              {challengesMasterData.get(value).map((item, i) => {
                let key = item.id;
                return (
                  <TouchableOpacity
                    key={key}
                    onPress={() => setUpProfile(value, key, i)}>
                    <ItemCardComponent
                      style={item.selected && styles.cardSeletecd}
                      key={key}
                      syptom={item.name}
                      selected={item.selected}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          </>
        );
      })}

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
            width: '90%',
            marginRight: horizontalScale(20),
            marginBottom: horizontalScale(20),
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
    marginLeft: verticalScale(10),
  },
  cardSeletecd: {
    backgroundColor: 'rgba(255, 242, 209, 1)',
    borderColor: 'rgba(255, 222, 145, 1)',
    borderWidth: 1,
    color: 'rgba(39, 29, 42, 1)',
  },
  default: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: horizontalScale(10),
    height: '100%',
    position: 'relative',
  },
  wordCloud: {
    gap: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignSelf: 'flex-start',
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(20),
  },
  shortText: {
    paddingTop: 10,
    textAlign: 'left',
    fontSize: 14,
    fontWeight: '400',
    justifyContent: 'flex-start',
    color: '#000',
    fontFamily: fonts.SecondaryDMSansRegular,
  },
  questionText: {
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: fonts.SecondaryDMSansMedium,
    justifyContent: 'flex-start',
    color: '#000',
  },
  mainText: {
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 0,
    color: '#000',
    fontFamily: fonts.SecondaryDMSansRegular,
  },
  textContainer: {
    marginTop: 10,
    marginBottom: 10,
    padding: 8,
    color: '#000',
    paddingVertical: verticalScale(2),
    paddingHorizontal: horizontalScale(20),
  },
  questionContainer: {
    marginTop: 2,
    marginBottom: 10,
    padding: 8,
    color: '#000',
    paddingVertical: verticalScale(0),
    paddingHorizontal: horizontalScale(20),
  },
});

export default NewMomSymptomsSelectionScreen;

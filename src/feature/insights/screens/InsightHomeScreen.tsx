import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import theme from '../../../theme/Theme';
import HeaderTextComponent from '../../dashboard/components/TextHeaderComponents/HeaderTextComponents/HeaderTextComponent';
import TodoCardComponent from '../../dashboard/components/Cards/TodoCardComponent';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import {BackBtn, InsightCta, Plus, SessionEmpty} from '../../../assets';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Pallete, fonts} from '../../../theme/enum';
import {searchLogs} from '../../../api/homeapis';
import PersonalJournalCardComponent from '../../personaljournal/components/PersonalJournalCardComponent';
import BackHeader from '../../../components/MainContainer/BackHeader';
import MainCtaComponent from '../../../components/ButtonComponents/MainCtaComponent/MainCtaComponent';
import moment from 'moment';
import InsightViewScreen from './InsightViewScreen';
import {
  Angry,
  Calm,
  Disgusted,
  Fearfull,
  Happy,
  Hopefull,
  Sad,
  Surprised,
} from '../../../assets/animations';
import LoadingAnimationScreen from '../../animations/LoadingAnimationScreen';
export const moodAnimationValues = {
  Fearful: Fearfull,
  Hopeful: Hopefull,
  Happy: Happy,
  Disgusted: Disgusted,
  Surprised: Surprised,
  Sad: Sad,
  Angry: Angry,
  Calm: Calm,
};
const InsightHomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any, any>>();
  const [journalsList, setJournalList] = useState([]);
  const [selectedJournal, setSelectedJournal] = useState();
  const [moodLog, setMoodLog] = useState(null);
  const [loading, setLoading] = useState(false);

  const takeMeToTracker = () => {
    navigation.navigate('InsightMainScreen');
  };

  const handleSelected = (journal: any) => {
    console.log(journal);
    setSelectedJournal(journal);
    setMoodLog(journal);
  };
  // image_link
  useEffect(() => {
    setLoading(true);
    searchLogs()
      .then(res => {
        console.log('Search Logs', res.data.content);
        const oldMood = res.data.content.find(
          item => item.journal.title === 'Mood Log',
        );
        setJournalList(res.data.content);
        setLoading(false);
      })
      .catch(e => {
        console.log('Search Logs Error', e.response);
        setLoading(false);
      });
  }, [moodLog]);
  return (
    <>
      {moodLog !== null ? (
        <InsightViewScreen
          journal={moodLog?.journal?.description}
          mood={moodLog?.symptoms[0]?.name}
          date={moodLog?.date}
          symptoms={moodLog?.symptoms}
          item={moodLog?.journal}
          closeView={() => setMoodLog(null)}
        />
      ) : (
        <SafeAreaView style={theme.textVariants.defaults}>
          {loading ? (
            <LoadingAnimationScreen />
          ) : (
            <View style={styles.mainView}>
              <BackHeader
                title="Journal entries"
                SecondaryComponent={
                  <TouchableOpacity
                    onPress={takeMeToTracker}
                    style={{
                      width: '10%',
                      alignItems: 'flex-end',
                      backgroundColor: '#fff',
                      flexDirection: 'row',
                      gap: 5,
                    }}>
                    <View
                      style={{
                        width: 25,
                        height: 25,
                        backgroundColor: Pallete.Eggplant,
                        borderRadius: 30,
                        padding: 2,
                      }}>
                      <Image
                        style={{width: '100%', height: '100%'}}
                        source={Plus}
                        tintColor={'#fff'}
                      />
                    </View>
                  </TouchableOpacity>
                }
              />

              {journalsList.length === 0 && (
                <View
                  style={{
                    width: '85%',
                    alignSelf: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    style={{
                      width: '90%',
                      height: '50%',
                    }}
                    source={SessionEmpty}
                  />
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: fonts.SecondaryDMSansBold,
                      paddingVertical: verticalScale(10),
                    }}>
                    No logs available , please check in to see your logs here
                  </Text>
                </View>
              )}
              <ScrollView style={styles.scrollView}>
                {journalsList.map((journal, i) => {
                  return (
                    <PersonalJournalCardComponent
                      key={journal.id}
                      id={journal.id}
                      date={journal.date}
                      symptoms={journal.symptoms}
                      onSelected={handleSelected}
                      moodId={journal.id}
                      item={journal}
                      image={journal.journal.image_link}
                    />
                  );
                })}
              </ScrollView>
              <></>
              <View style={{height: 60}}></View>
            </View>
          )}
        </SafeAreaView>
      )}
    </>
  );
};

export default InsightHomeScreen;

export const styles = StyleSheet.create({
  mainView: {flex: 1},
  headingText: {marginBottom: verticalScale(30), color: '#000'},
  containerView: {
    height: '55%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(40),
    marginBottom: verticalScale(20),
    backgroundColor: '#FFF',
    overflow: 'hidden',
  },
  secondaryContainerView: {
    height: verticalScale(70),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(20),
  },
  scrollView: {
    flex: 1,
    paddingVertical: 20,
  },
  internalCardView: {
    width: '100%',
    height: '100%',
    borderRadius: horizontalScale(20),
    backgroundColor: 'rgba(255, 214, 246, 0.4)',
    flexDirection: 'row',
    flexWrap: 'wrap',
    overflow: 'hidden',
  },
  headingCardView: {
    width: '70%',
    height: '100%',
    // alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: horizontalScale(15),
  },
  secondartText: {
    fontFamily: fonts.SecondaryDMSansBold,
    fontSize: 16,
  },
  actionText: {
    fontFamily: fonts.SecondaryDMSansMedium,
    fontSize: 12,
    color: '#000',
  },
  imageViewAspect: {
    width: '30%',
    height: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  buttonView: {
    width: '30%',
    height: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.cardPrimaryBackground,
    borderRadius: horizontalScale(5),
    marginHorizontal: horizontalScale(10),
  },
  imageAspext: {
    width: '50%',
    height: '50%',
    transform: [{rotate: '180deg'}],
    tintColor: '#FFF',
  },
  imgBackgroundAspect: {
    width: '100%',
  },
  customColor: {color: '#000'},
});

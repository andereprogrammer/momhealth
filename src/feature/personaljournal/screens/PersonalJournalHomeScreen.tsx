import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import PersonalJournalCardComponent from '../components/PersonalJournalCardComponent';
import {getPatientsPersonalJournals} from '../../../api/homeapis';
import LinearGradient from 'react-native-linear-gradient';
import {BackBtn, Calendar, Plus} from '../../../assets';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import PersonalJournalInfoCard from '../components/PersonalJournalInfoCard';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import CalendarListScreen from '../components/CalendarListScreen';
import useDataProvider from '../../../context-store/useDataProvider';
import {designPalette} from '../../../theme/Theme';
import PersonalJournalView from '../components/PersonalJournalView';

type Props = {};

const PersonalJournalHomeScreen = (props: Props) => {
  const navigation = useNavigation<NavigationProp<any, any>>();
  const [openCalendar, setOpenCalendar] = useState(false);
  const {dateForJournal, setDateForJournal} = useDataProvider();
  const [journalsList, setJournalList] = useState([]);
  const [selectedJournal, setSelectedJournal] = useState();
  const handleSelected = (journal: any) => {
    console.log(journal);
    setSelectedJournal(journal);
  };

  useFocusEffect(
    React.useCallback(() => {
      getPatientsPersonalJournals()
        .then(res => {
          console.log('Journal get called');
          console.log(res.data.content);
          setJournalList(res.data.content);
        })
        .catch(e => {
          console.log(e);
        });
    }, []),
  );
  useEffect(() => {}, [selectedJournal]);
  return (
    <View style={styles.mainContainerView}>
      {selectedJournal === undefined ? (
        <>
          <View style={styles.mainView}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={[
                designPalette.primary.lightPink,
                designPalette.secondary.GoldenGlow,
              ]}
              style={styles.linerGradientView}>
              <View style={styles.headerView}>
                <TouchableOpacity
                  style={styles.imageBackView}
                  onPress={() => navigation.goBack()}>
                  <Image
                    source={BackBtn}
                    resizeMode="contain"
                    resizeMethod="resize"
                    style={styles.imageAspect}
                  />
                </TouchableOpacity>
                <View style={styles.textHeaderView}>
                  <Text style={styles.headerText}>My Journal</Text>
                </View>
                <View style={styles.rightIconsView}>
                  <TouchableOpacity
                    style={styles.imageCalendarView}
                    onPress={() => navigation.navigate('CalendarListScreen')}>
                    <Image
                      source={Calendar}
                      resizeMode="contain"
                      resizeMethod="resize"
                      style={styles.imageAspect}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.imageCalendarView}
                    onPress={() =>
                      navigation.navigate('PersonalJournalWritingScreen')
                    }>
                    <Image
                      source={Plus}
                      resizeMode="contain"
                      resizeMethod="resize"
                      style={styles.imageAspect}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              {/* <View style={styles.headerCalendarView}>
            <View style={styles.imageBackCalendarView}>
              <Image
                source={BackBtn}
                resizeMode="contain"
                resizeMethod="resize"
                style={styles.imageAspectCalendarBack}
              />
            </View>
            <View style={styles.textCalendarView}>
              <Text style={styles.headerTextCalendar}>March</Text>
            </View>
            <View style={styles.rightArrowView}>
              <Image
                source={BackBtn}
                resizeMode="contain"
                resizeMethod="resize"
                style={styles.imageAspectRotate}
              />
            </View>
          </View> */}
              {/* <View></View> */}
            </LinearGradient>
          </View>
          <PersonalJournalInfoCard />
          <ScrollView style={styles.scrollView}>
            {journalsList.map((journal, i) => {
              return (
                <PersonalJournalCardComponent
                  key={i}
                  title={journal.title}
                  description={journal.description}
                  id={journal.id}
                  date={journal.date}
                  onSelected={handleSelected}
                />
              );
            })}
          </ScrollView>
        </>
      ) : (
        <>
          {selectedJournal !== undefined && (
            <PersonalJournalView
              title={selectedJournal.title}
              description={selectedJournal.description}
            />
          )}
        </>
      )}
    </View>
  );
};

export default PersonalJournalHomeScreen;

const styles = StyleSheet.create({
  mainContainerView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainView: {
    width: '100%',
    height: '17%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  scrollView: {
    flex: 1,
  },
  linerGradientView: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerView: {
    width: '100%',
    height: '43%',
    padding: horizontalScale(10),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(40),
  },
  headerCalendarView: {
    width: '100%',
    height: '40%',
    padding: horizontalScale(10),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  imageBackView: {
    width: '10%',
    height: '48%',
    marginBottom: 10,
  },
  imageBackCalendarView: {
    width: '30%',
    height: '60%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    display: 'flex',
  },
  imageCalendarView: {
    width: '18%',
    height: '100%',
  },
  imageAspect: {
    width: '55%',
    height: '90%',
  },
  imageAspectCalendarBack: {
    width: '40%',
    height: '60%',
  },
  imageAspectRotate: {
    width: '40%',
    height: '60%',
    transform: [{rotate: '180deg'}],
  },

  textHeaderView: {
    width: '30%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(10),
  },
  textCalendarView: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: horizontalScale(18),
    fontFamily: 'DMSans',
  },
  headerTextCalendar: {
    fontSize: horizontalScale(18),
    fontFamily: 'DMSans',
    textAlign: 'center',
  },
  rightIconsView: {
    width: '60%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  rightArrowView: {
    width: '30%',
    height: '60%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
});

import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from "react";
import {verticalScale} from '../../../helpers/layoutHelper';
import BackHeader from '../../../components/MainContainer/BackHeader';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../Navigation/ChatScreenNavigation';
import {Pallete, fonts} from '../../../theme/enum';
import moment from 'moment';
import {SessionNote} from '../../careteam/components/SessionNotesCard';
import {extractSingleSessionInfo} from '../../session/helpers/sessionObjectDestructuring';
import InstructorInfoComponent from '../../session/components/InstructorInfoComponent';
import SessionDetails from '../../session/components/SessionDetails';
import MainCtaComponent from '../../../components/ButtonComponents/MainCtaComponent/MainCtaComponent';
import TextDateInfoComponent from './TextDateInfoComponent';
import TextDescriptionComponent from './TextDescriptionComponent';
import {markSessionnotesRead} from '../../../api/homeapis';
import useDataProvider from '../../../context-store/useDataProvider';

interface Props
  extends NativeStackScreenProps<
    RootStackParamList,
    'SessionNoteDetailsScreen'
  > {}
const SessionNoteDetailsScreen: React.FC<Props> = ({route}) => {
  const note: SessionNote = route?.params?.note;
  const landedFrom: string = route?.params?.landedFrom;
  const date = moment(note.date).format('LLL');
  const sessionInfo = extractSingleSessionInfo(note.session);
  const navigation = useNavigation<NavigationProp<any, any>>();

  console.log('Note', note);
  const takeMetoSessionDetails = () => {
    navigation.navigate('SessionFullDetailsScreen', {
      sessionObject: sessionInfo,
    });
  };

  return (
    <View
      style={[
        styles.containerView,
        Platform.OS === 'ios' ? {paddingTop: verticalScale(38)} : {},
      ]}>
      <BackHeader title={sessionInfo.sessionName} />
      <ScrollView style={styles.scrollView}>
        <TextDateInfoComponent date={date} />
        <View style={styles.noteTitleView}>
          <Text style={styles.titleTextStyle}>{note.title}</Text>
        </View>
        <TextDescriptionComponent description={note.description} />
        {landedFrom !== 'SessionScreen' ? (
          <>
            <InstructorInfoComponent
              sessionCarePersonImage={note.created_by_user.image}
              sessionCarePersonId={sessionInfo.sessionCarePersonId}
              sessionCarePerson={sessionInfo.sessionCarePerson}
              sessionCategory={sessionInfo.sessionCategory}
            />
            <SessionDetails
              sessionTime={sessionInfo.sessionTime}
              sessionType={sessionInfo.sessionType}
              duration={sessionInfo.duration}
            />
            <View style={styles.btnContainer}>
              <MainCtaComponent
                style={{}}
                active
                onClick={takeMetoSessionDetails}>
                View session
              </MainCtaComponent>
            </View>
          </>
        ) : (
          <View
            style={{
              height: 200,
            }}></View>
        )}
      </ScrollView>
    </View>
  );
};

export default SessionNoteDetailsScreen;

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: Pallete.plainWhite,
  },
  scrollView: {flex: 1, backgroundColor: Pallete.plainWhite},
  btnContainer: {
    width: '90%',
    height: verticalScale(90),
    paddingVertical: verticalScale(5),
    marginVertical: verticalScale(10),
    alignItems: 'center',
    alignSelf: 'center',
  },
  noteTitleView: {
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  titleTextStyle: {
    fontSize: 18,
    fontFamily: fonts.PrimaryJakartaBold,
    paddingHorizontal: 5,
  },
});

import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {verticalScale} from '../../../helpers/layoutHelper';
import BackHeader from '../../../components/MainContainer/BackHeader';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../Navigation/ChatScreenNavigation';
import {Pallete, fonts} from '../../../theme/enum';
import moment from 'moment';
import {MedicalJournal} from '../screens/ChatExpertNotesScreen';
import Instructorcomponent from './Instructorcomponent';
import useDataProvider from '../../../context-store/useDataProvider';
import TextDateInfoComponent from './TextDateInfoComponent';
import TextDescriptionComponent from './TextDescriptionComponent';

interface Props
  extends NativeStackScreenProps<
    RootStackParamList,
    'ExpertNotesDetailsScreen'
  > {}
const ExpertNotesDetailsScreen: React.FC<Props> = ({route}) => {
  const medicalJournal: MedicalJournal = route?.params?.medicalJournal;
  const spName = medicalJournal.created_by.name;
  const spCat = medicalJournal.created_by.category;
  const date = moment(medicalJournal.date, 'DD-MM-YYYY').format('LLL');
  const {patientBasicDetails} = useDataProvider();

  return (
    <View
      style={[
        styles.containerView,
        Platform.OS === 'ios' ? {paddingTop: verticalScale(38)} : {},
      ]}>
      <BackHeader title={medicalJournal.title} />
      <ScrollView style={styles.scrollView}>
        <TextDateInfoComponent date={date} />
        <Instructorcomponent
          sessionCarePerson={spName}
          sessionCategory={spCat}
        />
        <View style={styles.nameSpacing}>
          <Text style={styles.textStyleName}>
            Hi Mrs {patientBasicDetails.name},
          </Text>
        </View>
        <TextDescriptionComponent description={medicalJournal.description} />
      </ScrollView>
    </View>
  );
};

export default ExpertNotesDetailsScreen;

const styles = StyleSheet.create({
  containerView: {
    flex: 1,

    backgroundColor: Pallete.plainWhite,
  },
  scrollView: {flex: 1, backgroundColor: Pallete.plainWhite},
  nameSpacing: {
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  textStyleName: {
    fontSize: 15,
    fontFamily: fonts.SecondaryDMSansMedium,
  },
});

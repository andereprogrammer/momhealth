import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import HeadingFontComponent from '../../../components/FontComponents/HeadingFontComponent/HeadingFontComponent';
import theme from '../../../theme/Theme';
import {fonts, Pallete} from '../../../theme/enum';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import {MedicalJournal} from '../../chat/screens/ChatExpertNotesScreen';
import {markExpertnotesRead} from '../../../api/homeapis';

type Props = {
  journal: MedicalJournal;
  showSP?: boolean;
};

const ExpertNotesCardV2 = (props: Props) => {
  let date = moment(new Date());
  const navigation = useNavigation();
  let [medicalJournal, setMedicalJournal] = useState(props.journal);
  date = moment(medicalJournal.date, 'DD-MM-YYYY');
  let createdBy = medicalJournal.created_by.name;
  let createdType = medicalJournal.created_by.category;
  let title = medicalJournal.title;
  let desc = medicalJournal.description;
  let showSp = props.showSP===undefined ? true: props.showSP;
  const takeMeToDetails = () => {
    if (!medicalJournal.read) {
      markExpertnotesRead(medicalJournal.id)
        .then(res => {
          updateJournalState();
          navigation.navigate('ExpertNotesDetailsScreen', {
            medicalJournal: medicalJournal,
          });
        })
        .catch(e => {
          Alert.alert('Something went wrong!');
        });
    } else {
      navigation.navigate('ExpertNotesDetailsScreen', {
        medicalJournal: medicalJournal,
      });
    }
  };
  const updateJournalState = () => {
    setMedicalJournal({...medicalJournal, read: true});
  };

  return (
    <View style={stylesNotesCard.containerView}>
      <TouchableOpacity
        onPress={takeMeToDetails}
        style={stylesNotesCard.mainView}>
        {medicalJournal.read === false && (
          <View style={stylesNotesCard.notificationView} />
        )}

        <View style={stylesNotesCard.dateView}>
          <Text style={stylesNotesCard.dateFont}>{date.format('ddd')}</Text>
          <HeadingFontComponent style={stylesNotesCard.textDate}>
            {date.format('DD')}
          </HeadingFontComponent>
        </View>
        <View style={stylesNotesCard.headingDataView}>
          <Text style={stylesNotesCard.userName}>{title}</Text>
          <Text style={stylesNotesCard.msg} numberOfLines={2}>
            {desc}
          </Text>
        </View>
        {showSp && (
          <View style={stylesNotesCard.serviceProviderInfoView}>
            <Text style={stylesNotesCard.secondaryText}>{createdBy}</Text>
            <Text style={stylesNotesCard.secondaryText}>{createdType}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ExpertNotesCardV2;

export const stylesNotesCard = StyleSheet.create({
  notificationView: {
    backgroundColor: '#FF76E1',
    width: 10,
    height: 10,
    borderRadius: 5,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  containerView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  dateFont: {
    fontSize: 16,
  },
  mainView: {
    width: '90%',
    minHeight: verticalScale(75),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    paddingVertical: verticalScale(6),
    paddingHorizontal: horizontalScale(10),
    borderRadius: horizontalScale(20),
    marginVertical: verticalScale(6),
    borderColor: 'rgba(250, 242, 255, 1)',
    // borderWidth: 1,
    elevation: 20,
    shadowColor:
      Platform.OS === 'ios'
        ? 'rgba(71, 31, 185, 0.4)'
        : 'rgba(71, 31, 185, 0.2)',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 1,
    shadowRadius: 3,
  },
  headingDataView: {
    width: '50%',
    height: '100%',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    padding: 10,
  },
  secondaryText: {
    fontSize: 12,
    color: '#3F3641',
    fontFamily: fonts.SecondaryDMSansRegular,
  },
  serviceProviderInfoView: {
    width: '30%',
    paddingRight: 10,
    height: '70%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 18,
  },
  msg: {
    color: '#777',
    fontFamily: fonts.SecondaryDMSansMedium,
    marginTop: 5,
  },
  role: {
    color: '#3F3641',
    fontFamily: fonts.SecondaryDMSansRegular,
  },
  userName: {
    fontFamily: fonts.SecondaryDMSansMedium,
    fontSize: 16,
  },
  dateView: {
    width: '20%',
    height: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: horizontalScale(10),
    backgroundColor: Pallete.backgroundPink,
    alignSelf: 'flex-start',
    gap: 10,
  },
  textDate: {
    color: theme.colors.cardPrimaryBackground,
    fontSize: 16,
    fontFamily: fonts.SecondaryDMSansBold,
  },
});

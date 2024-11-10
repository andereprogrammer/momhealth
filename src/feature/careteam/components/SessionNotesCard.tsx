import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import HeadingFontComponent from '../../../components/FontComponents/HeadingFontComponent/HeadingFontComponent';
import theme from '../../../theme/Theme';
import SecondaryHeadingComponent from '../../../components/FontComponents/SecondaryHeadingComponent/SecondaryHeadingComponent';
import {fonts, Pallete} from '../../../theme/enum';
import moment from 'moment';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {stylesNotesCard} from './ExpertNotesCardV2';
import {Session} from '../../session/helpers/sessionObjectDestructuring';
import {getSessionInfoById} from '../../../api/sessionBooking';
import useDataProvider from '../../../context-store/useDataProvider';
import {markExpertnotesRead, markSessionnotesRead} from '../../../api/homeapis';

export type SessionNote = {
  id: string;
  title: string;
  description: string;
  date: string;
  created_by_user: {
    name: string;
    category: string;
    image: string;
  };
  categories: string[];
  session: Session;
  has_read: boolean;
};

type Props = {
  note: SessionNote;
  landedFrom: string;
};

const SessionNotesCard = (props: Props) => {
  const navigation = useNavigation();
  let date = moment(new Date());
  let note = props.note;
  const [noteStateObject, setNoteStateObject] = useState<SessionNote>(note);

  if (!note) {
    note = {
      date: '2023-10-10',
      title: 'Have a good day!',
      description: 'Expert note description',
    };
  }
  let createdBy = note.created_by_user.name;
  let createdType = note.created_by_user.category;
  date = moment(note.date, 'YYYY-MM-DD');

  useEffect(() => {
    getSessionInfoById(note.session.id)
      .then(res => {
        note.session = res.data.content[0];
      })
      .catch(e => {
        Alert.alert('Oops something went wrong');
      });
  }, [note]);

  const takeMeToDetails = () => {
    if (!note.has_read) {
      markSessionnotesRead(note.id)
        .then(res => {
          updateJournalState();
          navigation.navigate('SessionNoteDetailsScreen', {
            note: note,
            landedFrom: props.landedFrom,
          });
        })
        .catch(e => {
          console.log(e);
          Alert.alert('Something went wrong!');
        });
    } else {
      navigation.navigate('SessionNoteDetailsScreen', {
        note: note,
        landedFrom: props.landedFrom,
      });
    }
  };
  const updateJournalState = () => {
    setNoteStateObject({...noteStateObject, has_read: true});
  };

  let title = note.title;
  let desc = note.description;
  return (
    <View style={stylesNotesCard.containerView}>
      <TouchableOpacity
        onPress={takeMeToDetails}
        style={stylesNotesCard.mainView}>
        {noteStateObject.has_read === false && (
          <View style={stylesNotesCard.notificationView} />
        )}
        <View style={stylesNotesCard.dateView}>
          <Text style={stylesNotesCard.dateFont}>{date.format('ddd')}</Text>
          <HeadingFontComponent style={styles.textDate}>
            {date.format('DD')}
          </HeadingFontComponent>
        </View>
        <View style={stylesNotesCard.headingDataView}>
          <Text style={styles.userName} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.msg} numberOfLines={1}>
            {desc}
          </Text>
        </View>
        {props.landedFrom !== 'SessionScreen' && (
          <View style={stylesNotesCard.serviceProviderInfoView}>
            <Text style={stylesNotesCard.secondaryText}>{createdBy}</Text>
            <Text style={stylesNotesCard.secondaryText}>{createdType}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default SessionNotesCard;

const styles = StyleSheet.create({
  msg: {
    color: '#3F3641',
    fontFamily: fonts.SecondaryDMSansRegular,
    marginTop: 5,
  },
  role: {
    color: '#777',
    fontFamily: fonts.SecondaryDMSansRegular,
  },
  userName: {
    fontFamily: fonts.SecondaryDMSansRegular,
    fontSize: 16,
  },
  dateView: {
    width: '20%',
    height: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: horizontalScale(10),
    backgroundColor: Pallete.lightPink,
    alignSelf: 'flex-start',
  },
  textDate: {
    color: theme.colors.cardPrimaryBackground,
    fontSize: 16,
    fontFamily: fonts.SecondaryDMSansBold,
  },
});

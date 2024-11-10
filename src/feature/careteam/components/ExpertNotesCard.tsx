import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import HeadingFontComponent from '../../../components/FontComponents/HeadingFontComponent/HeadingFontComponent';
import theme from '../../../theme/Theme';
import SecondaryHeadingComponent from '../../../components/FontComponents/SecondaryHeadingComponent/SecondaryHeadingComponent';
import {fonts} from '../../../theme/enum';
import moment from 'moment';

export type Note = {
  id: string;
  title: string;
  description: string;
  date: string;
  createdBy: string;
};

type Props = {
  note: Note;
};

const ExpertNotesCard = (props: Props) => {
  let date = moment(new Date());
  let note = props.note;
  if (!note) {
    note = {
      date: '2023-10-10',
      title: 'Have a good day!',
      description: 'Expert note description',
    };
  }
  date = moment(note.date, 'YYYY-MM-DD');

  let title = note.title;
  let desc = note.description;
  return (
    <View style={styles.mainView}>
      <View style={styles.cardView}>
        <View style={styles.dateView}>
          <Text>{date.format('ddd')}</Text>
          <HeadingFontComponent style={styles.textDate}>
            {date.format('DD')}
          </HeadingFontComponent>
        </View>
        <View style={styles.descView}>
          <SecondaryHeadingComponent style={styles.secondaryText}>
            {title}
          </SecondaryHeadingComponent>
          <Text style={styles.noteText} numberOfLines={1}>
            {desc}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ExpertNotesCard;

const styles = StyleSheet.create({
  mainView: {
    width: '100%',
    height: verticalScale(80),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: verticalScale(10),
  },
  cardView: {
    width: '95%',
    height: '100%',
    paddingHorizontal: horizontalScale(5),
    paddingVertical: verticalScale(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 12,
    shadowColor: 'rgba(71, 31, 185, 0.2)',
    borderRadius: horizontalScale(20),
    borderWidth: 1,
    backgroundColor: '#FFF',
    borderColor: 'rgba(71, 31, 185, 0.2)',
  },
  dateView: {
    width: '20%',
    height: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: horizontalScale(20),
    backgroundColor: theme.colors.inputBg,
    alignSelf: 'flex-start',
  },
  textDate: {
    color: theme.colors.cardPrimaryBackground,
    fontSize: 22,
    fontFamily: fonts.SecondaryDMSansBold,
  },
  descView: {
    width: '75%',
    height: '98%',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 5,
    paddingVertical: verticalScale(10),
  },
  secondaryText: {
    fontFamily: fonts.SecondaryDMSansBold,
    fontSize: 16,
    color: '#000',
    padding: 2,
  },
  noteText: {fontFamily: fonts.SecondaryDMSansMedium, fontSize: 14},
});

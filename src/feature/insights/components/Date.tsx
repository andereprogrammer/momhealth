import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import moment from 'moment';
import theme from '../../../theme/Theme';
import {horizontalScale} from '../../../helpers/layoutHelper';
import {useEffect, useState} from 'react';
import {fonts} from '../../../theme/enum';

const DateSelected = ({date, onSelectDate, selected, background}) => {
  /**
   * use moment to compare the date to today
   * if today, show 'Today'
   * if not today, show day of the week e.g 'Mon', 'Tue', 'Wed'
   *
   */
  const [selectedFormat, setSelectedFormat] = useState(selected);
  const day =
    moment(date).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')
      ? moment(date).format('ddd').substring(0, 1)
      : moment(date).format('ddd').substring(0, 1);
  // get the day number e.g 1, 2, 3, 4, 5, 6, 7
  const dayNumber = moment(date).format('D');

  // get the full date e.g 2021-01-01 - we'll use this to compare the date to the selected date
  const fullDate = moment(date).format('YYYY-MM-DD');
  let selectedFormatDate = moment(selected).format('YYYY-MM-DD');
  useEffect(() => {
    setSelectedFormat(selectedFormatDate);
    console.log('object');
  }, [selected]);

  return (
    <TouchableOpacity
      onPress={() => onSelectDate(fullDate)}
      style={[
        styles.card,
        selectedFormat === fullDate && {
          backgroundColor: background,
          borderColor: theme.colors.cardPrimaryBackground,
          borderWidth: 1,
        },
      ]}>
      <Text
        style={[styles.big, selectedFormat === fullDate && {color: '#000'}]}>
        {day}
      </Text>
      <View style={{height: 10}} />
      <Text
        style={[
          styles.medium,
          selectedFormat === fullDate && {
            color: '#000',
            fontWeight: 'bold',
            fontSize: 14,
          },
        ]}>
        {dayNumber}
      </Text>
    </TouchableOpacity>
  );
};

export default DateSelected;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: horizontalScale(10),
    borderColor: '#ddd',
    padding: 3,
    marginVertical: 8,
    alignItems: 'center',
    height: 50,
    width: 45,
    marginHorizontal: 5,
  },
  big: {
    fontSize: 14,
    fontFamily: fonts.SecondaryDMSansMedium,
  },
  medium: {
    fontWeight: 'bold',
    fontSize: 12,
    fontFamily: fonts.SecondaryDMSansBold,
  },
});

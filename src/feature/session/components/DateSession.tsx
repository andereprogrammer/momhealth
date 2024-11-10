import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import moment from 'moment';
import theme from '../../../theme/Theme';
import {horizontalScale} from '../../../helpers/layoutHelper';

const DateSession = ({date, onSelectDate, selected, background}) => {
  /**
   * use moment to compare the date to today
   * if today, show 'Today'
   * if not today, show day of the week e.g 'Mon', 'Tue', 'Wed'
   */
  let datkey = date;
  const day = moment(datkey).format('dddd');

  const dayNumber = moment(datkey).format('DD');
  const monthNumber = moment(datkey).format('MMM');

  const fullDate = moment(date).format('YYYY-MM-DD');
  return (
    <TouchableOpacity
      onPress={() => onSelectDate(datkey)}
      style={[
        styles.card,
        selected === fullDate && {
          backgroundColor: background,
          borderColor: theme.colors.cardPrimaryBackground,
          borderWidth: 1,
        },
      ]}>
      <Text
        style={[
          styles.medium,
          selected === fullDate && {
            color: '#000',
            fontWeight: 'bold',
            fontSize: 16,
            gap: 4,
          },
        ]}>
        {dayNumber} {monthNumber}
      </Text>
      <Text style={[styles.big, selected === fullDate && {color: '#000'}]}>
        {day}
      </Text>
      {/* <View style={{height: 10}} /> */}
    </TouchableOpacity>
  );
};

export default DateSession;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F6F6F6',
    borderRadius: horizontalScale(10),
    borderColor: '#ddd',
    padding: 8,
    marginVertical: 8,
    alignItems: 'flex-start',
    height: 70,
    width: 100,
    marginHorizontal: 5,
    borderWidth: 1,
    justifyContent: 'space-between',
  },
  big: {
    fontSize: 14,
    fontFamily: 'DMSans-Medium',
  },
  medium: {
    fontSize: 16,
    fontFamily: 'DMSans-Bold',
  },
});

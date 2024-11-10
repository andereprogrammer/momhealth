import {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import moment from 'moment';
import DateSelected from './Date';
import React from 'react';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';

const Calendar = ({onSelectDate, selected}) => {
  const [dates, setDates] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentMonth, setCurrentMonth] = useState('');
  let currentDate = new Date();

  // get the dates from today to 10 days from now, format them as strings and store them in state
  const getDates = () => {
    const _dates = [];
    const today = moment(); // Get the current date
    const startOfMonth = today.clone().startOf('month'); // Get the start of the current month
    const endOfMonth = today.clone().endOf('month'); // Get the end of the current month

  let date = today.clone();
  _dates.push(date);
  let daysToSubtract = 5; // Number of days to subtract to get the last 7 days
  while (daysToSubtract >= 0) {
    // Subtract one day from the current date
    date = date.clone().subtract(1, 'day');
    _dates.push(date);

    daysToSubtract--;
  }
    _dates.reverse();
    setDates(_dates);
  };
  useEffect(() => {
    getDates();
    getCurrentMonth();
  }, []);

  /**
   * scrollPosition is the number of pixels the user has scrolled
   * we divide it by 60 because each date is 80 pixels wide and we want to get the number of dates
   * we add the number of dates to today to get the current month
   * we format it as a string and set it as the currentMonth
   */
  const getCurrentMonth = () => {
    const monthIndex = Math.round(scrollPosition / 45); // Divide scrollPosition by 80 (width of each date) and round to get the index of the current month
    if (dates[monthIndex]) {
      const month = moment(dates[monthIndex]).format('MMMM'); // Get the month name from the date at the calculated index
      setCurrentMonth(month);
    }
  };
  useEffect(() => {
    getCurrentMonth();
    console.log(selected);
  }, [scrollPosition]);

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
        paddingTop: horizontalScale(10),
        paddingBottom: verticalScale(10),
      }}>
      <View style={styles.centered}>
        <Text style={styles.title}>{currentMonth}</Text>
      </View>
      <View style={styles.dateSection}>
        <View style={styles.scroll}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            // onScroll is a native event that returns the number of pixels the user has scrolled
            onScroll={event => {
              const scrollPosition = event.nativeEvent.contentOffset.x;
              const monthIndex = Math.round(scrollPosition / 80); // Assuming each date is 80 pixels wide
              const month = moment(dates[monthIndex]).format('MMMM');
              setCurrentMonth(month);
              setScrollPosition(scrollPosition);
            }}
            scrollEventThrottle={16}>
            {dates.map((date, index) => (
              <DateSelected
                key={index}
                date={date}
                onSelectDate={onSelectDate}
                selected={selected}
                background={'rgba(206, 186, 221, 1)'}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  dateSection: {
    width: '100%',
    padding: 20,
  },
  scroll: {
    height: 150,
  },
});

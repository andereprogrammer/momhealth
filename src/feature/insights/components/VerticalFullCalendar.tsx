import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CalendarPicker from 'react-native-calendar-picker';

type Props = {};

const VerticalFullCalendar = (props: Props) => {
  const [selectedStartDate, setSelectedStartDate] = useState();
  const startDate = selectedStartDate ? selectedStartDate.toString() : '';
  return (
    <View style={styles.container}>
      <CalendarPicker onDateChange={date => setSelectedStartDate(date)} />

      <View>
        <Text>SELECTED DATE:{startDate}</Text>
      </View>
    </View>
  );
};

export default VerticalFullCalendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 100,
  },
});

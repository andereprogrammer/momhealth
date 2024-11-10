import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useState} from 'react';
import DatePicker from 'react-native-modern-datepicker';
import theme from '../../theme/Theme';
import useDataProvider, {
  DataProviderContext,
} from '../../context-store/useDataProvider';
const DatePickerComponent = ({modalVisible, openDatePicker}) => {
  const [selectedDate, setSelectedDate] = useState('');
  const {date, setDate, setfilled} = useDataProvider();

  const dateSelected = text => {
    setSelectedDate(text);
    setDate(text);
    setfilled(true);
    console.log(date);
    // openDatePicker();
  };

  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() => openDatePicker()}>
              <Text style={styles.textStyle}>X</Text>
            </Pressable>
            <DatePicker
              onSelectedChange={text => dateSelected(text)}
              options={{
                backgroundColor: '#fff',
                textHeaderColor: '#000',
                textDefaultColor: '#000',
                selectedTextColor: '#000',
                mainColor: theme.colors.inputBg,
                textSecondaryColor: '#000',
              }}
              mode="calendar"
              style={styles.calendarStyle}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DatePickerComponent;

const styles = StyleSheet.create({
  calendarStyle: {
    borderRadius: 20,
    fontSize: 12,
    padding: 0,
  },
  modalView: {
    flex: 1,
    backgroundColor: '#c3c3c3',
    opacity: 1,
  },
  modalContent: {
    marginVertical: 20,
    paddingLeft: 8,
    paddingRight: 8,
    marginTop: 130,
  },
  button: {
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    elevation: 3,
    width: 30,
    height: 30,
    marginLeft: 350,
    marginBottom: 10,
  },
  buttonOpen: {
    backgroundColor: theme.colors.cardPrimaryBackground,
  },
  textStyle: {
    color: '#FF994F',
  },
});

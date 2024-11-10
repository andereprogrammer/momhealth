import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import useDataProvider, {
  DataProviderContext,
} from '../../context-store/useDataProvider';
import theme from '../../theme/Theme';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {Cross} from '../../assets';

const BirthDatePicker = props => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [showDate, setShowDate] = useState(new Date());
  const [isDobValid, setIsDobValid] = useState(true);
  const [filled, setfilled] = useState(false);
  const {date, setDate} = useDataProvider();
  const [modalVisible, setModalVisible] = useState(false);

  const {width} = useWindowDimensions();
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setModalVisible(false);
  };

  const handleConfirm = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      hideDatePicker();
    }
    let formatedDate = moment(selectedDate).format('DD-MM-YYYY');
    let dateSelected = selectedDate;
    setDate(formatedDate);
    setShowDate(dateSelected);
  };

  function isOver18(dateOfBirth) {
    const date18YrsAgo = new Date();
    date18YrsAgo.setFullYear(date18YrsAgo.getFullYear() - 18);
    return dateOfBirth <= date18YrsAgo;
  }

  useEffect(() => {
    console.log(modalVisible);
  }, [modalVisible, hideDatePicker]);

  const openDatePicker = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={[styles.dateContainer, width]}>
      <Text style={styles.inputLabel}>{props.label}</Text>
      <View
        style={[
          styles.date,
          {borderColor: isDobValid ? (filled ? '#000' : '#C4C4C4') : 'red'},
        ]}>
        {modalVisible && (
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.closeBtn} onPress={hideDatePicker}>
              {/* <Image
                source={Cross}
                resizeMode="contain"
                resizeMethod="resize"
                style={{
                  width: 25,
                  height: 25,
                }}
              /> */}
              <Text>Done</Text>
            </TouchableOpacity>

            <DateTimePicker
              value={showDate}
              mode={'date'}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              is24Hour={true}
              onChange={handleConfirm}
              style={styles.datePicker}
            />
          </View>
        )}

        <TouchableOpacity onPress={openDatePicker} style={styles.dateContent}>
          <Text style={styles.dateText}>{date}</Text>
          <Image
            source={require('../../assets/images/Onborading/Calendar.png')}
            style={styles.calenderIcon}
          />
        </TouchableOpacity>
      </View>
      {!isDobValid && <Text style={styles.errorText}>{'Enter valid DOB'}</Text>}
    </View>
  );
};

export default BirthDatePicker;

const styles = StyleSheet.create({
  modalView: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 1,
    display: 'flex',
    backgroundColor: 'gray',
  },
  dateContainer: {
    marginBottom: 20,
    padding: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },

  inputLabel: {
    fontWeight: '500',
    marginBottom: 8,
    fontSize: 14,
    color: '#000',
  },

  date: {
    backgroundColor: theme.colors.inputBg,
    paddingHorizontal: 14,
    paddingVertical: 16,
    borderRadius: 30,
  },
  dateContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateText: {
    color: '#000000',
  },
  calenderIcon: {
    width: 18,
    height: 18,
  },

  errorText: {
    color: 'red',
    paddingVertical: 8,
    paddingLeft: 4,
  },
  datePicker: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 1,
    display: 'flex',
    position: 'absolute',
    zIndex: 90000,
    bottom: 0,
    backgroundColor: '#a3a3a3',
    left: 0,
    right: 0,
    borderRadius: 20,
    shadowColor: '#a3a3a3',
  },
  closeBtn: {
    zIndex: 90000,
    bottom: 220,
    position: 'absolute',
    width: 40,
    height: 25,
    right: 10,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});

import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {LegacyRef, useEffect, useRef, useState} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import {
  WeekDates,
  getCurrentMonthWeekDates,
  getMonthStartEndDates,
  getNextMonthWeekDates,
} from '../helpers/getDatetimeValues';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import {BackBtn, Calendar} from '../../../assets';
import moment from 'moment';
import theme from '../../../theme/Theme';

type PropsCal = {
  shareMonthChange: (dates: any) => void;
};
const RenderDateRange = () => {
  const [selectedStartDate, setSelectedEndDate] = React.useState({
    selectedEndDate: '',
    selectedStartDate: '',
  });
  const minDate = new Date(); // Today
  const maxDate = new Date(2017, 6, 3);
  const startDate = selectedStartDate
    ? selectedStartDate?.selectedStartDate.toString()
    : '';
  const endDate = selectedStartDate
    ? selectedStartDate?.selectedEndDate.toString()
    : '';
  const onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      setSelectedEndDate({...selectedStartDate, selectedEndDate: date});
    } else {
      setSelectedEndDate({...selectedStartDate, selectedStartDate: date});
    }
  };
  return (
    <View style={styles.datePickerView}>
      {/* <MonthPicker
          onChange={onDateChange}
          value={new Date()}
          minimumDate={new Date()}
          maximumDate={new Date(2025, 5)}
          locale="ko"
        /> */}
      {/* <CalendarPicker
          // startFromMonday={true}
          allowRangeSelection={true}
          // minDate={minDate}
          // maxDate={maxDate}
          todayBackgroundColor="#f2e6ff"
          selectedDayColor="#7300e6"
          selectedDayTextColor="#FFFFFF"
          onDateChange={onDateChange}
          onMonthChange={() => console.log('object')}
          horizontal={true}
        /> */}
    </View>
  );
};

const RenderCalendar = (props: PropsCal) => {
  let [currentWeek, setCurrentWeek] = useState<WeekDates>();
  let [showPopUp, setShowPopUp] = useState(false);
  let [year, setYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const pickerRef = useRef(null);
  const months = [
    {label: 'January', value: 1},
    {label: 'February', value: 2},
    {label: 'March', value: 3},
    {label: 'April', value: 4},
    {label: 'May', value: 5},
    {label: 'June', value: 6},
    {label: 'July', value: 7},
    {label: 'August', value: 8},
    {label: 'September', value: 9},
    {label: 'October', value: 10},
    {label: 'November', value: 11},
    {label: 'December', value: 12},
  ];
  useEffect(() => {
    console.log('currentMonth', selectedMonth);
    let values = getCurrentMonthWeekDates();
    setCurrentWeek(values);
    let dates = getMonthStartEndDates(selectedMonth, year);
    console.log('date ranges', dates);
    props.shareMonthChange(dates);
  }, [selectedMonth, year]);

  const handleCalendar = condition => {
    console.log('handleCal', condition, selectedMonth);
    if (condition === 'add') {
      if (selectedMonth === 11) {
        setSelectedMonth(0);
        setYear(prevState => prevState + 1);
      } else {
        setSelectedMonth(prevState => prevState + 1);
      }
    } else if (condition === 'minus') {
      if (selectedMonth === 0) {
        setSelectedMonth(11);
        setYear(prevState => prevState - 1);
      } else {
        setSelectedMonth(prev => prev - 1);
      }
    }
  };

  return (
    <>
      {showPopUp ? (
        <RenderDateRange />
      ) : (
        <View style={styles.mainView}>
          <View style={styles.modalContainerView}>
            <TouchableOpacity style={styles.popUpBtn}>
              <Image
                style={{width: '30%', height: '80%'}}
                resizeMethod="resize"
                resizeMode="contain"
                source={Calendar}
              />
            </TouchableOpacity>
            <View style={styles.btnMainView}>
              <View style={styles.pickerView}>
                <Text>
                  {months[selectedMonth].label} {year}
                </Text>
                <View style={styles.btnView}>
                  <TouchableOpacity
                    onPress={() => handleCalendar('minus')}
                    style={styles.arrowBtnView}>
                    <Image
                      style={styles.imageLeftArrow}
                      resizeMethod="auto"
                      resizeMode="contain"
                      source={BackBtn}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handleCalendar('add')}
                    style={styles.arrowBtnView}>
                    <Image
                      style={styles.imageRightArrow}
                      resizeMethod="resize"
                      resizeMode="contain"
                      source={BackBtn}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default RenderCalendar;

const styles = StyleSheet.create({
  pickerView: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'row',
  },
  popUpBtn: {
    width: '20%',
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainerView: {
    width: '90%',
    height: '100%',
    backgroundColor: '#FAF2FF',
    borderRadius: horizontalScale(20),
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainView: {
    width: '100%',
    height: verticalScale(37),
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: Platform.OS === 'ios' ? 0 : 10,
  },
  datePickerView: {
    flex: 3,
    zIndex: 100,
    position: 'absolute',
    top: 0,
    backgroundColor: '#fff',
  },
  arrowBtnView: {
    width: '28%',
    height: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.cardPrimaryBackground,
    borderRadius: horizontalScale(11),
  },
  imageLeftArrow: {
    width: '60%',
    height: '100%',
    transform: [{rotate: '360deg'}],
  },
  imageRightArrow: {
    width: '60%',
    height: '100%',
    alignItems: 'center',
    transform: [{rotate: '180deg'}],
  },
  btnView: {
    width: '40%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  btnMainView: {
    width: '85%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
  Animated,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {Calendar, ErrorIcon} from '../../../assets';
import allStyles from '../../../styles/GlobalStyles';
import getDefaultShadow from '../../../styles/ShadowPresets';
import {fonts} from '../../../theme/enum';
import ImageWithView from '../../../components/ImageWithView';
import {verticalScale} from '../../../helpers/layoutHelper';

const DatePicker = props => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [showDate, setShowDate] = useState('');
  const [isDobValid, setIsDobValid] = useState(true);
  const [filled, setfilled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isDateValid, setIsDateValid] = useState(true);
  const scaleAnim = useState(new Animated.Value(0))[0]; // Initial fade value

  useEffect(() => {
    if (props.value) {
      setShowDate(props.value);
    }
  }, []);

  const {width} = useWindowDimensions();
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setModalVisible(false);
  };

  // const handleConfirm = event => {
  //   console.log('TRIGGERED::', moment(event).format('DD-MM-YYYY'));
  //   let formatedDate = moment(event).format('DD-MM-YYYY');
  //   let dateSelected = formatedDate;
  //   props.updateDate(dateSelected);
  //   setShowDate(dateSelected);
  //   hideDatePicker();
  // };

  useEffect(() => {}, [modalVisible, hideDatePicker]);

  const openDatePicker = () => {
    setModalVisible(!modalVisible);
  };
  const handleConfirm = (date: Date) => {
    const formattedDate = moment(date).format('DD-MM-YYYY');
    const isValid = validateDate(date);

    if (!isValid) {
      triggerError();
    } else {
      setIsDateValid(true);
      setShowDate(formattedDate);
      props.updateDate(formattedDate);
      hideDatePicker();
    }
  };
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 7);
  const lmpDefault = new Date(today);
  lmpDefault.setDate(today.getDate() - 29);

  const lmpMinDate = new Date(today);
  lmpMinDate.setDate(today.getDate() - 294);
  const eddMaxDate = new Date(today);
  eddMaxDate.setDate(today.getDate() + 259);

  const validateDate = (date: Date) => {
    const today = new Date();
    const lmpMinDate = new Date(today);
    lmpMinDate.setDate(today.getDate() - 294);
    const eddMaxDate = new Date(today);
    eddMaxDate.setDate(today.getDate() + 259);

    if (props.LMP) {
      return date >= lmpMinDate && date <= lmpDefault;
    } else if (props.EDD) {
      return date >= tomorrow && date <= eddMaxDate;
    }
    return true;
  };

  const triggerError = () => {
    setIsDateValid(false);
    setShowError(true);
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 6,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(scaleAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setShowError(false);
      });
    }, 6000);
  };

  return (
    <>
      <View style={[props.style?.dataContainer, styles.dateContainer, width]}>
        <Text style={styles.inputLabel}>{props.label}</Text>

        <View
          style={[
            {
              backgroundColor: props.style?.date?.backgroundColor
                ? props.style.date.backgroundColor
                : '#FFF2FC',
            },
            styles.date,
            {borderColor: isDobValid ? (filled ? '#000' : '#C4C4C4') : 'red'},
          ]}>
          {modalVisible && (
            <View style={styles.modalView}>
              <DateTimePickerModal
                isVisible={modalVisible}
                mode="date"
                onDateChange={handleConfirm}
                onCancel={() => hideDatePicker()}
                onConfirm={handleConfirm}
                pickerStyleIOS={{zIndex: 0}}
                backdropStyleIOS={{zIndex: -1, opacity: showError ? 0 : 0.1}}
                pickerContainerStyleIOS={{zIndex: 4}}
                pickerComponentStyleIOS={{zIndex: 4}}
                // minimumDate={props.LMP ? lmpMinDate : tomorrow}
                // maximumDate={props.LMP ? lmpDefault : eddMaxDate}
                date={props.LMP ? lmpDefault : tomorrow}
              />
            </View>
          )}

          <TouchableOpacity onPress={openDatePicker} style={styles.dateContent}>
            {showDate === '' && (
              <Text style={{color: '#c3c3c3', fontSize: 14}}>DD-MM-YYYY</Text>
            )}

            <Text style={styles.dateText}>{showDate}</Text>
            <Image
              source={Calendar}
              style={styles.calenderIcon}
              tintColor={'#777'}
            />
          </TouchableOpacity>
        </View>
        {!isDobValid && (
          <Text style={styles.errorText}>{'Enter valid DOB'}</Text>
        )}
      </View>

      {showError && (
        <Animated.View
          style={[
            styles.errorBox,
            allStyles.positionAbsolute,
            getDefaultShadow(),
            allStyles.roundedLg,
            allStyles.py3,
            allStyles.px1,
            {
              transform: [{scale: scaleAnim}],
              top: verticalScale(-180),
              backgroundColor: '#FCE9E5',
              zIndex: 10,
              borderWidth: 1,
              borderColor: '#EFD0C6',
            },
          ]}>
          <View
            id="HeaderContainer"
            style={[allStyles.flexRow, allStyles.itemsCenter, allStyles.gap1]}>
            <ImageWithView
              imageSource={ErrorIcon}
              width={'15%'}
              height={'100%'}
              isLocalImage
              tintColor="red"
              mode="contain"
              customStyle={[getDefaultShadow()]}
            />
            <View
              style={{
                width: '85%',
                height: '100%',
              }}>
              <Text
                style={[
                  {
                    color: '#36363B',
                    fontFamily: fonts.PrimaryJakartaBold,
                    fontSize: 15,
                  },
                ]}>
                {props.LMP ? `Invalid LMP date` : 'Invalid EDD date'}
              </Text>
              <Text style={styles.errorText}>
                {props.LMP
                  ? `Kindly select a valid date`
                  : 'Kindly select a valid date'}
              </Text>
            </View>
          </View>
        </Animated.View>
      )}
    </>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  modalView: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 1,
    display: 'flex',
    width: '100%',
    opacity: 0.9,
    zIndex: 3,
  },
  dateContainer: {
    position: 'relative',
    padding: 8,
  },

  inputLabel: {
    fontWeight: '500',
    marginBottom: 8,
    fontSize: 14,
    color: '#777',
  },

  date: {
    paddingHorizontal: 15,
    paddingVertical: 13,
    borderRadius: 10,
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
    paddingVertical: 8,
    fontFamily: fonts.SecondaryDMSansMedium,
    fontSize: 14,
    color: '#777',
  },
  datePicker: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 1,
    display: 'flex',
    position: 'absolute',
    zIndex: 900000000,
    backgroundColor: '#777',
    left: 0,
    right: 0,
    borderRadius: 20,
    borderWidth: 1,
    top: -120,
  },
  closeBtn: {
    zIndex: 10000000,
    width: 60,
    height: 35,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    position: 'absolute',
    top: -140,
    right: 0,
  },
});

import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import BirthDatePicker from '../../../components/BirthdatePickerComponent/BirthDatePicker';
import {SelectList} from 'react-native-dropdown-select-list';
import InputComponent from '../../../components/InputComponent/InputComponent';
import theme from '../../../theme/Theme';
import useDataProvider, {
  DataProvider,
  DataProviderContext,
} from '../../../context-store/useDataProvider';
import HeaderComponent from '../../../components/MainContainer/HeaderComponent/HeaderComponent';
import MainCtaComponent from '../../../components/ButtonComponents/MainCtaComponent/MainCtaComponent';
import SecondaryHeadingComponent from '../../../components/FontComponents/SecondaryHeadingComponent/SecondaryHeadingComponent';
import {registerPatient} from '../../../api/userCreationHelper';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import ProgressBarComponent from '../../../components/MainContainer/ProgressBarComponent';
import {Pallete, fonts} from '../../../theme/enum';
import DatePicker from '../../reports/components/DatePicker';
import {Dropdown} from 'react-native-element-dropdown';
import BackHeader from '../../../components/MainContainer/BackHeader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {track} from '@amplitude/analytics-react-native';
import validator from 'validator';

// import { Container } from './styles';

const RegisterFormScreen: React.FC = () => {
  //states and variables
  const data = [
    {value: 'A+', label: 'A+'},
    {value: 'B+', label: 'B+'},
    {value: 'O+', label: 'O+'},
    {value: 'A-', label: 'A-'},
    {value: 'B-', label: 'B-'},
    {value: 'O-', label: 'O-'},
    {value: 'AB-', label: 'AB-'},
    {value: 'AB+', label: 'AB+'},
  ];
  const [height, setHeight] = useState(20);
  const {patientBasicDetails} = useDataProvider();
  const [isFocus, setIsFocus] = useState(false);
  const [additionalPadding, setAdditionalPadding] = useState(20);
  const [checked, setChecked] = useState(false);
  const keyboardDidShowF = event => {
    setHeight(event.endCoordinates.height - 100);
    // setAdditionalPadding(70);
  };
  const keyboardDidHideF = event => {
    setHeight(20);
    // setAdditionalPadding(0);
  };
  useEffect(() => {
    let keyboardDidshow = Keyboard.addListener('keyboardDidShow', e =>
      keyboardDidShowF(e),
    );
    let keyboardDidHide = Keyboard.addListener('keyboardDidHide', e =>
      keyboardDidHideF(e),
    );
  }, []);
  const navigation = useNavigation<NavigationProp<any, any>>();
  const [inputs, setInputs] = useState({
    firstName: patientBasicDetails?.name ? patientBasicDetails.name : '',
    email: '',
    city: '',
  });
  const [inputValidationBtn, setInputValidationBtn] = React.useState({
    firstnameError: '',
    emailError: '',
    dobError: '',
    cityError: '',
  });
  const [activity, setActivity] = useState(false);
  const {mobile, setFirstName} = useDataProvider();
  const [date, setDate] = useState('');
  //   let dateFormated = date.split('/').join('-');
  const [errors, setErrors] = useState({
    firstName: '',
    email: '',
    city: '',
  });
  const [selected, setSelected] = React.useState('');

  //helper functions
  const handleOnChange = (text, input) => {
    const updatedInputs = {...inputs, [input]: text};
    const updatedErrors = {...inputValidationBtn};

    switch (input) {
      case 'firstName':
        updatedErrors.firstnameError = /^[a-zA-Z0-9 ]{2,30}$/.test(text)
          ? ''
          : 'Invalid format for firstname';
        break;
      case 'city':
        updatedErrors.cityError = /^[a-zA-Z ]+$/.test(text) ? '' : 'Invalid';
        break;
      case 'email':
        updatedErrors.emailError = validator.isEmail(text) ? '' : 'Invalid';
        break;
      default:
        break;
    }

    setInputs(updatedInputs);
    setInputValidationBtn(updatedErrors);
  };

  useEffect(() => {
    const isFormValid =
      inputs.email &&
      inputs.firstName &&
      !inputValidationBtn.dobError &&
      !inputValidationBtn.emailError &&
      !inputValidationBtn.firstnameError;
    setActivity(isFormValid);
  }, [inputs, inputValidationBtn]);

  const getDate = dateValue => {
    setDate(dateValue);
  };

  const handleError = (input, errorMessage) => {
    setErrors(prevErrors => ({...prevErrors, [input]: errorMessage}));
  };

  function validateForm(): void {
    Keyboard.dismiss();
    let valid = true;

    if (!inputs.firstName) {
      valid = false;
      setInputValidationBtn({
        ...inputValidationBtn,
        firstnameError: 'Invalid format',
      });
      handleError('Please input first name', 'firstName');
    } else if (!String(inputs.firstName).match(/^[a-zA-Z ]{2,30}$/)) {
      valid = false;
      setInputValidationBtn({
        ...inputValidationBtn,
        firstnameError: 'Invalid format',
      });
      handleError('Please enter valid first name', 'firstName');
    } else if (String(inputs.firstName).match(/^[a-zA-Z ]{2,30}$/)) {
      setInputValidationBtn({...inputValidationBtn, firstnameError: ''});
      setFirstName(inputs.firstName);
    }

    if (!inputs.email) {
      valid = false;
      setInputValidationBtn({
        ...inputValidationBtn,
        emailError: 'Invalid format',
      });
      handleError('Please input email', 'email');
    } else if (
      !inputs.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    ) {
      valid = false;
      setInputValidationBtn({
        ...inputValidationBtn,
        emailError: 'Invalid format',
      });
      handleError('Please enter valid email', 'email');
    } else if (
      inputs.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    ) {
      setInputValidationBtn({...inputValidationBtn, emailError: ''});
    }

    if (!inputs.city) {
      valid = false;
      setInputValidationBtn({
        ...inputValidationBtn,
        cityError: 'Invalid format',
      });
      handleError('Please input city', 'city');
    } else if (!inputs.city.match(/^[a-zA-Z ]+$/)) {
      valid = false;
      setInputValidationBtn({
        ...inputValidationBtn,
        cityError: 'Invalid format',
      });
      handleError('Please enter valid city', 'city');
    } else if (inputs.city.match(/^[a-zA-Z ]+$/)) {
      setInputValidationBtn({...inputValidationBtn, cityError: ''});
    }

    if (!valid) {
      alert('Please check all the inputs and resolve the errors');
    }
  }
  const handleChecking = v => {
    setChecked(v);
  };

  useEffect(() => {
    track();
  }, []);

  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor: '#fff',
          paddingVertical: horizontalScale(10),
          paddingHorizontal: horizontalScale(5),
          position: 'relative',
        },
        Platform.OS === 'ios' ? {paddingTop: verticalScale(38)} : {},
      ]}>
      <BackHeader title={''} />
      <ProgressBarComponent tile1="100%" tile2="0%" tile3="0%" />
      <View style={{flex: 1}}>
        <KeyboardAwareScrollView
          resetScrollToCoords={{x: 0, y: 0}}
          contentInsetAdjustmentBehavior={'scrollableAxes'}
          contentContainerStyle={{gap: 15}}
          enableOnAndroid={true}
          // enableAutomaticScroll={Platform.OS === 'ios'}
          extraHeight={120}
          extraScrollHeight={120}
          style={{
            flex: 1,
            backgroundColor: '#fff',
            padding: 5,
            marginBottom: Platform.OS === 'ios' ? height - 30 : 0,
          }}>
          <View
            style={{
              paddingLeft: 8,
              gap: 5,
              paddingHorizontal: horizontalScale(10),
            }}>
            <Text
              style={{
                fontSize: horizontalScale(18),
                fontWeight: '800',
                color: '#000',
              }}>
              Welcome aboard,
            </Text>
            <SecondaryHeadingComponent
              style={{
                fontSize: 14,
                paddingLeft: 0,
                marginTop: 5,
                color: '#000',
              }}>
              First a few basics for us to help you better
            </SecondaryHeadingComponent>
          </View>
          {!patientBasicDetails?.name && (
            <InputComponent
              label={'Full name'}
              maxLength={256}
              value={inputs.firstName}
              keyboardType="default"
              isfilled={Boolean(inputs.firstName)}
              placeholder="Eg. Anita Kumar"
              onChangeText={text => handleOnChange(text, 'firstName')}
              onFocus={() => {
                handleError('firstName', null);
              }}
              error={errors.firstName}
            />
          )}
          <InputComponent
            label={'Email'}
            maxLength={256}
            value={inputs.email}
            isfilled={Boolean(inputs.email)}
            placeholder="Eg. ankita@gmail.com"
            keyboardType="email-address"
            onChangeText={text => handleOnChange(text, 'email')}
            onFocus={() => {
              handleError('email', null);
            }}
            error={errors.email}
          />
          <DatePicker
            label={'Date of birth'}
            updateDate={getDate}
            style={{
              date: {backgroundColor: theme.colors.inputBg},
              // dataContainer: {marginBottom: 10},
            }}
          />
          {/*<View style={{padding: 8}}>*/}
          {/*  <Text*/}
          {/*    style={{*/}
          {/*      textAlign: 'left',*/}
          {/*      fontFamily: fonts.SecondaryDMSansBold,*/}
          {/*      color: '#777',*/}
          {/*    }}>*/}
          {/*    Blood group*/}
          {/*  </Text>*/}
          {/*  <Dropdown*/}
          {/*    style={{*/}
          {/*      backgroundColor: theme.colors.inputBg,*/}
          {/*      paddingHorizontal: 15,*/}
          {/*      borderRadius: 10,*/}
          {/*      paddingVertical: 4,*/}
          {/*      marginTop: 5,*/}
          {/*      alignSelf: 'center',*/}
          {/*      width: '100%',*/}
          {/*    }}*/}
          {/*    itemContainerStyle={{*/}
          {/*      backgroundColor: '#FFF',*/}
          {/*      borderRadius: 20,*/}
          {/*    }}*/}
          {/*    itemTextStyle={{*/}
          {/*      fontSize: 15,*/}
          {/*    }}*/}
          {/*    selectedTextStyle={{*/}
          {/*      fontSize: 15,*/}
          {/*    }}*/}
          {/*    placeholderStyle={{*/}
          {/*      color: '#c3c3c3',*/}
          {/*      fontSize: 14,*/}
          {/*    }}*/}
          {/*    containerStyle={{*/}
          {/*      borderRadius: 20,*/}
          {/*    }}*/}
          {/*    data={data}*/}
          {/*    maxHeight={300}*/}
          {/*    labelField="label"*/}
          {/*    valueField="value"*/}
          {/*    placeholder={!isFocus ? 'Select your blood group' : 'Blood group'}*/}
          {/*    value={selected}*/}
          {/*    onFocus={() => setIsFocus(true)}*/}
          {/*    onBlur={() => setIsFocus(false)}*/}
          {/*    onChange={item => {*/}
          {/*      setSelected(item.value);*/}
          {/*      setIsFocus(false);*/}
          {/*    }}*/}
          {/*  />*/}
          {/*</View>*/}

          {/*<InputComponent*/}
          {/*  label={'City'}*/}
          {/*  maxLength={256}*/}
          {/*  value={inputs.city}*/}
          {/*  keyboardType="default"*/}
          {/*  isfilled={Boolean(inputs.city)}*/}
          {/*  placeholder="Eg. Mumbai"*/}
          {/*  onChangeText={text => handleOnChange(text, 'city')}*/}
          {/*  onFocus={() => {*/}
          {/*    handleError('city', null);*/}
          {/*  }}*/}
          {/*  onBlur={() => {*/}
          {/*    setAdditionalPadding(40);*/}
          {/*  }}*/}
          {/*  error={errors.city}*/}
          {/*/>*/}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 2,
              paddingHorizontal: horizontalScale(10),
            }}>
            <CheckBox
              value={checked}
              boxType="circle"
              animationDuration={0.2}
              shouldRasterizeIOS
              onFillColor={Pallete.Eggplant}
              onCheckColor={Pallete.plainWhite}
              onTintColor={Pallete.Eggplant}
              tintColor={Pallete.Eggplant}
              lineWidth={1}
              tintColors={{
                true: Pallete.Eggplant,
                false: Pallete.Eggplant,
              }}
              onValueChange={newValue => handleChecking(newValue)}
            />
            <Text
              style={{
                fontSize: 16,
                marginLeft: 5,
              }}>
              I agree to the Everheal's
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Terms')}>
              <Text style={styles.textBlue}>Terms & Conditions</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>

      <View style={{width: '100%', alignItems: 'center'}}>
        <View style={{width: '90%'}}>
          <MainCtaComponent
            onClick={() =>
              registerPatient(selected, inputs, date).then(() => {
                navigation.navigate('ChooseYourPathScreen');
              })
            }
            active={activity && checked}
            style={{
              backgroundColor: !inputValidationBtn
                ? `${theme.colors.ctadisabled}`
                : `${theme.colors.cardPrimaryBackground}`,
              bottom: Platform.OS === 'ios' ? additionalPadding : -10,
              marginBottom: 50,
              left: 0,
              right: 0,
            }}>
            <Text>Next</Text>
          </MainCtaComponent>
        </View>
      </View>
    </View>
  );
};

export default RegisterFormScreen;
const styles = StyleSheet.create({
  textBlue: {
    fontSize: 14,
    fontWeight: '400',
    color: '#0092ff',
    textDecorationLine: 'underline',
  },
});

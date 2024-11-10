import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  Alert,
  Image,
  Keyboard,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import BirthDatePicker from '../../../components/BirthdatePickerComponent/BirthDatePicker';
import {SelectList} from 'react-native-dropdown-select-list';
import theme from '../../../theme/Theme';
import useDataProvider from '../../../context-store/useDataProvider';
import MainCtaComponent from '../../../components/ButtonComponents/MainCtaComponent/MainCtaComponent';
import {patchPatient, registerPatient} from '../../../api/userCreationHelper';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import {BackBtn, Camera, Pen} from '../../../assets';
import {TouchableOpacity} from 'react-native-gesture-handler';
import InputFilledComponent from '../components/InputFilledComponent';
import RNFS from 'react-native-fs';
import ImageCropPicker from 'react-native-image-crop-picker';
import DatePicker from '../../reports/components/DatePicker';
import moment from 'moment';
import {getHomeScreenInfo} from '../../../api/homeapis';
import BackHeader from '../../../components/MainContainer/BackHeader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

type Props = {};
export type UploadedFile = {
  name: string;
  type: string;
  uri: any;
};

const EditProfileScreen = (props: Props) => {
  const {
    mobile,
    setFirstName,
    patientDetails,
    setPatientDetails,
    setPhotoCounter,
  } = useDataProvider();
  const [uploadFile, setUploadedFile] = useState();
  const dob = patientDetails?.patient.dob;
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState('');
  const getDate = (valu: string) => {
    setDate(valu);
  };

  const data = [
    {value: 'A+', key: 'A+'},
    {value: 'B+', key: 'B+'},
    {value: 'O+', key: 'O+'},
    {value: 'A-', key: 'A-'},
    {value: 'B-', key: 'B-'},
    {value: 'O-', key: 'O-'},
    {value: 'AB-', key: 'AB-'},
    {value: 'AB+', key: 'AB+'},
  ];
  const [height, setHeight] = useState(20);

  const keyboardDidShowF = event => {
    setHeight(event.endCoordinates.height - 100);
  };
  const keyboardDidHideF = event => {
    setHeight(20);
  };
  useEffect(() => {
    let keyboardDidshow = Keyboard.addListener('keyboardDidShow', e =>
      keyboardDidShowF(e),
    );
    let keyboardDidHide = Keyboard.addListener('keyboardDidHide', e =>
      keyboardDidHideF(e),
    );
    console.log(patientDetails.patient);
  }, []);
  const navigation = useNavigation<NavigationProp<any, any>>();
  const [inputs, setInputs] = useState({
    firstName: patientDetails?.patient.name,
    email: patientDetails?.patient.email,
    city: patientDetails?.patient.city,
    dob: moment(patientDetails?.dob, 'DD-MM-YYYY').toDate(),
  });
  const [inputValidationBtn, setInputValidationBtn] = React.useState({
    firstnameError: '',
    emailError: '',
    dobError: '',
    cityError: '',
  });
  const [activity, setActivity] = useState(false);
  //   let dateFormated = date.split('/').join('-');
  const [errors, setErrors] = useState({
    firstName: '',
    email: '',
    city: '',
  });
  const [selected, setSelected] = React.useState('');

  //helper functions
  const handleOnChange = (text: string, input: string) => {
    if (input === 'firstName') {
      if (String(text).match(/^[a-zA-Z ]{2,30}$/)) {
        setInputValidationBtn({...inputValidationBtn, firstnameError: ''});
        setInputs({...inputs, firstName: text});
      } else {
        setInputValidationBtn({
          ...inputValidationBtn,
          firstnameError: 'Invalid format for firstname',
        });
      }
    }

    if (input === 'city') {
      if (String(text).match(/^[a-zA-Z ]+$/)) {
        setInputValidationBtn({...inputValidationBtn, cityError: ''});
        setInputs({...inputs, city: text});
      } else {
        setInputValidationBtn({...inputValidationBtn, cityError: 'Invalid'});
      }
    }

    if (input === 'email') {
      if (
        String(text).match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ) {
        setInputValidationBtn({...inputValidationBtn, emailError: ''});
        setInputs({...inputs, email: text});
      } else {
        setInputValidationBtn({...inputValidationBtn, emailError: 'Invalid'});
      }
    }
    setInputs(previousState => ({...previousState, [input]: text}));
    if (
      inputValidationBtn.cityError === '' &&
      inputs.city !== '' &&
      inputs.email !== '' &&
      inputs.firstName !== '' &&
      inputValidationBtn.dobError === '' &&
      inputValidationBtn.emailError === '' &&
      inputValidationBtn.firstnameError === ''
    ) {
      setActivity(true);
    } else {
      setActivity(false);
    }
  };

  const handleError = (input: string, errorMessage?: string | null) => {
    setErrors(previousState => ({...previousState, [input]: errorMessage}));
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
      Alert.alert('Please check all the inputs and resolve the errors');
    }
  }
  const handleImagePicker = () => {
    ImageCropPicker.openPicker({
      mediaType: 'photo',
      cropping: true,
    })
      .then(image => {
        const imagePath = image.path;
        const data = image.data;
        const imageName = image.filename ?? 'image.jpg';
        const destinationPath =
          'file://' +
          RNFS.DocumentDirectoryPath +
          `/${Date.now().toString()}${imageName}`;

        RNFS.mkdir(RNFS.DocumentDirectoryPath + '/photo')
          .then(async () => {
            await RNFS.copyFile(imagePath, destinationPath)
              .then(() => {
                const uploadFile: UploadedFile = {
                  name: imageName,
                  type: image.mime,
                  uri: destinationPath,
                };
                console.log('selected file', uploadFile);
                setUploadedFile(uploadFile);
              })
              .catch(error => {
                console.log('Error saving image:', error);
              });
          })
          .catch(error => {
            console.log('Error creating photos folder:', error);
          });
      })
      .catch(error => {
        console.log('ImagePicker Error:', error);
      });
  };

  const updatePatient = async (selected, inputs, date, uploadFile) => {
    setLoading(true);
    await patchPatient(selected, inputs, date, uploadFile);
    let res = await getHomeScreenInfo();
    if (res.data) {
      console.log('updated', res.data);
      await setPatientDetails(res.data);
      setPhotoCounter(prevState => prevState + 1);
      setLoading(false);
      navigation.navigate('ProfileHomeScreen');
    }
  };

  const updatePhotoOnScreen = () => {
    if (uploadFile) {
      console.log('Triggered update on screen new');
      setCurrentPhoto(uploadFile.uri);
    } else if (patientDetails?.patient.profile_image) {
      console.log('Triggered update on screen existing');
      setCurrentPhoto(patientDetails.patient.profile_image);
    }
  };
  useEffect(() => {
    updatePhotoOnScreen();
  }, [uploadFile]);

  useEffect(() => {
    updatePhotoOnScreen();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
        // paddingVertical: horizontalScale(10),
        // paddingHorizontal: horizontalScale(15),
        position: 'relative',
      }}>
      <View style={{width: '100%', backgroundColor: '#FFF2D1'}}>
        <BackHeader title="My Profile" bgcolor="#FFF2D1" />
      </View>
      <KeyboardAwareScrollView
        resetScrollToCoords={{x: 0, y: 0}}
        contentInsetAdjustmentBehavior={'scrollableAxes'}
        // contentContainerStyle={{gap: 15}}
        enableOnAndroid={true}
        // enableAutomaticScroll={Platform.OS === 'ios'}
        extraHeight={120}
        extraScrollHeight={120}
        style={{
          flex: 1,
          // backgroundColor: '#fff',
          // padding: 5,
          marginBottom: Platform.OS === 'ios' ? height - 30 : 0,
        }}>
        <View
          style={{
            paddingLeft: 10,
            gap: 5,
            paddingHorizontal: horizontalScale(10),
            height: verticalScale(130),
            backgroundColor: '#FFF2D1',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={handleImagePicker}
            style={{
              width: 120,
              height: 120,
              borderWidth: 1,
              borderColor: '#FF76E1',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
            }}>
            <Image
              resizeMethod="resize"
              resizeMode="contain"
              style={
                currentPhoto
                  ? {
                      width: 115,
                      height: 115,
                      borderRadius: 20,
                    }
                  : {}
              }
              source={currentPhoto !== null ? {uri: currentPhoto} : Camera}
            />
          </TouchableOpacity>
        </View>
        <InputFilledComponent
          label={'Full Name'}
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
        <InputFilledComponent
          label={'Email'}
          maxLength={256}
          value={inputs.email}
          isfilled={Boolean(inputs.email)}
          placeholder="Eg. ankita@gmail.com"
          keyboardType="email-address"
          editable={true}
          onChangeText={text => handleOnChange(text, 'email')}
          onFocus={() => {
            handleError('email', null);
          }}
          error={errors.email}
        />
        <DatePicker
          label={'Date of Birth'}
          value={dob}
          updateDate={getDate}
          style={{
            date: {backgroundColor: theme.colors.inputBg},
            dataContainer: {marginBottom: 10},
          }}
        />
        <View style={styles.inputContainer}>
          <Text style={theme.textVariants.label}>Blood Group</Text>
          <SelectList
            onSelect={() => handleOnChange(selected, 'bloodGroup')}
            setSelected={setSelected}
            searchPlaceholder="Select your blood group"
            fontFamily="DMSans-Medium"
            data={data}
            defaultOption={{
              value: patientDetails.patient.blood_group,
              key: patientDetails.patient.blood_group,
            }}
            dropdownStyles={{
              borderColor: theme.colors.cardPrimaryBackground,
            }}
            inputStyles={{
              marginTop: 3,
              paddingHorizontal: 0,
              marginRight: 20,
              paddingLeft: 20,
              paddingRight: 20,
              color: theme.colors.cardPrimaryBackground,
            }}
            placeholder="Select your blood group"
            arrowicon={
              <Image
                resizeMode="contain"
                style={{
                  marginTop: 7,
                  width: 20,
                  height: 20,
                }}
                source={require('../../../assets/images/Onborading/VectorArrow.png')}
              />
            }
            searchicon={<></>}
            search={true}
            boxStyles={{
              borderRadius: 20,
              borderColor: '#fff',
              marginTop: 10,
              padding: 15,
              paddingLeft: 15,
              paddingRight: 15,
              marginBottom: 20,
              backgroundColor: theme.colors.inputBg,
            }}
          />
        </View>
        <InputFilledComponent
          label={'City'}
          maxLength={256}
          value={inputs.city}
          keyboardType="default"
          isfilled={Boolean(inputs.city)}
          placeholder="Eg. Mumbai"
          onChangeText={text => handleOnChange(text, 'city')}
          onFocus={() => {
            handleError('city', null);
          }}
          error={errors.city}
        />
        <View style={{width: '100%', alignItems: 'center'}}>
          <View style={{width: '90%'}}>
            <MainCtaComponent
              onClick={() => updatePatient(selected, inputs, date, uploadFile)}
              active={activity}
              loading={loading}
              style={{
                backgroundColor: !inputValidationBtn
                  ? `${theme.colors.ctadisabled}`
                  : `${theme.colors.cardPrimaryBackground}`,
                bottom: 0,
                marginBottom: 20,
                left: 0,
                right: 0,
              }}>
              <Text>Save</Text>
            </MainCtaComponent>
          </View>
        </View>
        <View style={{height: 90}} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 0,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

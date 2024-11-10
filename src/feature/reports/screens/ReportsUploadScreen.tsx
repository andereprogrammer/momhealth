import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import {Camera, Uplad} from '../../../assets';
import RNFS from 'react-native-fs';
import ImageCropPicker from 'react-native-image-crop-picker';
import MainCtaComponent from '../../../components/ButtonComponents/MainCtaComponent/MainCtaComponent';
import DocumentPicker, {
  isCancel,
  isInProgress,
  types,
} from 'react-native-document-picker';
import {createReport} from '../../../api/homeapis';
import ItemCard from '../components/ItemCard';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';
import BirthDatePicker from '../../../components/BirthdatePickerComponent/BirthDatePicker';
import DatePicker from '../components/DatePicker';
import {fonts} from '../../../theme/enum';
import theme from '../../../theme/Theme';
import useDataProvider from '../../../context-store/useDataProvider';

type ReportFile = {
  title: string;
  report_type: string;
  file_type: string;
};

type UploadedFile = {
  name: string;
  type: string;
  uri: any;
};

type ReportFileRequest = {
  data: ReportFile;
  report: any;
  fileType: string;
  fileName: string;
};

const ReportsUploadScreen = (props: Props) => {
  const [reportTitle, setReportTitle] = useState('');
  const [reportType, setReportType] = useState('');
  const [itemAdded, setShowItemAddded] = useState(false);
  const [response, setResponseCreated] = useState();
  const [uploadFile, setUploadedFile] = useState();
  const [progressShown, setProgressShown] = useState(false);
  const [progressValue, setProgressValue] = useState(0.3);
  const [saveEnabled, setSaveEnabled] = useState(false);
  const [date, setDate] = useState('');
  const navigation = useNavigation<NavigationProp<any, any>>();
  const reportTypes = [
    {label: 'Pathology', value: 'PATHOLOGY'},
    {label: 'Prescription', value: 'PRESCRIPTION'},
    {label: 'Radiology', value: 'RADIOLOGY'},
    {label: 'Medical Record', value: 'MEDICAL_RECORD'},
  ];
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let enabled = true;
    if (!uploadFile) {
      enabled = false;
    }
    if (reportType === '') {
      enabled = false;
    }
    setSaveEnabled(enabled);
  }, [uploadFile, reportType]);
  const renderLabel = () => {
    if (reportType || isFocus) {
      return (
        <Text
          style={{
            position: 'relative',
          }}>
          Report Type<Text style={{position: 'absolute', top: 0}}>**</Text>
        </Text>
      );
    }
    return null;
  };
  const getDate = (dateValue: string) => {
    setDate(dateValue);
  };
  const handleError = (err: unknown) => {
    if (isCancel(err)) {
      console.warn('cancelled');
    } else if (isInProgress(err)) {
      console.warn(
        'multiple pickers were opened, only the last will be considered',
      );
    } else {
      throw err;
    }
  };

  const handleDocumentPicker = () => {
    DocumentPicker.pick({
      type: types.allFiles,
      allowMultiSelection: false,
    })
      .then(res => {
        const uploadFile: UploadedFile = {
          name: '' + res[0].name,
          type: '' + res[0].type,
          uri: res[0].uri,
        };

        setUploadedFile(uploadFile);
        setShowItemAddded(true);
      })
      .catch(handleError);
  };
  const deleteAndReset = () => {
    console.log('object');
    setShowItemAddded(false);
    setUploadedFile(null);
    setProgressShown(false);
    setProgressValue(0.3);
  };
  const handleCreate = () => {
    setLoading(true);
    setProgressShown(true);
    setTimeout(() => {
      setProgressValue(0.5);
    }, 1000);
    let title = reportTitle;
    if (title === '') {
      title = uploadFile.name;
    }
    const report: ReportFileRequest = {
      data: {
        title: title,
        report_type: reportType,
        file_type: uploadFile.type,
        date: date,
      },
      report: uploadFile.uri,
      fileType: uploadFile.type,
      fileName: uploadFile.name,
    };
    createReport(report)
      .then(res => {
        setResponseCreated(res.data);
        setProgressValue(1);
        setProgressShown(false);
        setLoading(false);
        navigation.navigate('ReportsHomeScreen');
      })
      .catch(e => {
        setLoading(false);
        console.log(e);
        setProgressShown(false);
        setShowItemAddded(false);
        navigation.navigate('ReportsHomeScreen');
      });
  };
  const handleImagePicker = () => {
    ImageCropPicker.openPicker({
      mediaType: 'photo',
    })
      .then(image => {
        const imagePath = image.path;
        const data = image.data;
        const imageName = image.filename ?? 'image.jpg';
        const destinationPath =
          'file://' +
          RNFS.DocumentDirectoryPath +
          `/${imageName}${Date.now().toString()}`;

        RNFS.mkdir(RNFS.DocumentDirectoryPath + '/photo')
          .then(async () => {
            await RNFS.copyFile(imagePath, destinationPath)
              .then(() => {
                const uploadFile: UploadedFile = {
                  name: imageName,
                  type: image.mime,
                  uri: destinationPath,
                };
                setUploadedFile(uploadFile);
                setShowItemAddded(true);
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
  const handleChange = (text: string, name: string) => {
    setReportTitle(text);
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        position: 'relative',
      }}>
      <ScrollView
        style={{
          flex: 1,
          // height: '100%',
        }}>
        <View
          style={{
            width: '94%',
            height: verticalScale(70),
            padding: 10,
            gap: 5,
            alignSelf: 'center',
            marginBottom: 5,
          }}>
          <Text
            style={{
              fontSize: 16,
              paddingVertical: verticalScale(3),
              fontFamily: fonts.SecondaryDMSansBold,
            }}>
            Select the category
            <Text
              style={{
                fontSize: 14,
                color: 'red',
              }}>
              {' '}
              **
            </Text>
          </Text>
          <Dropdown
            style={{
              backgroundColor: '#FFF2FC',
              paddingHorizontal: 10,
              borderRadius: 20,
              paddingVertical: 5,
            }}
            itemContainerStyle={{
              backgroundColor: '#FFF',
              borderRadius: 20,
            }}
            itemTextStyle={{
              fontSize: 15,
            }}
            selectedTextStyle={{
              fontSize: 15,
            }}
            placeholderStyle={{
              color: '#a3a3a3',
            }}
            containerStyle={{
              borderRadius: 20,
            }}
            data={reportTypes}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Choose Report Type' : 'Report Type'}
            value={reportType}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setReportType(item.value);
              setIsFocus(false);
            }}
          />
        </View>
        <View
          style={{
            width: '100%',
            // padding: 10,
            gap: 5,
            paddingHorizontal: horizontalScale(10),
            marginTop: verticalScale(14),
          }}>
          <DatePicker label={'Date'} updateDate={getDate} />
        </View>
        <View
          style={{
            width: '100%',
            height: verticalScale(70),
            padding: 10,
            gap: 5,
            marginVertical: 20,
          }}>
          <Text
            style={{
              fontSize: 16,
              paddingVertical: verticalScale(3),
              paddingHorizontal: horizontalScale(10),
              fontFamily: fonts.SecondaryDMSansBold,
            }}>
            Enter the Title of the report
          </Text>
          <TextInput
            placeholder="Ex Diagnostic Report"
            placeholderTextColor={'#c3c3c3'}
            style={{
              width: '95%',
              height: '70%',
              borderRadius: 20,
              backgroundColor: '#FFF2FC',
              padding: 10,
              alignSelf: 'center',
            }}
            value={reportTitle}
            onChangeText={text => handleChange(text, 'title')}
          />
        </View>

        <View
          style={{
            width: '95%',
            margin: verticalScale(12),
            aspectRatio: 1.5,
          }}>
          <View
            style={{
              width: '100%',
              paddingVertical: verticalScale(20),
            }}>
            <Text
              style={{
                fontSize: 16,
                paddingVertical: verticalScale(3),
                paddingHorizontal: horizontalScale(10),
                fontFamily: fonts.SecondaryDMSansBold,
              }}>
              Upload a File or Image (max size 6 MB)
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              height: '60%',
              flexDirection: 'row',
              gap: horizontalScale(30),
              alignItems: 'center',
              maxHeight: 140,
            }}>
            <TouchableOpacity
              onPress={handleDocumentPicker}
              style={{
                width: '43%',
                height: '100%',
                backgroundColor: '#FFF2FC',
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10,
                gap: 10,
              }}>
              <Image
                resizeMethod="resize"
                resizeMode="contain"
                style={{
                  width: '40%',
                  height: '25%',
                }}
                source={Uplad}
              />
              <Text
                style={{
                  fontSize: 14,
                  textAlign: 'center',
                  fontFamily: fonts.SecondaryDMSansBold,
                }}>
                Upload file from your Device
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleImagePicker}
              style={{
                width: '43%',
                height: '100%',
                backgroundColor: '#FFF2FC',
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10,
                gap: 10,
                borderStyle: 'dashed',
                borderWidth: 1,
                borderColor: theme.colors.cardPrimaryBackground,
              }}>
              <Image
                resizeMethod="resize"
                resizeMode="contain"
                style={{
                  width: '40%',
                  height: '25%',
                }}
                source={Camera}
              />
              <Text
                style={{
                  fontSize: 14,
                  textAlign: 'center',
                  fontFamily: fonts.SecondaryDMSansBold,
                }}>
                Upload Image from your Device
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {itemAdded && (
          <ItemCard
            showProgressBar={progressShown}
            progressValue={progressValue}
            reportName={uploadFile.name}
            deleteFunction={deleteAndReset}
          />
        )}
      </ScrollView>
      <View
        style={{
          alignItems: 'center',
          paddingHorizontal: horizontalScale(10),
          width: '100%',
          height: 100,
        }}>
        <MainCtaComponent
          onClick={handleCreate}
          active={saveEnabled}
          loading={loading}
          style={{
            width: '90%',
          }}>
          Save
        </MainCtaComponent>
      </View>
    </View>
  );
};

export default ReportsUploadScreen;

const styles = StyleSheet.create({});

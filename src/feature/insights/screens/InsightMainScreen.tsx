import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import moment from 'moment';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import HeadingFontComponent from '../../../components/FontComponents/HeadingFontComponent/HeadingFontComponent';
import BottomSheetFilter, {
  BottomSheetRefProps,
} from '../../session/components/BottomSheetFilter';
import theme from '../../../theme/Theme';
import MainCtaComponent from '../../../components/ButtonComponents/MainCtaComponent/MainCtaComponent';
import CustomHeader from '../components/CustomHeader';
import {createLogs, getMoods, searchLogs} from '../../../api/homeapis';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import InsightViewScreen from './InsightViewScreen';
import useDataProvider from '../../../context-store/useDataProvider';
import {Pallete, fonts} from '../../../theme/enum';
import BottomSheetHeaderComponent from '../../session/components/BottomSheetHeaderComponent';
import {MoodResponse, MoodValue} from '../../session/typings';
import {
  Angry,
  Calm,
  Disgusted,
  Fearfull,
  Happy,
  Hopefull,
  Sad,
  Surprised,
} from '../../../assets/animations';
import AnimationMoodComponent from '../components/AnimationMoodComponent';
import JounralTextComponent from '../components/JounralTextComponent';
import CancelBtn from '../components/CancelBtn.component';
import SyptomListComponent from '../components/SyptomListComponent';
import SyptomTextComponent from '../components/SyptomTextComponent';
import {BackBtn, Camera} from '../../../assets';
import ImageCropPicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';
import SecondaryHeadingComponent from '../../../components/FontComponents/SecondaryHeadingComponent/SecondaryHeadingComponent';
import LoadingAnimationScreen from '../../animations/LoadingAnimationScreen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import HighlightedCrossButton from '../../../components/HighlightedCrossButton';
import LinearGradient from 'react-native-linear-gradient';

const {height: SCREEN_HEIGHT} = Dimensions.get('screen');

export const moodAnimations = {
  Happy: Happy,

  Calm: Calm,

  Disgusted: Disgusted,

  Fearful: Fearfull,

  Hopeful: Hopefull,

  Surprised: Surprised,

  Angry: Angry,

  Sad: Sad,
};
const InsightMainScreen = (props: Props) => {
  const navigation = useNavigation<NavigationProp<any, any>>();
  const bottomSheetRef = useRef<BottomSheetRefProps>(null);
  const {moodTrackerDate, setMoodTrackerDate} = useDataProvider();
  const [selectedDate, setSelectedDate] = useState(moodTrackerDate);
  const [personalJournal, setPersonalJournal] = useState('');
  const [selectedItems, setSelectedItems] = useState<MoodResponse>([]);
  const [mood, setMood] = useState<MoodValue[]>([]);
  const [moodLog, setMoodLog] = useState();
  const [syptomsForDay, setSymptomsForDay] = useState(0);
  const [uploadFile, setUploadedFile] = useState();
  const [moodName, setMoodName] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);
  let [showConcern, setShowConcern] = useState(false);
  const [showSave, setShowSave] = useState(false);

  useEffect(() => {
    let value = false;
    if (personalJournal !== '') {
      value = true;
    }
    if (mood.length > 0 && mood.filter(value => value.selected).length > 0) {
      value = true;
    }
    setShowSave(value);
  }, [selectedDate, personalJournal, mood]);

  const handleCheckIn = () => {
    setApiLoading(true);
    const formData = new FormData();
    let checkLog = {
      journal: {
        title: 'Mood Log',
        description: personalJournal,
      },
      symptoms: retrieveSelectedInfo().symtomList ?? [],
      date: moment(selectedDate).format('DD-MM-YYYY'),
    };

    console.log('checkLog', checkLog);
    formData.append('data', {
      string: JSON.stringify(checkLog), //This is how this dumb thing works :)
      type: 'application/json',
    });
    console.log(uploadFile);
    if (uploadFile !== undefined) {
      formData.append('image', {
        name: uploadFile.name,
        uri: uploadFile.uri,
        type: '' + uploadFile.type,
      });
    }
    createLogs(formData)
      .then(() => {
        setApiLoading(false);
        handleOldLogs(selectedDate);
        setPersonalJournal('');
        navigation.navigate('InsightHomeScreen');
      })
      .catch(e => {
        setApiLoading(false);
        console.log(e.response);
      });
  };

  const handleOldLogs = date => {
    setLoading(true);
    setSelectedDate(date);
    setMoodTrackerDate(date);
    searchLogs(moment(selectedDate).format('DD-MM-YYYY'))
      .then(res => {
        setLoading(false);
        console.log('Search Logs', res.data);
        const oldMood = res.data.content.find(
          item => item.journal.title === 'Mood Log',
        );

        if (oldMood === null || oldMood === undefined) {
          console.log('object');
        } else {
          // navigation.navigate('InsightHomeScreen');
        }
        setMoodLog(oldMood);
      })
      .catch(e => {
        setLoading(false);

        console.log('Search Logs Error', e.response);
      });
  };
  useFocusEffect(
    React.useCallback(() => {
      handleOldLogs(moodTrackerDate);
    }, [selectedDate]),
  );
  const fetchMoods = () => {
    getMoods()
      .then(res => {
        console.log('allMoods', JSON.stringify(res.data));
        const updatedCategories = res.data.map(
          (categoryData: MoodResponse) => ({
            ...categoryData,
            selected: false,
          }),
        );
        setSelectedItems(updatedCategories);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    setSymptomsForDay(0);
    fetchMoods();
    return () => {
      setSymptomsForDay(0);
      setMood([]);
      setSelectedItems([]);
      setPersonalJournal('');
      setUploadedFile(undefined);
    };
  }, [moodLog]);

  const retrieveSelectedInfo = () => {
    let counted = 0;
    let symtomIdList: number[] = [];
    mood.map(moodvalue => {
      if (moodvalue.selected) {
        counted = counted + 1;
        symtomIdList.push(moodvalue.id);
      }
    });
    return {
      valuesCounted: counted,
      symtomList: symtomIdList,
    };
  };

  const setUpProfile = (item: any) => {
    setMood(prev => {
      let newVal = [...prev];
      newVal.map(it => {
        if (syptomsForDay <= 2) {
          if (item.id === it.id) {
            it.selected = !it.selected;
            if (it.selected) {
              setSymptomsForDay(prev => prev + 1);
            } else {
              setSymptomsForDay(prev => prev - 1);
            }
          }
        } else {
          if (it.id === item.id && it.selected === true) {
            setSymptomsForDay(prev => prev - 1);
            it.selected = false;
          }
        }
      });
      return newVal;
    });
  };

  const onPress = useCallback((moods: MoodValue[], name: string) => {
    setSymptomsForDay(0);
    let updatedValues = moods.map((moodValue: MoodValue) => ({
      ...moodValue,
      selected: false,
    }));
    updatedValues = updatedValues.map(value => {
      if (value.type === 'PRIMARY') {
        value.selected = true;
      }
      return value;
    });
    setMood(updatedValues);
    setSelectedItems(prev => {
      let oldValues = [...prev];
      oldValues.map(item => {
        if (name === item.name) {
          item.selected = true;
        } else {
          item.selected = false;
        }
      });
      return oldValues;
    });

    setMoodName(name);

    if (
      name !== 'Happy' &&
      name !== 'Calm' &&
      name !== 'Hopeful' &&
      name !== 'Surprised'
    ) {
      setShowConcern(true);
    } else {
      setShowConcern(false);
    }
    const isActive = bottomSheetRef?.current?.isActive();
    if (isActive) {
      bottomSheetRef?.current?.scrollTo(0);
    } else {
      if (Platform.OS === 'ios') {
        bottomSheetRef?.current?.scrollTo(-verticalScale(470));
      } else {
        bottomSheetRef?.current?.scrollTo(-verticalScale(520));
      }
    }
  }, []);
  const removePhoto = () => {
    setUploadedFile(undefined);
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

  return (
    <>
      {loading ? (
        <LoadingAnimationScreen />
      ) : (
        <View style={[{flex: 1, backgroundColor: '#fff'}]}>
          <LinearGradient
            colors={['#FFD6F6', '#FFDE91']}
            style={[
              styles.container,
              Platform.OS === 'ios' ? {paddingTop: verticalScale(38)} : {},
            ]}>
            <CustomHeader title="Check-in" />
            <View
              style={{
                width: '100%',
                height: '80%',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: horizontalScale(10),
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: fonts.SecondaryDMSansBold,
                }}>
                {moment(selectedDate).format('MMM. DD')}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('InsightHomeScreen')}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: fonts.SecondaryDMSansBold,
                  }}>
                  View past entries
                </Text>
                <View
                  style={{
                    width: 30,
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    resizeMethod="resize"
                    resizeMode="contain"
                    source={BackBtn}
                    style={{
                      transform: [{rotate: '180deg'}],
                      width: '100%',
                      height: '60%',
                    }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </LinearGradient>

          <View style={styles.mainView}>
            <View style={styles.mainView}>
              <KeyboardAwareScrollView
                contentInsetAdjustmentBehavior="never"
                contentOffset={{
                  x: 10,
                  y: 10,
                }}
                // contentContainerStyle={{flex: 1}}
                style={[styles.mainView, styles.addingGap]}>
                <ScrollView style={{flex: 1}} automaticallyAdjustKeyboardInsets>
                  <HeadingFontComponent
                    style={[
                      styles.headingStyle,
                      styles.pagePadding,
                      styles.pageVerticalPadding,
                    ]}>
                    Choose the mood that best describes how you are feeling
                    today
                  </HeadingFontComponent>
                  <View style={styles.animationFaceView}>
                    {selectedItems.map(item => {
                      return (
                        <AnimationMoodComponent
                          onAnimationClick={onPress}
                          mood={item.name}
                          id={item.id}
                          values={item.values}
                          moodsAnimationList={moodAnimations}
                          key={item.id}
                          selected={item.selected}
                        />
                      );
                    })}
                  </View>
                  {syptomsForDay > 0 && (
                    <View
                      style={{
                        marginBottom: verticalScale(20),
                        justifyContent: 'center',
                      }}>
                      <Text style={styles.headingSmallText}>You also felt</Text>
                      <View style={styles.staticFeelingView}>
                        {mood.map((moodValue, i) => {
                          if (
                            moodValue.selected &&
                            moodValue.type === 'SECONDARY'
                          ) {
                            return (
                              <View
                                key={i}
                                style={{
                                  width: horizontalScale(75),
                                  height: verticalScale(30),
                                }}>
                                <SyptomTextComponent syptom={moodValue} />
                              </View>
                            );
                          }
                        })}
                      </View>
                    </View>
                  )}
                  <JounralTextComponent
                    journalValue={personalJournal}
                    onValueChange={setPersonalJournal}
                    labelText="Add a note"
                    canEdit
                  />
                  <View
                    style={{
                      paddingHorizontal: horizontalScale(20),
                      marginVertical: verticalScale(10),
                    }}>
                    {uploadFile !== undefined ? (
                      <View
                        style={{
                          position: 'relative',
                          marginVertical: verticalScale(10),
                          borderRadius: 10,
                        }}>
                        <HighlightedCrossButton
                          style={{
                            top: verticalScale(-10),
                            left: -10,
                          }}
                          navigationCall={removePhoto}
                        />
                        <Image
                          style={{
                            width: '30%',
                            height: verticalScale(70),
                            borderRadius: 20,
                          }}
                          resizeMethod="resize"
                          resizeMode="cover"
                          source={{uri: uploadFile.uri}}
                        />
                      </View>
                    ) : (
                      <TouchableOpacity
                        onPress={handleImagePicker}
                        style={{
                          width: '30%',
                          height: verticalScale(80),
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
                            width: '70%',
                            height: '50%',
                          }}
                          source={Camera}
                        />
                        <Text
                          style={{
                            fontSize: 12,
                            textAlign: 'center',
                            fontFamily: fonts.SecondaryDMSansBold,
                          }}>
                          Upload Image
                        </Text>
                        <Text
                          style={{
                            paddingTop: 0,
                            fontSize: 10,
                            textAlign: 'center',
                            fontFamily: fonts.SecondaryDMSansBold,
                          }}>
                          (max size 6MB)
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>

                  <View style={styles.btnView}>
                    <MainCtaComponent
                      active={showSave}
                      loading={apiLoading}
                      style={{}}
                      onClick={handleCheckIn}>
                      Save
                    </MainCtaComponent>
                  </View>
                  <View style={{height: 150}} />
                </ScrollView>
              </KeyboardAwareScrollView>
            </View>
            <BottomSheetFilter
              maxCardHeight={-SCREEN_HEIGHT + 900}
              ref={bottomSheetRef}>
              <View style={[styles.bottomSheetView]}>
                <BottomSheetHeaderComponent
                  text={
                    showConcern
                      ? 'We understand that you are feeling ' + `'${moodName}'`
                      : 'We are glad that you are feeling ' + `'${moodName}'`
                  }
                  closeSheet={() => bottomSheetRef.current?.scrollTo(0)}
                />
                <SecondaryHeadingComponent
                  style={[
                    styles.headingStyle,
                    {
                      paddingHorizontal: horizontalScale(10),
                      paddingBottom: verticalScale(8),
                    },
                  ]}>
                  {showConcern ? 'Might we inquire ' : 'Would you like to add '}
                  any nuances to how you are feeling?
                </SecondaryHeadingComponent>
                <SyptomListComponent moods={mood} clickAction={setUpProfile} />
                <View style={styles.btnContainer}>
                  <CancelBtn
                    onPress={setSymptomsForDay}
                    active={syptomsForDay === 0}
                  />
                  <View style={styles.smallBtnContainer}>
                    <MainCtaComponent
                      onClick={() => bottomSheetRef?.current?.scrollTo(0)}
                      // style={{
                      //   backgroundColor:
                      //     syptomsForDay === 0
                      //       ? `${theme.colors.ctadisabled}`
                      //       : `${theme.colors.cardPrimaryBackground}`,
                      // }}
                      style={{}}
                      active={true}>
                      Apply
                    </MainCtaComponent>
                  </View>
                </View>
              </View>
            </BottomSheetFilter>
          </View>
        </View>
      )}
    </>
  );
};

export default InsightMainScreen;

const styles = StyleSheet.create({
  textHeading: {
    fontFamily: fonts.SecondaryDMSansBold,
    fontSize: 16,
    paddingHorizontal: horizontalScale(20),
    color: Pallete.darkBlack,
  },
  mainView: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  bottomSheetView: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 5,
  },
  animationFaceView: {
    width: '100%',
    height: horizontalScale(270),
    flexWrap: 'wrap',
    paddingHorizontal: horizontalScale(15),
    gap: 2,
    marginVertical: verticalScale(6),
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 15,
  },
  btnView: {
    paddingHorizontal: horizontalScale(20),
    marginVertical: verticalScale(10),
  },
  staticFeelingView: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: horizontalScale(10),
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: horizontalScale(10),
    marginHorizontal: horizontalScale(15),
  },
  selected: {
    width: '100%',
    height: '100%',
    borderRadius: horizontalScale(10),
    borderWidth: 1,
    backgroundColor: 'rgba(255, 118, 225, 0.4)',
    borderColor: 'rgba(255, 118, 225, 1)',
  },
  pagePadding: {
    paddingHorizontal: horizontalScale(20),
  },
  pageVerticalPadding: {
    paddingTop: verticalScale(10),
  },
  headingStyle: {
    fontSize: 16,
    color: Pallete.darkBlack,
    marginVertical: 5,
  },
  addingGap: {
    marginBottom: verticalScale(20),
  },
  headingSmallText: {
    fontFamily: fonts.SecondaryDMSansBold,
    fontSize: 16,
    paddingHorizontal: horizontalScale(20),
    paddingBottom: verticalScale(10),
    color: '#000',
  },
  btnContainer: {
    width: '100%',
    height: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(10),
    alignItems: 'flex-end',
  },
  smallBtnContainer: {
    width: '48%',
    height: '80%',
    borderRadius: 20,
  },
  container: {
    width: '100%',
    height: '18%',
    backgroundColor: 'rgba(255, 229, 167, 1)',
    borderBottomLeftRadius: horizontalScale(20),
    borderBottomRightRadius: horizontalScale(20),
  },
});

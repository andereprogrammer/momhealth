import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import LottieView from 'lottie-react-native';
import HeadingFontComponent from '../../../components/FontComponents/HeadingFontComponent/HeadingFontComponent';
import moment from 'moment';
import {createLogs} from '../../../api/homeapis';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {BottomSheetRefProps} from '../../session/components/BottomSheetFilter';
import {Pallete, fonts} from '../../../theme/enum';
import {moodAnimationValues} from './InsightHomeScreen';
import JounralTextComponent from '../components/JounralTextComponent';
import HighlightedCrossButton from '../../../components/HighlightedCrossButton';
import {Image} from 'react-native';
import {Cross, Nomood} from '../../../assets';
import LinearGradient from 'react-native-linear-gradient';
import TextDescriptionComponent from '../../chat/components/TextDescriptionComponent';
import SecondaryHeadingComponent from '../../../components/FontComponents/SecondaryHeadingComponent/SecondaryHeadingComponent';
import {value} from 'react-native-extended-stylesheet';

type Props = {
  journal: string;
  mood: string;
  date: Date;
  symptoms: any;
  closeView: () => void;
  item: any;
};
const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('screen');

const InsightViewScreen = (props: Props) => {
  const navigation = useNavigation<NavigationProp<any, any>>();
  const bottomSheetRef = useRef<BottomSheetRefProps>(null);
  const [selectedDate, setSelectedDate] = useState(props.date);
  const [personalJournal, setPersonalJournal] = useState(props.journal);
  const [mood, setMood] = useState([]);
  const [syptomsForDay, setSymptomsForDay] = useState(0);
  const secondarySymtoms = props.symptoms.filter(
    value => value.type === 'SECONDARY',
  );
  console.log(props);
  const handleCheckIn = () => {
    let checkLog = {
      journal: {
        title: 'Mood Log',
        description: personalJournal,
      },
      mood: mood,
      symptoms: [0],
      date: moment(selectedDate).format('DD-MM-YYYY'),
    };
    createLogs(checkLog)
      .then(() => {
        navigation.navigate('HomeScreen');
      })
      .catch(e => {
        console.log(e.response);
      });
  };

  const setUpProfile = (item: any) => {
    setSelectedItems(prev => {
      let newVal = [...prev];
      newVal.map(it => {
        if (syptomsForDay <= 2) {
          if (item.key === it.key) {
            it.selected = !it.selected;
            if (it.selected) {
              setSymptomsForDay(prev => prev + 1);
            } else {
              setSymptomsForDay(prev => prev - 1);
            }
          }
        } else {
          if (it.key === item.key && it.selected === true) {
            setSymptomsForDay(prev => prev - 1);
            it.selected = false;
          }
        }
      });
      return newVal;
    });
  };
  const handleClose = () => {
    props.closeView();
  };

  const onPress = useCallback((moods: any) => {
    setMood(moods);
    const isActive = bottomSheetRef?.current?.isActive();
    if (isActive) {
      bottomSheetRef?.current?.scrollTo(0);
    } else {
      bottomSheetRef?.current?.scrollTo(-600);
    }
  }, []);
  useEffect(() => {}, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Pallete.backgroundPink,

        position: 'relative',
      }}>
      <LinearGradient
        style={[
          {
            width: '100%',
            height: SCREEN_WIDTH,
            borderBottomLeftRadius: 200,
            borderBottomRightRadius: 200,
          },
          Platform.OS === 'ios' ? {paddingTop: verticalScale(38)} : {},
        ]}
        colors={['#FFDE91', '#FFD6F6']}>
        <View
          style={{
            height: 50,
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingHorizontal: horizontalScale(10),
          }}>
          <TouchableOpacity onPress={handleClose} style={styles.mainBtnStyle}>
            <Image
              style={styles.imgAspect}
              resizeMethod="resize"
              resizeMode="contain"
              tintColor={'#fff'}
              source={Cross}
            />
          </TouchableOpacity>
        </View>
        {props.mood !== undefined ? (
          <View
            style={{
              marginVertical: 5,
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              marginTop: verticalScale(45),
            }}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: horizontalScale(20),
                height: verticalScale(140),
                justifyContent: 'center',
              }}>
              {props?.mood !== undefined ? (
                <View
                  style={{width: '60%', height: '100%', alignItems: 'center'}}>
                  <LottieView
                    autoPlay
                    source={moodAnimationValues[props.mood]}
                    style={{
                      width: '100%',
                      height: '100%',
                      elevation: 12,
                      shadowColor: '#c3c3c3',
                      shadowOpacity: 0.5,
                      shadowRadius: 6,
                      shadowOffset: {
                        width: 6,
                        height: 2,
                      },
                    }}
                  />
                </View>
              ) : (
                <></>
              )}
            </View>
            <HeadingFontComponent
              style={{
                fontSize: 12,
                paddingHorizontal: horizontalScale(20),
                color: '#777',
              }}>
              You were feeling
            </HeadingFontComponent>
            <Text style={{fontSize: 24}}>{props?.mood}</Text>
          </View>
        ) : (
          <View
            style={{
              width: '100%',
              height: '70%',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: 10,
            }}>
            <Image
              resizeMethod="resize"
              resizeMode="contain"
              style={{
                width: '100%',
                height: '60%',
              }}
              source={Nomood}
            />
            <Text style={{fontSize: 24}}>No mood selected</Text>
          </View>
        )}
      </LinearGradient>
      <ScrollView
        style={{
          flex: 1,
          marginBottom: horizontalScale(20),
          backgroundColor: Pallete.backgroundPink,
        }}>
        <View
          style={{
            paddingHorizontal: horizontalScale(20),
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: verticalScale(5),
          }}>
          <HeadingFontComponent
            style={{
              fontSize: 18,
              color: '#000',
              paddingVertical: verticalScale(5),
            }}>
            {moment(selectedDate).format('MMM. DD, YYYY')}
          </HeadingFontComponent>
        </View>
        {secondarySymtoms.length > 0 && (
          <View>
            <Text
              style={{
                fontFamily: fonts.SecondaryDMSansBold,
                fontSize: 16,
                paddingHorizontal: horizontalScale(20),
                color: '#000',
              }}>
              You also felt
            </Text>
            <View
              style={{
                width: '100%',
                height: 70,
                flexWrap: 'wrap',
                flexDirection: 'row',
                gap: horizontalScale(10),
                alignItems: 'center',
                justifyContent: 'flex-start',
                paddingHorizontal: horizontalScale(20),
                paddingVertical: verticalScale(8),
              }}>
              {secondarySymtoms.map(it => {
                return (
                  <View
                    style={{
                      backgroundColor: Pallete.cardBorder,
                      paddingHorizontal: horizontalScale(10),
                      paddingVertical: verticalScale(10),
                      borderRadius: 10,
                    }}
                    key={it.id}>
                    <Text
                      style={{
                        color: '#000',
                        textAlign: 'center',
                        fontSize: 14,
                      }}>
                      {it.value}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        )}

        <View
          style={{
            marginVertical: verticalScale(10),
          }}>
          <Text
            style={{
              fontSize: 16,
              paddingHorizontal: 20,
              fontFamily: fonts.SecondaryDMSansBold,
            }}>
            Your note
          </Text>
          <TextDescriptionComponent description={personalJournal} />
        </View>
        {props?.item?.image_link !== null ? (
          <>
            <Text
              style={{
                fontSize: 16,
                paddingHorizontal: 20,
                marginBottom: 15,
                fontFamily: fonts.SecondaryDMSansBold,
              }}>
              Your picture
            </Text>
            <View
              style={{
                paddingHorizontal: horizontalScale(20),
                borderColor: Pallete.Eggplant,
                shadowColor: Pallete.Eggplant,
                shadowOffset: {
                  width: 4,
                  height: 4,
                },
                shadowOpacity: 0.4,
                shadowRadius: 6,
                backgroundColor: 'transparent',
              }}>
              <Image
                style={{
                  width: '50%',
                  height: 200,
                  borderRadius: 20,
                }}
                resizeMethod="resize"
                resizeMode="cover"
                source={{uri: props?.item?.image_link}}
              />
            </View>
          </>
        ) : (
          <></>
        )}
        <View style={{height: 100}} />
      </ScrollView>
    </View>
  );
};

export default InsightViewScreen;

const styles = StyleSheet.create({
  mainBtnStyle: {
    width: verticalScale(31),
    height: verticalScale(31),
    backgroundColor: '#00000070',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    padding: verticalScale(6),
  },
  imgAspect: {
    width: '100%',
    height: '100%',
  },
  container: {
    width: '100%',
    height: '12%',
    backgroundColor: 'rgba(255, 229, 167, 1)',
    borderBottomLeftRadius: horizontalScale(20),
    borderBottomRightRadius: horizontalScale(20),
    paddingVertical: verticalScale(24),
  },
  selected: {
    width: '100%',
    height: '100%',
    borderRadius: horizontalScale(10),
    borderWidth: 1,
    padding: horizontalScale(10),
    backgroundColor: 'rgba(255, 118, 225, 0.4)',
    borderColor: 'rgba(255, 118, 225, 1)',
  },
});

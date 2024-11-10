import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import theme, {designPalette} from '../../../theme/Theme';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';

import MainCtaComponent from '../../../components/ButtonComponents/MainCtaComponent/MainCtaComponent';

import {Colorclock, Cross, HandSuccess, Placeholder} from '../../../assets';
// import Check
import BottomSheetFilter, {
  BottomSheetRefProps,
} from '../components/BottomSheetFilter';
import * as eva from '@eva-design/eva';
import CheckBox from '@react-native-community/checkbox';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  bookSession,
  getAllSessionCategories,
} from '../../../api/sessionBooking';

import useDataProvider from '../../../context-store/useDataProvider';

import ViewSessionListComponent from '../components/ViewSessionListComponent';
import RenderCalendar from '../components/RenderCalendar';
import RenderHeader from '../components/RenderHeader';
import RenderDropdownModal from '../components/RenderDropDownModal';
import {Pallete, fonts} from '../../../theme/enum';
import RenderFilterCard from '../../activities/components/RenderFilterCard';
import {filterRender} from '../../activities/components/RenderFilterCard';
import BottomSheetHeaderComponent from '../components/BottomSheetHeaderComponent';
import {getMonthStartEndDates} from '../helpers/getDatetimeValues';
import BackHeader from '../../../components/MainContainer/BackHeader';
import moment from 'moment';
import BottomSheetFilterFixedHeight from '../components/BottomSheetFilterFixedHeight';
import BottomSheet, {BottomSheetRef} from '../components/BottomSheet';
const {height: SCREEN_HEIGHT} = Dimensions.get('screen');

const AllSessionScreen = ({route}) => {
  let filterFromRoute = route?.params?.filter;
  let filterCategories = [
    {value: 'Yoga', id: '1', display: 'Yoga', selected: false},
    {value: 'Lamaze', id: '2', display: 'Lamaze', selected: false},
    {
      value: 'Physiotherapy',
      id: '4',
      display: 'Physiotherapy',
      selected: false,
    },
    {
      value: 'MentalHealth',
      id: '5',
      display: 'Emotional Health',
      selected: false,
    },
  ];
  const {showBottomFilter, selectedSession} = useDataProvider();
  const [visibility, setVisibility] = useState(false);
  const [sessionType, setSessionType] = useState(filterFromRoute);
  const navigation = useNavigation<NavigationProp<any, any>>();
  const [showSuccess, SetShowSuccess] = React.useState(false);
  const [join, setJoin] = React.useState(false);
  const bottomSheetRef = useRef<BottomSheetRef>(null);
  const bottomSheetRefSession = useRef<BottomSheetRefProps>(null);
  const [toggleCheckBox, setToggleCheckBox] = useState(filterCategories);
  const [monthDates, setMonthDates] = useState();
  const headerRef = useRef(null);
  const showOrHideFilter = () => {
    let count = 0;
    if (toggleCheckBox) {
      toggleCheckBox.map(filters => {
        if (filters.selected) {
          count++;
        }
      });
    }
    return count > 0;
  };
  const removeFilter = (category: string) => {
    setToggleCheckBox(prev => {
      let newVal = [...prev];
      newVal.map(it => {
        if (category === it.value) {
          it.selected = false;
        }
      });
      return newVal;
    });
  };

  const handleChecking = (value: boolean, check: string) => {
    console.log(value);
    if (value) {
      setToggleCheckBox(prev => {
        let newVal = [...prev];
        newVal.map(it => {
          if (check === it.value) {
            it.selected = true;
          }
        });
        console.log(newVal);
        return newVal;
      });
    } else {
      setToggleCheckBox(prev => {
        let newVal = [...prev];
        newVal.map(it => {
          if (check === it.value) {
            it.selected = false;
          }
        });
        return newVal;
      });
    }
  };
  const handleModal = (e: boolean) => {
    console.log(e);
    setVisibility(e);
    headerRef.current?.hideModal(e);
  };
  const handleSessionChange = (type: string) => {
    console.log(type);
    setSessionType(type);
  };

  const onConfirm = () => {
    setVisibility(false);
  };

  const onPress = useCallback(() => {
    // const isActive = bottomSheetRef?.current?.isActive();
    // if (isActive) {
    //   bottomSheetRef?.current?.scrollTo(0);
    // } else {
    //   bottomSheetRef?.current?.scrollTo(-420);
    // }
    bottomSheetRef.current?.expand();
  }, []);
  const onPressSession = useCallback(() => {
    const isActive = bottomSheetRefSession?.current?.isActive();
    if (isActive) {
      bottomSheetRefSession?.current?.scrollTo(0);
    } else {
      bottomSheetRefSession?.current?.scrollTo(-600);
    }
  }, []);
  const toCall = filters => {
    console.log(filters);
  };

  const startSession = () => {
    bookSession(selectedSession._id)
      .then(res => {
        console.log(res);
        setJoin(true);
        SetShowSuccess(true);
      })
      .catch(e => {
        console.log(e);
      });
    if (join) {
      if (join) {
        navigation.navigate('WelcomeScreen', {
          id: selectedSession._id,
        });
      }
    }
  };

  useEffect(() => {
    getAllSessionCategories().then(res => {
      let mappedData = res.data.map((category, index) => ({
        value: category.value,
        id: String(index + 1),
        selected: false,
        display: category.display,
      }));
      setToggleCheckBox(mappedData);
    });
  }, []);

  React.useEffect(() => {
    console.log('akjshfahsfhasjfaf', toggleCheckBox);
  }, [toggleCheckBox]);
  React.useEffect(() => {
    setTimeout(() => {
      SetShowSuccess(false);
    }, 3000);
  }, [showSuccess]);
  // useEffect(() => {
  //   setToggleCheckBox(filterCategories);
  // }, []);
  React.useEffect(() => {
    console.log('useEffect onpressfilter');
    var date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth();
    let dates = getMonthStartEndDates(m, y);
    setMonthDates(dates);
    if (showBottomFilter === 'show') {
      if (selectedSession.sessionState === 'BOOKED') {
        setJoin(true);
      }
      onPressSession();
    }
  }, [showBottomFilter, onPress, selectedSession]);

  const handleMonth = (dates: any) => {
    console.log('filterFromRoute', filterFromRoute, dates);
    if (monthDates) {
      updateMonthDateHandling(dates);
    }
    setMonthDates(dates);
  };

  const updateMonthDateHandling = dates => {
    console.log('updateMonthDateHandling trigger');
    if (dates) {
      console.log('monthDates', dates);
      let today = new Date();
      let selectedDate = moment(dates.endDate).toDate();
      let diff = selectedDate - today;

      if (diff < 0 && sessionType === 'Upcoming') {
        setSessionType('Past');
      } else if (diff > 0 && sessionType === 'Past') {
        setSessionType('Upcoming');
      }
    }
  };
  return (
    <View
      style={[
        {flex: 1, backgroundColor: '#fff'},
        Platform.OS === 'ios' && {paddingTop: verticalScale(38)},
      ]}>
      <BackHeader title="" />
      <RenderCalendar shareMonthChange={handleMonth} />
      <RenderHeader
        visibility={visibility}
        typeName={sessionType}
        showFilter={onPress}
        showModal={handleModal}
        ref={headerRef}
      />
      {visibility && (
        <RenderDropdownModal
          visibility={visibility}
          setSessionType={handleSessionChange}
          handleVisibility={handleModal}
        />
      )}
      {showOrHideFilter() && (
        <RenderFilterCard
          sessionCategory={toggleCheckBox}
          onRemoveFilter={toCall}
          onChangeFilter={removeFilter}
        />
      )}
      <ViewSessionListComponent
        onConfirmProp={onConfirm}
        sessionType={sessionType}
        sessionCategory={toggleCheckBox}
        sessionDates={monthDates}
      />
      <BottomSheet
        maxCardHeight={Platform.OS === 'android' ? '65%' : '60%'}
        ref={bottomSheetRef}>
        <BottomSheetHeaderComponent
          text="Filter"
          closeSheet={() => bottomSheetRef.current?.close()}
        />
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: verticalScale(16),
            paddingVertical: 10,
            flex: 1,
            aspectRatio: 1,
          }}>
          {toggleCheckBox !== undefined &&
            toggleCheckBox.map((category, i) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    height: '3%',
                    gap: 9,
                    paddingHorizontal: horizontalScale(25),
                  }}
                  key={i}>
                  <CheckBox
                    boxType="square"
                    value={category.selected}
                    animationDuration={0.5}
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
                    onValueChange={newValue =>
                      handleChecking(newValue, category.value)
                    }
                  />
                  <Text
                    style={{
                      fontFamily: fonts.SecondaryDMSansRegular,
                      fontSize: 14,
                    }}>
                    {category.display}
                  </Text>
                </View>
              );
            })}
        </View>
      </BottomSheet>
      {selectedSession !== undefined && (
        <BottomSheetFilter
          maxCardHeight={-SCREEN_HEIGHT + 900}
          ref={bottomSheetRefSession}>
          <View style={{flex: 1}}>
            <View
              style={{
                width: '100%',
                alignItems: 'flex-start',
                padding: 10,
              }}>
              <Text style={{fontSize: 18, fontWeight: '700'}}>
                {join ? 'Join' : 'Book'} Session
              </Text>
            </View>
            <View style={{width: '100%', alignItems: 'center', padding: 10}}>
              <Text style={{fontSize: 14, fontWeight: '500'}}>
                {join
                  ? 'You have already booked your session.'
                  : 'You’re signing up for this session. Please confirm to be a part of it.'}
              </Text>
            </View>

            <View
              style={{
                width: '100%',
                height: '14%',
                borderRadius: 30,
                backgroundColor: '#FFF2FC',
                borderWidth: 1,
                borderColor: designPalette.primary.lightPink,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 5,
              }}>
              <View
                style={{
                  width: '24%',
                  height: '90%',
                  overflow: 'hidden',
                  margin: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 20,
                }}>
                <Image
                  source={Placeholder}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 20,
                  }}
                  resizeMode="cover"
                  resizeMethod="resize"
                />
              </View>
              <View
                style={{
                  width: '70%',
                  height: '100%',
                  padding: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View style={{height: '25%', width: '100%'}}>
                  <Text
                    style={{
                      fontWeight: '800',
                      fontFamily: 'PlusJakartaSans',
                      fontSize: 14,
                    }}>
                    {selectedSession.sessionName}
                  </Text>
                </View>
                <View
                  style={{
                    width: '100%',
                    alignSelf: 'flex-start',
                    flexDirection: 'column',
                    height: '60%',
                    alignItems: 'center',
                    gap: 4,
                  }}>
                  <View
                    style={{
                      width: '100%',
                      height: '40%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 5,
                    }}>
                    <View
                      style={{
                        backgroundColor: theme.colors.inputBg,
                        padding: horizontalScale(5),
                        borderRadius: horizontalScale(20),
                      }}>
                      <Text
                        style={{
                          fontFamily: 'DMSans-Bold',
                          color: theme.colors.cardPrimaryBackground,
                          textTransform: 'uppercase',
                          fontSize: 12,
                        }}>
                        {selectedSession.sessionCategory}
                      </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: theme.colors.inputBg,
                        padding: horizontalScale(5),
                        borderRadius: horizontalScale(20),
                      }}>
                      <Text
                        style={{
                          fontFamily: 'DMSans-Bold',
                          color: theme.colors.cardPrimaryBackground,
                          textTransform: 'uppercase',
                          fontSize: 12,
                        }}>
                        {selectedSession.sessionCarePerson}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      width: '100%',
                      height: '60%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <View
                        style={{
                          width: '30%',
                          height: '50%',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={Colorclock}
                          resizeMethod="resize"
                          resizeMode="contain"
                          style={{width: '70%', height: '70%'}}
                        />
                      </View>

                      <Text
                        style={{
                          fontFamily: 'DMSans-Medium',
                          fontSize: 12,
                          textAlign: 'center',
                          color: '#000',
                        }}>
                        {selectedSession.duration} min
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            {showSuccess ? (
              <View
                style={{
                  width: '100%',
                  height: '30%',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  flexDirection: 'row',
                  marginBottom: 20,
                  padding: 10,
                }}>
                <Image
                  style={{
                    width: '60%',
                    height: '80%',
                  }}
                  source={HandSuccess}
                />
              </View>
            ) : (
              <View
                style={{
                  width: '100%',
                  height: '30%',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                  padding: 10,
                }}>
                <TouchableOpacity
                  onPress={() => bottomSheetRef?.current?.close()}
                  style={{
                    width: '40%',
                    height: '23%',
                    borderWidth: 1,
                    borderColor: '#5390D9',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 20,
                  }}>
                  <Text>Cancel</Text>
                </TouchableOpacity>
                <View style={{width: '40%'}}>
                  <MainCtaComponent
                    style={{padding: 8}}
                    active={true}
                    onClick={startSession}>
                    {join ? 'Join' : 'Book'}
                  </MainCtaComponent>
                </View>
              </View>
            )}
          </View>
        </BottomSheetFilter>
      )}
    </View>
  );
};

export default AllSessionScreen;

const styles = StyleSheet.create({
  tabBar: {
    padding: 0,
    backgroundColor: '#FFF',
    elevation: 0,
  },
  indicator: {
    backgroundColor: '#fff',
  },
  scene: {
    flex: 1,
  },
});

import {
  Alert,
  Dimensions,
  Image,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import ActivityHomeCardComponent from '../components/ActivityHomeCardComponent';
import {Cross, None} from '../../../assets';
import {getActivities} from '../../../api/homeapis';
import {useFocusEffect} from '@react-navigation/native';
import LoadingAnimationScreen from '../../animations/LoadingAnimationScreen';
import moment from 'moment';
import CheckBox from '@react-native-community/checkbox';
import * as eva from '@eva-design/eva';
import {getActivityTags} from '../../../api/activties';
import BottomSheetFilter, {
  BottomSheetRefProps,
} from '../../session/components/BottomSheetFilter';
import {Pallete, fonts} from '../../../theme/enum';
import RenderActivityHeader from '../components/RenderActivityHeader';
import RenderDropDownModal from '../components/RenderDropDownModal';
import RenderFilterCard from '../components/RenderFilterCard';
import * as Sentry from '@sentry/react-native';
import BottomSheetFilterFixedHeight from '../../session/components/BottomSheetFilterFixedHeight';

type Props = {};
const {height: SCREEN_HEIGHT} = Dimensions.get('screen');

const ActivityHomeScreen = (props: Props) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const bottomSheetRef = useRef<BottomSheetRefProps>(null);
  let currentDate = moment(new Date()).format('DD-MM-YYYY');
  const [showActivities, setShowActivities] = useState('status=ASSIGNED');
  const [visibility, setVisibility] = useState(false);
  const [activityType, setActivityType] = useState('Current');
  const [filtersCategories, setFilters] = useState();

  // useFocusEffect(
  //   React.useCallback(() => {
  //     if (activityType === 'Past') {
  //       setLoading(true);
  //       fetchActivities(`status=COMPLETED`);
  //     } else if (activityType === 'Current') {
  //       setLoading(true);
  //       fetchActivities(`status=ASSIGNED`);
  //       fetchTags();
  //     }
  //   }, []),
  // );

  useEffect(() => {
    setLoading(true);
    // fetchActivities('status=ASSIGNED');
    fetchTags();
  }, []);
  const handleModal = e => {
    console.log('from the home screen', e);
    setVisibility(e);
  };
  const handleSessionChange = (type: string) => {
    console.log(type);
    setActivityType(type);
    setVisibility(false);
  };

  const onConfirm = () => {
    setVisibility(false);
  };
  const showOrHideFilter = () => {
    let count = 0;
    if (filtersCategories) {
      filtersCategories.map(filters => {
        if (filters.selected) {
          count++;
        }
      });
    }
    return count > 0;
  };

  const onPress = useCallback(() => {
    const isActive = bottomSheetRef?.current?.isActive();
    if (isActive) {
      bottomSheetRef?.current?.scrollTo(0);
    } else {
      bottomSheetRef?.current?.scrollTo(verticalScale(-400));
    }
  }, []);

  const handleChecking = (value, check) => {
    console.log(value);
    console.log('check', check);
    if (value) {
      setFilters(prev => {
        let newVal = [...prev];
        console.log('render', newVal);
        newVal.map(it => {
          if (check === it.value) {
            it.selected = true;
          }
        });
        return newVal;
      });
    } else {
      setFilters(prev => {
        let newVal = [...prev];
        console.log('render', newVal);
        newVal.map(it => {
          if (check === it.value) {
            it.selected = false;
          }
        });

        return newVal;
      });
    }
  };

  useEffect(() => {
    if (filtersCategories) {
      let tagIds = filtersCategories
        .filter(item => item.selected === true)
        .map(element => element.id)
        .join(',');
      console.log('Tagids5', tagIds);
      fetchActivities(`tagIds=${tagIds}&status=ASSIGNED`);
    }
  }, [filtersCategories]);

  const onRefresh = React.useCallback(() => {
    console.log('Show Activities');
    fetchActivities(showActivities);
    setActivityType('Current');
  }, [showActivities]);

  const fetchTags = () => {
    getActivityTags()
      .then(res => {
        let allTags = res.data;
        allTags.map(tags => {
          if (tags.type === 'CATEGORY') {
            let categories = [];
            tags.values.map(it => {
              categories.push({
                id: it.id,
                value: it.value,
                selected: false,
                display: it.value,
              });
            });
            setFilters(categories);
          }
        });
      })
      .catch(e => {
        console.log('errortaf', e);
      });
  };

  const fetchActivities = (params: string) => {
    setLoading(true);
    console.log('fetchActivities6 params', params);
    getActivities(params)
      .then(res => {
        setActivities(Array.from(res.data.content));
        console.log(res.data.content);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((e: any) => {
        setLoading(false);
        Sentry.captureException(e);
      });
  };
  const removeFilter = (category: string) => {
    setFilters(prev => {
      let newVal = [...prev];
      newVal.map(it => {
        if (category === it.value) {
          it.selected = false;
        }
      });
      return newVal;
    });
  };

  return (
    // <ApplicationProvider {...eva} theme={eva.light}>
    <View style={{flex: 1}}>
      {visibility && (
        <RenderDropDownModal
          visibility={visibility}
          setSessionType={handleSessionChange}
          handleVisibility={handleModal}
        />
      )}
      <RenderActivityHeader
        visibility={visibility}
        typeName={activityType}
        showFilter={onPress}
        showModal={handleModal}
      />

      {showOrHideFilter() && (
        <RenderFilterCard
          sessionCategory={filtersCategories}
          onRemoveFilter={removeFilter}
        />
      )}

      {loading ? (
        <LoadingAnimationScreen />
      ) : (
        <>
          {activities.length === 0 ? (
            <View
              style={{
                padding: 20,
                backgroundColor: '#fff',
                flex: 1,
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
              }}>
              <Image
                resizeMethod="resize"
                resizeMode="contain"
                style={{
                  width: '100%',
                  height: '30%',
                }}
                source={None}
              />
              <Text
                style={{
                  marginTop: 40,
                  paddingHorizontal: 20,
                  fontSize: 18,
                }}>
                Hurray! All activities are completed.
              </Text>
            </View>
          ) : (
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={loading} onRefresh={onRefresh} />
              }
              nestedScrollEnabled
              contentContainerStyle={{
                alignItems: 'center',
              }}
              style={{
                flex: 3,
                padding: horizontalScale(10),
                backgroundColor: '#fff',
              }}>
              {activities.map((item, i) => {
                console.log(item);
                return (
                  <ActivityHomeCardComponent
                    key={item.id}
                    id={item.id}
                    image={item.activity.image_link}
                    title={item.activity.title}
                    tags={item.activity.tags}
                    description={item.activity.description}
                    url={item.activity.content_link}
                    status={item.status}
                    content_link={item.activity.content_link}
                    content_type={item.activity.content_type}
                    category={item.activity.categories}
                    assignee={item.assignee}
                    requirements={item.activity?.requirements}
                    created={item.activity?.created}
                    assigned_on={item.activity?.assigned_on}
                    duration_in_minutes={item.activity.duration_in_minutes}
                  />
                );
              })}

              <View
                style={{
                  height: verticalScale(100),
                }}
              />
            </ScrollView>
          )}
        </>
      )}
      <BottomSheetFilterFixedHeight maxCardHeight={780} ref={bottomSheetRef}>
        <View
          style={{
            width: '100%',
            paddingHorizontal: horizontalScale(20),
            alignItems: 'flex-start',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: verticalScale(10),
          }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: fonts.PrimaryJakartaBold,
            }}>
            Filter
          </Text>
          <TouchableOpacity
            onPress={() => bottomSheetRef.current?.scrollTo(0)}
            style={{
              width: '10%',
              height: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              resizeMethod="resize"
              resizeMode="contain"
              style={{
                width: '70%',
                height: '100%',
                alignSelf: 'center',
              }}
              source={Cross}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: SCREEN_HEIGHT - 700,
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: verticalScale(16),
            paddingVertical: 10,
          }}>
          {filtersCategories !== undefined && (
            <>
              {filtersCategories.map((tags, i) => {
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      height: verticalScale(20),
                      gap: 9,
                      paddingHorizontal: horizontalScale(25),
                    }}
                    key={i}>
                    <CheckBox
                      value={tags.selected}
                      boxType="square"
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
                      onValueChange={newValue =>
                        handleChecking(newValue, tags.value)
                      }
                    />

                    <Text
                      style={{
                        fontFamily: fonts.SecondaryDMSansRegular,
                        fontSize: 14,
                      }}>
                      {tags.value}
                    </Text>
                  </View>
                );
              })}
            </>
          )}
        </View>
      </BottomSheetFilterFixedHeight>
    </View>
    // </ApplicationProvider>
  );
};

export default ActivityHomeScreen;

const styles = StyleSheet.create({});

import {
  Animated,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  ViewToken,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import LoadingAnimationScreen from '../../animations/LoadingAnimationScreen';
import {SessionEmpty} from '../../../assets';
import PastSessionCardComponent from '../../dashboard/components/FlatListComponents/PastSessionCardComponent';
import {SessionObject} from '../../../constants/types';
import UpcomingSessionCardComponent from '../../dashboard/components/FlatListComponents/UpcomingSessionCardComponent';
import {verticalScale} from '../../../helpers/layoutHelper';
import {
  extractSessionInfo,
  extractSessionInfoFromTemplate,
} from '../helpers/sessionObjectDestructuring';
import {
  getAllGroupSessions,
  getAllGroupSessionsByCategories,
  getAllPastSessionsByCategoryWithDate,
  getAllPersonalSessions,
  getAllPersonalSessionsByCategories,
  getAllUpcomingSessionsByCategoryWithDate,
} from '../../../api/sessionBooking';
import {useFocusEffect} from '@react-navigation/native';
import {useSharedValue} from 'react-native-reanimated';
import {fonts, Pallete} from '../../../theme/enum';
import {AxiosError} from 'axios';
import PersonalSessionCardComponent from '../../dashboard/components/FlatListComponents/PersonalSessionCardComponent';
import {getMonthStartEndDates} from '../helpers/getDatetimeValues';

type filterRender = {
  value: string;
  selected: boolean;
  id: string;
};
const ViewSessionListComponent = ({
  onConfirmProp,
  sessionType,
  sessionCategory,
  sessionDates,
}: {
  onConfirmProp: () => void;
  sessionType: string;
  sessionCategory: filterRender[] | undefined;
  sessionDates: {
    startDate: string;
    endDate: string;
    month: number;
  };
}) => {
  const onboardingRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const scrollX = useRef(new Animated.Value(0)).current;
  let [sessionList, setSessionList] = React.useState<SessionObject[]>([]);
  const viewableItemsShared = useSharedValue<ViewToken[]>([]);
  const showOrHideFilter = () => {
    let count = 0;
    if (sessionCategory) {
      sessionCategory.map(filters => {
        if (filters.selected) {
          count++;
        }
      });
    }
    return count > 0;
  };
  const onViewableItemsChanged = ({viewableItems}) => {
    viewableItemsShared.value = viewableItems;
  };
  const viewabilityConfigCallbackPairs = useRef([{onViewableItemsChanged}]);
  const viewConfigRef = React.useRef({viewAreaCoveragePercentThreshold: 50});

  useEffect(() => {
    console.log('session useEffect', sessionType, sessionDates);
  }, [sessionType, sessionDates, sessionCategory]);

  useFocusEffect(
    React.useCallback(() => {
      console.log('session useCallback', sessionType, sessionDates);
      let currentMonth = new Date().getMonth() + 1;
      showOrHideFilter();
      const handleSuccess = sessionListData => {
        setSessionList(extractSessionInfo(sessionListData.data.content));
        onConfirmProp();
        setLoading(false);
      };
      const handleError = (e: AxiosError) => {
        console.log(e);
        setLoading(false);
      };
      setLoading(true);
      if (sessionDates === undefined) {
        var date = new Date(),
          y = date.getFullYear(),
          m = date.getMonth();
        sessionDates = getMonthStartEndDates(m + 1, y);
      }
      if (sessionType === 'Unbooked') {
        // getAllPersonalSessionsByCategories(sessionCategory)
        //   .then(res => {
        //     let allSessions: SessionObject[] = [];
        //     allSessions.push(...extractSessionInfo(res.data.content));
        //     setSessionList(allSessions);
        //     setLoading(false);
        //     onConfirmProp();
        //   })
        //   .catch(handleError);
        Promise.all([
          getAllPersonalSessionsByCategories(sessionCategory),
          getAllGroupSessionsByCategories(sessionCategory),
        ])
          .then(([personalRes, groupRes]) => {
            const personalSessions = extractSessionInfo(
              personalRes.data.content,
            );
            const groupSessions = extractSessionInfoFromTemplate(groupRes.data);
            const allSessions = [...personalSessions, ...groupSessions];
            setSessionList(allSessions);
            setLoading(false);
            onConfirmProp();
          })
          .catch(handleError);
      } else if (sessionType === 'Upcoming') {
        getAllUpcomingSessionsByCategoryWithDate(
          sessionCategory,
          sessionDates.startDate,
          sessionDates.endDate,
        )
          .then(handleSuccess)
          .catch(handleError);
      } else if (sessionType === 'Past') {
        getAllPastSessionsByCategoryWithDate(
          sessionCategory,
          sessionDates.startDate,
          sessionDates.endDate,
        )
          .then(handleSuccess)
          .catch(handleError);
      }
      return () => setSessionList([]);
    }, [sessionType, sessionDates, sessionCategory]),
  );

  return (
    <>
      {sessionList.length !== undefined ? (
        sessionList.length > 0 ? (
          <View style={{flex: 3, backgroundColor: '#fff'}}>
            {sessionType === 'Upcoming' ? (
              <FlatList
                data={sessionList}
                ItemSeparatorComponent={() => {
                  return <View style={styles.itemSeparatorView} />;
                }}
                contentContainerStyle={styles.flatListContainerView}
                keyExtractor={item => item._id}
                ref={onboardingRef}
                ListFooterComponent={<View style={{height: 100}} />}
                viewabilityConfigCallbackPairs={
                  viewabilityConfigCallbackPairs.current
                }
                viewabilityConfig={viewConfigRef}
                renderItem={({item}: {item: SessionObject}) => (
                  <UpcomingSessionCardComponent
                    key={item._id}
                    {...item}
                    showCta={true}
                    itemsViewed={viewableItemsShared}
                    isAnimated={true}
                    item={item}
                  />
                )}
              />
            ) : (
              <></>
            )}
            {sessionType === 'Past' && (
              <FlatList
                data={sessionList}
                horizontal={false}
                scrollEnabled
                scrollEventThrottle={38}
                contentContainerStyle={styles.flatListContainerView}
                keyExtractor={item => item._id}
                ListFooterComponent={<View style={{height: 100}} />}
                renderItem={({item}: {item: SessionObject}) => (
                  <PastSessionCardComponent key={item._id} {...item} />
                )}
              />
            )}
            {sessionType === 'Unbooked' ? (
              <FlatList
                data={sessionList}
                ItemSeparatorComponent={() => {
                  return <View style={styles.itemSeparatorView} />;
                }}
                contentContainerStyle={styles.flatListContainerView}
                keyExtractor={item => item._id}
                ref={onboardingRef}
                ListFooterComponent={<View style={{height: 100}} />}
                viewabilityConfigCallbackPairs={
                  viewabilityConfigCallbackPairs.current
                }
                viewabilityConfig={viewConfigRef}
                renderItem={({item}: {item: SessionObject}) => (
                  <PersonalSessionCardComponent
                    key={item._id}
                    {...item}
                    showCta={true}
                    itemsViewed={viewableItemsShared}
                    isAnimated={true}
                    item={item}
                  />
                )}
              />
            ) : (
              <></>
            )}
          </View>
        ) : (
          <>
            {loading ? (
              <LoadingAnimationScreen />
            ) : (
              <View style={styles.emptyCardView}>
                <View style={styles.mainContainer}>
                  <Image
                    resizeMethod="resize"
                    resizeMode="contain"
                    style={{
                      width: '80%',
                    }}
                    source={SessionEmpty}
                  />
                </View>
                <View style={styles.imageView}>
                  <Text style={styles.textView}>
                    You have no sessions at the moment
                  </Text>
                </View>
              </View>
            )}
          </>
        )
      ) : (
        <LoadingAnimationScreen />
      )}
    </>
  );
};

export default ViewSessionListComponent;

const styles = StyleSheet.create({
  flatListContainerView: {
    gap: 12,
    marginHorizontal: verticalScale(5),
    alignItems: 'center',
  },
  itemSeparatorView: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#d3d3d3',
  },
  emptyCardView: {
    flex: 1,
    backgroundColor: Pallete.plainWhite,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  mainContainer: {
    width: '80%',
    height: '30%',
  },
  imageView: {
    width: '100%',
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 40,
  },
  textView: {
    fontSize: 20,
    padding: 10,
    margin: 20,
    textAlign: 'center',
    fontFamily: fonts.SecondaryDMSansBold,
  },
});

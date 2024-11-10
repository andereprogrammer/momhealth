import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  RefreshControl,
  Platform,
} from 'react-native';
import MainHeading from '../ui/MainHeading';
import Carousel from '../ui/Carousel';
import {verticalScale} from '../../../../helpers/layoutHelper';
import SkeletonContainer from './SkeletonContainer';
import {fonts, Pallete} from '../../../../theme/enum';
import useDataProvider from '../../../../context-store/useDataProvider';
import HeaderWithIconsComponent from '../../../../components/HeaderWithIconsComponent';
import s from '../../../../styles/GlobalStyles';
import {trigger} from 'react-native-haptic-feedback';
import {options} from '../../../dashboard/navigation/BottomTabNavigation/HomeTabNavigator';
import {useDataStore} from '../../store/useDataStore';
import usePogStore from '../../../freemium/store/usePogDataStore';

const componentRegistry = {
  MainHeading,
  Carousel,
};

type ServerUIRendererProps = {
  keyProp: string;
};

const ServerUIRenderer = () => {
  const {keyProp, countNotification} = useDataProvider();
  const {currentWeek} = usePogStore();
  const {fetchMasterData, masterData, error, loading} = useDataStore();
  const sectionRefs = useRef<(View | null)[]>([]);
  const [headerShown, setHeaderShown] = useState<boolean>(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const getTrimesterHeading = (week: number): string => {
    switch (true) {
      case week >= 1 && week <= 13:
        return 'First';
      case week >= 14 && week <= 26:
        return 'Second';
      case week >= 27 && week <= 40:
        return 'Third';
      default:
        return 'Pregnancy';
    }
  };

  const onRefresh = () => {
    trigger('impactLight', options);
    fetchMasterData();
  };

  useEffect(() => {
    fetchMasterData();
  }, []);

  useEffect(() => {
    if (masterData && keyProp) {
      const keyword = keyProp.toLowerCase();
      const index = masterData.findIndex(section =>
        section.heading.props.text.toLowerCase().includes(keyword),
      );
      if (index !== -1 && sectionRefs.current[index]) {
        sectionRefs.current[index].measure(
          (x, y, width, height, pageX, pageY) => {
            scrollViewRef.current?.scrollTo({y: pageY - 100, animated: true});
          },
        );
      }
    }
  }, [masterData, keyProp]);

  return (
    <>
      <View style={[styles.headerView]}>
        <HeaderWithIconsComponent
          count={countNotification}
          scrollDistance={headerShown}
          hideNotifications={false}
        />
      </View>
      {loading ? (
        <SkeletonContainer />
      ) : (
        <ScrollView
          onScroll={event => {
            const scrolling = event.nativeEvent.contentOffset.y;
            setHeaderShown(scrolling > 0);
          }}
          scrollEventThrottle={32}
          nestedScrollEnabled
          ref={scrollViewRef}
          style={{
            flex: 1,
            paddingTop:
              Platform.OS === 'android' ? verticalScale(42) : verticalScale(38),
          }}
          contentContainerStyle={{
            paddingVertical: 20,
          }}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={onRefresh} />
          }>
          <View style={[s.py3, {paddingHorizontal: 15}]}>
            <Text
              style={[
                s.fontJakartaBold,
                {color: Pallete.Eggplant, fontSize: 24},
              ]}>
              {getTrimesterHeading(currentWeek)} trimester essentials
            </Text>
          </View>
          {masterData &&
            masterData.map((section, sectionIndex) => (
              <View
                key={sectionIndex}
                style={styles.sectionContainer}
                ref={el => (sectionRefs.current[sectionIndex] = el)}>
                {section.list.map((componentConfig, componentIndex) => {
                  const Component = componentRegistry[componentConfig.type];
                  if (!Component) {
                    console.warn(
                      `Component type ${componentConfig.type} not found.`,
                    );
                    return null;
                  }
                  const {data} = componentConfig.props;
                  if (data && data.length > 0) {
                    return (
                      <View
                        key={componentIndex}
                        style={styles.componentContainer}>
                        <Component {...componentConfig.props} />
                      </View>
                    );
                  } else {
                    return null;
                  }
                })}
              </View>
            ))}
          <View style={{height: Platform.OS === 'android' ? 110 : 130}} />
        </ScrollView>
      )}
      {error && (
        <View
          style={{
            position: 'absolute',
            top: 300,
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            left: 50,
          }}>
          <Text style={{fontFamily: fonts.PrimaryJakartaBold, fontSize: 20}}>
            Oops something went wrong
          </Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 5,
  },
  headingContainer: {
    marginBottom: 20,
  },
  componentContainer: {
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  headerView: {
    position: 'absolute',
    marginBottom: verticalScale(3),
    top: 0,
    zIndex: 100,
  },
});

export default ServerUIRenderer;

import {
  BackHandler,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {SCREEN_WIDTH_WINDOW} from '../../../helpers/layoutHelper';
import BackHeader from '../../../components/MainContainer/BackHeader';
import {fonts, Pallete} from '../../../theme/enum';
import MainCtaComponent from '../../../components/ButtonComponents/MainCtaComponent/MainCtaComponent';
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  setOnceIdentityAttribute,
  trackEvent,
} from '../../../helpers/product_analytics';
import {Identify} from '@amplitude/analytics-react-native';
import {setupMom, setupPregnant} from '../../../api/userCreationHelper';
import * as Sentry from '@sentry/react-native';
import useDataProvider from '../../../context-store/useDataProvider';
import {offerings} from '../constants/offerings';
import OfferingListItem from '../components/OfferingListItem';
import {MotiView} from 'moti';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {STAGES} from '../constants';

type Props = {};

const PackageOfferListingScreen = (props: Props) => {
  const navigation = useNavigation<NavigationProp<any, any>>();
  const route = useRoute();

  const {
    onboardingPath,
    syptomFinalList,
    lmp,
    edd,
    newMomDetails,
    setFreemium,
  } = useDataProvider();

  const handleAddStageResponse = (res: any) => {
    let status = res.data.status;
    switch (status) {
      case 'FREEMIUM':
        setFreemium(true);
        break;
      case 'ACTIVE':
        setFreemium(false);
        break;
    }
  };

  useEffect(() => {
    const onBackPress = () => {
      return route.name === 'PackageOfferListingScreen';
    };
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  }, []);

  useEffect(() => {
    if (onboardingPath.pregnant) {
      trackEvent('onboard', 'settingup', 'load');
      const stageOnboarding = STAGES.FREELISTING;
      AsyncStorage.setItem('stage', stageOnboarding);
      const identifyObj = new Identify();
      setOnceIdentityAttribute('stage', 'pregnant');
      Sentry.captureMessage('ONBOARD_pregnant');
      setupPregnant(lmp, edd, syptomFinalList)
        .then(res => {
          console.log('Response of pregnant api', res);
          Sentry.captureMessage('ONBOARD_pregnant_success');
          handleAddStageResponse(res);
        })
        .catch(reason => {
          Sentry.captureException(reason);
        });
    } else if (onboardingPath.newMom) {
      setOnceIdentityAttribute('stage', 'newmom');
      trackEvent('onboard', 'settingup', 'load');
      Sentry.captureMessage('ONBOARD_newMom');
      setupMom(newMomDetails)
        .then(res => {
          console.log('Response of newMom api', res);
          Sentry.captureMessage('ONBOARD_newMom_success');
          handleAddStageResponse(res);
        })
        .catch(reason => {
          Sentry.captureException(reason);
        });
    } else {
      trackEvent('onboard', 'settingup', 'invalid');
      Sentry.captureMessage('ONBOARD_unknown');
    }
  }, []);
  return (
    <SafeAreaView style={listingStyles.container}>
      {/*<BackHeader title="" bgcolor="transparent" />*/}
      <View style={listingStyles.titleSpacing}>
        <Text style={listingStyles.titleText}>
          Many useful features are absolutely free 😊
        </Text>
      </View>
      <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
        {offerings.slice(0, 4).map((item, index) => {
          return (
            <MotiView
              key={item.id}
              from={{
                translateY: -90,
                opacity: 0,
              }}
              animate={{
                translateY: 0,
                opacity: 1,
              }}
              delay={index * 500}>
              <OfferingListItem item={item} />
            </MotiView>
          );
        })}
      </ScrollView>
      <MotiView
        from={{
          translateY: -90,
          opacity: 0,
        }}
        animate={{
          translateY: 0,
          opacity: 1,
        }}
        delay={offerings.slice(0, 4).length * 500}>
        <View style={listingStyles.ctaStyle}>
          <MainCtaComponent
            onClick={() => navigation.navigate('PackageOfferingScreen')}
            active
            style={{}}>
            Continue
          </MainCtaComponent>
        </View>
      </MotiView>
    </SafeAreaView>
  );
};

export default PackageOfferListingScreen;

export const listingStyles = StyleSheet.create({
  ctaStyle: {
    position: 'absolute',
    bottom: SCREEN_WIDTH_WINDOW / 12,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  titleSpacing: {
    paddingHorizontal: 24,
    paddingVertical: 28,
  },
  titleText: {
    fontFamily: fonts.PrimaryJakartaExtraBold,
    fontSize: 28,
  },
  packageHeaderText: {
    fontFamily: fonts.PrimaryJakartaBold,
    fontSize: 14,
    color: Pallete.EbonyGray,
    paddingVertical: 4,
  },
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#fff',
  },
});

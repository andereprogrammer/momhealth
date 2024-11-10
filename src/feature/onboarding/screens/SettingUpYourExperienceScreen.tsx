import React, {useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {styled} from 'styled-components/native';
import {Onborading3Bg} from '../../../assets';
import IllustrationImageComponent from '../../../components/ImageComponents/IllustrationImageComponent/IllustrationImageComponent';
import theme from '../../../theme/Theme';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Settingup} from '../../../assets/animations';
import useDataProvider from '../../../context-store/useDataProvider';
import {setupMom, setupPregnant} from '../../../api/userCreationHelper';
import {Pallete} from '../../../theme/enum';
import * as Sentry from '@sentry/react-native';
import {
  setOnceIdentityAttribute,
  trackEvent,
} from '../../../helpers/product_analytics';
import {Identify} from '@amplitude/analytics-react-native';
import {logAppsFlyerEvent} from '../../../helpers/appsFlyer';

// import { Container } from './styles';

const SettingUpYourExperienceScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any, any>>();

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
    console.log(onboardingPath);
    if (onboardingPath.pregnant) {
      logAppsFlyerEvent('af_complete_registration', {
        af_registration_meth: 'phone',
      });
      setOnceIdentityAttribute('stage', 'pregnant');
      trackEvent('onboard', 'settingup', 'load');
      setTimeout(() => {
        navigation.navigate('HomeTabNavigator');
      }, 3000);
      // Sentry.captureMessage('ONBOARD_pregnant');
      // setupPregnant(lmp, edd, syptomFinalList)
      //   .then(res => {
      //     console.log('Response of pregnant api', res);
      //     Sentry.captureMessage('ONBOARD_pregnant_success');
      //     handleAddStageResponse(res);
      //     setTimeout(() => {
      //       navigation.navigate('HomeTabNavigator');
      //     }, 3000);
      //   })
      //   .catch(reason => {
      //     console.log(reason);
      //     Sentry.captureException(reason);
      //   });
    } else if (onboardingPath.newMom) {
      logAppsFlyerEvent('af_complete_registration', {
        af_registration_meth: 'phone',
      });
      setOnceIdentityAttribute('stage', 'newmom');
      trackEvent('onboard', 'settingup', 'load');

      Sentry.captureMessage('ONBOARD_newMom');
      setupMom(newMomDetails)
        .then(res => {
          console.log('Response of newMom api', res);
          Sentry.captureMessage('ONBOARD_newMom_success');
          handleAddStageResponse(res);
          setTimeout(() => {
            navigation.navigate('HomeTabNavigator');
          }, 3000);
        })
        .catch(reason => {
          console.log(reason);
          Sentry.captureException(reason);
        });
    } else {
      trackEvent('onboard', 'settingup', 'invalid');
      Sentry.captureMessage('ONBOARD_unknown');
    }
  }, []);
  const ChoosePathView = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: ${Pallete.Eggplant};
    gap: 20px;
  `;
  return (
    <>
      <ChoosePathView>
        <TouchableOpacity activeOpacity={1} style={styles.containerOpacity}>
          <IllustrationImageComponent
            animationSource={Settingup}
            source={Onborading3Bg}
            Viewstyle={[styles.viewStyleImage, styles.borderSelected]}
            Imagestyle={styles.imageStyle}
          />
        </TouchableOpacity>
        <Text style={styles.congratsText}>
          Setting up an experience unique to you...
        </Text>
      </ChoosePathView>
    </>
  );
};
const styles = StyleSheet.create({
  borderSelected: {
    // borderColor: theme.colors.cardPrimaryBackground,
    borderWidth: 1,
  },
  viewStyleImage: {
    width: 260,
    height: 340,
    // backgroundColor: '#fff',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  congratsText: {
    fontWeight: '700',
    fontSize: 24,
    flexWrap: 'wrap',
    padding: 20,
    textAlign: 'center',
    color: '#fff',
  },
  selectionText: {fontWeight: '500', fontSize: 18},
  imageStyle: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    overflow: 'hidden',
    transform: [{scaleX: 1.45}, {scaleY: 1.5}],
  },
  containerOpacity: {alignItems: 'center', gap: 10},
  headingText: {fontWeight: '800', fontSize: 18},
});
export default SettingUpYourExperienceScreen;

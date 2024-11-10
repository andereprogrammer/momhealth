import React, {useEffect, useLayoutEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import IllustrationImageComponent from '../../../components/ImageComponents/IllustrationImageComponent/IllustrationImageComponent';
import theme from '../../../theme/Theme';
import {styled} from 'styled-components/native';
import {Onborading3Bg} from '../../../assets';
import SuccessScreenComponent from '../../../components/MainContainer/SuccessScreenComponent';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {NewMom, Pregnant} from '../../../assets/animations';
import useDataProvider from "../../../context-store/useDataProvider";

// import { Container } from './styles';

const CongratulationsPregnantScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any, any>>();
  const {onboardingPath} = useDataProvider();
  console.log('CongratulationsPregnantScreen params', onboardingPath);
  let screenNavigation = '';
  let shortText = '';
  let successText = '';
  let animation = '';
  if (onboardingPath.pregnant) {
    screenNavigation = 'MenstrualSelectionScreen';
    shortText = 'I am pregnant';
    successText = 'Congratulations on your pregnancy';
    animation = Pregnant;
  } else if (onboardingPath.newMom) {
    screenNavigation = 'NewMomOnboardingScreen';
    shortText = 'I am a new mom';
    successText = 'Welcome to motherhood!';
    animation = NewMom;
  }
  useFocusEffect(() => {
    setTimeout(() => {
      navigation.navigate(screenNavigation);
    }, 3000);
  });

  const ChoosePathView = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: ${theme.colors.choosePathBg};
    gap: 20px;
  `;
  return (
    <>
      <SuccessScreenComponent
        style={{}}
        bg={'#fff'}
        imageVar={Onborading3Bg}
        shortText={shortText}
        showExtraText={true}
        successText={successText}
        animationSource={animation}
      />
    </>
  );
};
const styles = StyleSheet.create({
  borderSelected: {
    borderColor: theme.colors.cardPrimaryBackground,
    borderWidth: 2,
  },
  viewStyleImage: {
    width: 180,
    height: 240,
    backgroundColor: theme.colors.mainBackground,
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
  },
  selectionText: {fontWeight: '500', fontSize: 18},
  imageStyle: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    position: 'absolute',
    bottom: 0,
    overflow: 'hidden',
  },
  containerOpacity: {alignItems: 'center', gap: 10},
  headingText: {fontWeight: '800', fontSize: 18},
});
export default CongratulationsPregnantScreen;

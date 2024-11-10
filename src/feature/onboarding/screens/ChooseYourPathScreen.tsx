import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {styled} from 'styled-components/native';
import IllustrationImageComponent from '../../../components/ImageComponents/IllustrationImageComponent/IllustrationImageComponent';
import {Onborading1Bg, Onborading3Bg} from '../../../assets';
import theme from '../../../theme/Theme';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import ProgressBarComponent from '../../../components/MainContainer/ProgressBarComponent';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import {NewMom, Pregnant} from '../../../assets/animations';
import BackHeader from '../../../components/MainContainer/BackHeader';
import useDataProvider from '../../../context-store/useDataProvider';
import {trigger} from 'react-native-haptic-feedback';
import {options} from '../../dashboard/navigation/BottomTabNavigation/HomeTabNavigator';

const {height} = Dimensions.get('window');
const ChooseYourPathScreen: React.FC = () => {
  const [select, setSelected] = useState({
    pregnant: false,
    newMom: false,
  });
  const {setOnboardingPath} = useDataProvider();
  const navigation = useNavigation<NavigationProp<any, any>>();
  const chooseMom = () => {
    trigger('impactLight', options);
    setOnboardingPath({...select, pregnant: true, newMom: false});
    navigation.navigate('CongratulationsPregnantScreen');
  };
  const choosePreg = () => {
    trigger('impactLight', options);
    setOnboardingPath({...select, pregnant: false, newMom: true});
    navigation.navigate('CongratulationsPregnantScreen');
  };
  const ChoosePathView = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    gap: 20px;
  `;
  return (
    <SafeAreaView style={[theme.textVariants.defaults, styles.safeAreaPad]}>
      <BackHeader title="" />
      <View style={styles.mainView}>
        <ProgressBarComponent tile1="100%" tile2="0%" tile3="0%" />
        <Text style={styles.headingText}>
          At which stage of motherhood are you?
        </Text>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.containerOpacity}
          onPress={() => chooseMom()}>
          <IllustrationImageComponent
            animationSource={Pregnant}
            source={Onborading3Bg}
            Viewstyle={[
              styles.viewStyleImage,
              select.pregnant && styles.borderSelected,
            ]}
            Imagestyle={styles.imageStyle}
          />
          <Text style={styles.selectionText}>I am pregnant</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.containerOpacity}
          onPress={() => choosePreg()}>
          <IllustrationImageComponent
            animationSource={NewMom}
            source={Onborading1Bg}
            Viewstyle={[
              styles.viewStyleImage,
              select.newMom && styles.borderSelected,
            ]}
            Imagestyle={styles.imageStyle}
          />
          <Text style={styles.selectionText}>I am a new mom</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeAreaPad: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
  },
  mainView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff',
    gap: 20,
  },
  borderSelected: {
    borderColor: theme.colors.cardPrimaryBackground,
    borderWidth: 2,
  },
  viewStyleImage: {
    width: height / 5,
    height: height / 3.2,
    backgroundColor: '#FFF',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    margin: 0,
  },
  selectionText: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  imageStyle: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    position: 'absolute',
    left: 3,
    right: 0,
    top: 38,
    overflow: 'hidden',
    transform: [{scaleX: 1.6}, {scaleY: 1.7}],
  },
  containerOpacity: {alignItems: 'center', gap: 10},
  headingText: {fontWeight: '800', fontSize: 18},
});

export default ChooseYourPathScreen;

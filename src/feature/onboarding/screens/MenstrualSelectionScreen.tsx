import React, {useContext, useEffect, useState} from 'react';
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {styled} from 'styled-components/native';
import {BackBtn, Onborading3Bg} from '../../../assets';
import IllustrationImageComponent from '../../../components/ImageComponents/IllustrationImageComponent/IllustrationImageComponent';
import theme from '../../../theme/Theme';
import SecondaryHeadingComponent from '../../../components/FontComponents/SecondaryHeadingComponent/SecondaryHeadingComponent';
import MainCtaComponent from '../../../components/ButtonComponents/MainCtaComponent/MainCtaComponent';
import BirthDatePicker from '../../../components/BirthdatePickerComponent/BirthDatePicker';
import useDataProvider, {
  DataProvider,
  DataProviderContext,
} from '../../../context-store/useDataProvider';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  horizontalScale,
  moderateScale,
  SCREEN_HEIGHT_WINDOW,
  verticalScale,
} from '../../../helpers/layoutHelper';
import ProgressBarComponent from '../../../components/MainContainer/ProgressBarComponent';
import {Pregnant} from '../../../assets/animations';
import {fonts, Pallete} from '../../../theme/enum';
import DatePicker from '../../reports/components/DatePicker';
import BackHeader from '../../../components/MainContainer/BackHeader';
import {registerPatient} from '../../../api/userCreationHelper';
import {trigger} from 'react-native-haptic-feedback';
import {options} from '../../dashboard/navigation/BottomTabNavigation/HomeTabNavigator';
import {STAGES} from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageWithView from '../../../components/ImageWithView';
import allStyles from '../../../styles/GlobalStyles';

// import { Container } from './styles';

const MenstrualSelectionScreen: React.FC = () => {
  const {mobile, setLMP, setEDD, setOnboardingPath} = useDataProvider();
  const [date, setDate] = useState('');
  const [canContinue, setCanContinue] = useState(false);
  const [showHeader, setShowHeader] = useState<boolean>(false);

  const navigation = useNavigation<NavigationProp<any, any>>();
  const configureLmp = () => {
    setShowHeader(true);
    setSelected({...selected, LMP: true, EDD: false});
  };
  const configureEdd = () => {
    setShowHeader(true);
    setSelected({...selected, EDD: true, LMP: false});
  };
  const [selected, setSelected] = useState({
    LMP: false,
    EDD: false,
  });
  const [select, setSelectedPath] = useState({
    pregnant: false,
    newMom: false,
  });
  const getDate = (dateValue: string) => {
    setDate(dateValue);
  };
  const chooseMom = () => {
    trigger('impactLight', options);
    setOnboardingPath({...select, pregnant: false, newMom: true});
    navigation.navigate('NewMomOnboardingScreen');
  };
  const choosePreg = () => {
    trigger('impactLight', options);
    setOnboardingPath({...select, pregnant: true, newMom: false});
  };
  const lmpOrEddSet = () => {
    if (selected.LMP) {
      setLMP(date);
    } else if (selected.EDD) {
      setEDD(date);
    }
    choosePreg();
    registerPatient('', {firstName: '', email: '', city: ''}, '').then(() => {
      navigation.navigate('GoalSelectionScreen');
    });
  };
  const goBack = () => {
    setShowHeader(false);
    setSelected({...selected, EDD: false, LMP: false});
  };

  useEffect(() => {
    let eddOrLmp = selected.LMP || selected.EDD;
    let datePresent = date !== '';
    setCanContinue(eddOrLmp && datePresent);
    const stageOnboarding = STAGES.CREATE;
    AsyncStorage.setItem('stage', stageOnboarding);
  }, [selected, date]);

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#fff',
        flex: 1,
        paddingHorizontal: horizontalScale(16),
      }}>
      {showHeader && (
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: verticalScale(6),
            paddingHorizontal: horizontalScale(5),
            justifyContent: 'space-between',
            height: Platform.OS === 'ios' ? 38 : 42,
            marginTop:
              Platform.OS === 'ios'
                ? false
                  ? verticalScale(40)
                  : 3
                : verticalScale(30),
          }}>
          <TouchableOpacity onPress={goBack}>
            <ImageWithView
              imageSource={BackBtn}
              width={25}
              height={25}
              isLocalImage
              customStyle={[allStyles.ml3]}
              tintColor="#000"
            />
          </TouchableOpacity>
        </View>
      )}
      <ProgressBarComponent tile1="100%" tile2="100%" tile3="0%" />
      <View style={styles.mainView}>
        <View style={styles.containerOpacity}>
          <IllustrationImageComponent
            animationSource={Pregnant}
            source={Onborading3Bg}
            Viewstyle={[styles.viewStyleImage, styles.borderSelected]}
            Imagestyle={styles.imageStyle}
          />
        </View>
        <View style={styles.containerOpacity}>
          {!selected.LMP && !selected.EDD && (
            <Text style={styles.headingText}>
              Congratulations on your pregnancy! Help us with the following
              details and make this app uniquley yours.
            </Text>
          )}
          {selected.LMP && (
            <>
              <Text
                style={{fontSize: 18, fontFamily: fonts.PrimaryJakartaBold}}>
                First day of
              </Text>
              <Text style={styles.headingText}>
                Last Menstrual Period (LMP)?
              </Text>
            </>
          )}
          {selected.EDD && (
            <>
              <Text
                style={{fontSize: 18, fontFamily: fonts.PrimaryJakartaBold}}>
                Estimated delivery date? (EDD)
              </Text>
              <Text style={styles.shortText}>
                based on first ultrasound scan
              </Text>
            </>
          )}
        </View>
        {/* {!selected.LMP && !selected.EDD && (
          <Text
            style={{
              fontSize: 18,
              color: '#000',
              alignSelf: 'flex-start',
              fontFamily: fonts.PrimaryJakartaBold,
              paddingHorizontal: 5,
            }}>
            {' '}
            I remember my
          </Text>
        )} */}
        {!selected.LMP && !selected.EDD && (
          <TouchableOpacity
            activeOpacity={1}
            style={styles.selectionContainer}
            onPress={() => configureLmp()}>
            <View
              style={[styles.viewStyle, selected.LMP && styles.cardSelected]}>
              <Text style={styles.shortText}>First day of</Text>
              <Text style={styles.mainText}> Last Menstrual Period (LMP)</Text>
            </View>
          </TouchableOpacity>
        )}

        {!selected.LMP && !selected.EDD && (
          <Text
            style={{
              fontSize: 20,
              fontFamily: fonts.PrimaryJakartaBold,
            }}>
            OR
          </Text>
        )}

        {!selected.LMP && !selected.EDD && (
          <TouchableOpacity
            activeOpacity={1}
            style={styles.selectionContainer}
            onPress={configureEdd}>
            <View
              style={[styles.viewStyle, selected.EDD && styles.cardSelected]}>
              <Text style={styles.mainText}>Estimated Delivery Date (EDD)</Text>
              <Text style={styles.shortText}>
                based on first ultrasound scan
              </Text>
            </View>
          </TouchableOpacity>
        )}
        {(selected.LMP || selected.EDD) && (
          <View style={{width: '100%'}}>
            <DatePicker
              updateDate={getDate}
              label={selected.LMP ? 'Your LMP Date' : 'Your EDD Date'}
              style={{backgroundColor: theme.colors.inputBg, marginBottom: 20}}
              LMP={selected.LMP}
              EDD={selected.EDD}
            />
          </View>
        )}
      </View>

      <View style={{width: '100%', alignItems: 'center'}}>
        <View style={{width: '90%'}}>
          <MainCtaComponent
            onClick={() => lmpOrEddSet()}
            style={styles.cta}
            active={canContinue}>
            <Text>Continue</Text>
          </MainCtaComponent>
        </View>
      </View>
      <TouchableOpacity onPress={chooseMom}>
        <Text style={styles.momText}>I am a new mom</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
    backgroundColor: '#fff',
    paddingHorizontal: horizontalScale(10),
  },
  cta: {
    bottom: 0,
    left: 0,
    right: 0,
    marginBottom: 10,
  },
  selectionContainer: {
    width: '100%',
  },
  cardSelected: {
    backgroundColor: theme.colors.cardSelected,
    width: '95%',
    borderColor: theme.colors.cardBorderSelected,
    borderWidth: 1,
    elevation: 3,
    shadowColor: 'rgba(71, 31, 185, 0.08)',
  },

  secondaryHeadingOrientation: {
    textAlign: 'center',
    padding: 8,
    color: '#000',
  },
  cardOrientation: {
    flexDirection: 'row',
  },
  borderSelected: {
    borderColor: theme.colors.cardPrimaryBackground,
    // borderWidth: 2,
  },
  viewStyleImage: {
    width: SCREEN_HEIGHT_WINDOW / 5,
    height: SCREEN_HEIGHT_WINDOW / 3.2,
    // backgroundColor: theme.colors.mainBackground,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewStyle: {
    width: '90%',
    borderColor: '#E9E7EA',
    borderWidth: 1,
    borderRadius: 18,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  congratsText: {
    fontWeight: '700',
    fontSize: moderateScale(24),
    flexWrap: 'wrap',
    padding: 10,
    textAlign: 'center',
    color: '#000',
  },
  selectionText: {
    fontWeight: '500',
    fontSize: moderateScale(18),
    color: '#000',
  },
  momText: {
    fontWeight: '500',
    fontSize: moderateScale(16),
    color: Pallete.PinkHopbrush,
    alignSelf: 'center',
    textDecorationColor: Pallete.PinkHopbrush,
    textDecorationLine: 'underline',
    paddingVertical: 5,
    marginVertical: 2,
  },
  imageStyle: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    position: 'absolute',
    top: 35,
    left: 0,
    right: 0,
    overflow: 'hidden',
    transform: [{scaleX: 1.75}, {scaleY: 1.8}],
  },
  shortText: {
    fontWeight: '400',
    fontSize: moderateScale(14),
    color: '#000',
  },
  mainText: {
    fontWeight: '800',
    fontSize: moderateScale(14),
    fontFamily: fonts.SecondaryDMSansBold,
    color: '#000',
  },
  containerOpacity: {alignItems: 'center', gap: 10, textAlign: 'center'},
  headingText: {
    fontFamily: fonts.PrimaryJakartaBold,
    fontSize: moderateScale(18),
    color: '#000',
  },
});
export default MenstrualSelectionScreen;

import React, {useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {styled} from 'styled-components/native';
import {Onborading3Bg} from '../../../assets';
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
import {horizontalScale} from '../../../helpers/layoutHelper';
import ProgressBarComponent from '../../../components/MainContainer/ProgressBarComponent';
import {NewMom, Pregnant} from '../../../assets/animations';
import {fonts} from '../../../theme/enum';
import DatePicker from '../../reports/components/DatePicker';
import BackHeader from '../../../components/MainContainer/BackHeader';

// import { Container } from './styles';

const NewMomOnboardingScreen: React.FC = () => {
  const {mobile, newMomDetails, setNewMomDetails} = useDataProvider();
  const [date, setDate] = useState('');
  const getDate = (dateValue: string) => {
    setDate(dateValue);
  };
  const navigation = useNavigation<NavigationProp<any, any>>();
  const {width} = useWindowDimensions();
  const setNewMom = () => {
    setNewMomDetails({...newMomDetails, newMomDate: date});
    navigation.navigate('NewMomDeliveryDetailsScreen');
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#fff',
        flex: 1,
        paddingHorizontal: horizontalScale(16),
      }}>
      <BackHeader title="" />
      <ProgressBarComponent tile1="100%" tile2="100%" tile3="0%" />
      <View style={styles.mainView}>
        <View style={styles.containerOpacity}>
          <IllustrationImageComponent
            animationSource={NewMom}
            source={Onborading3Bg}
            Viewstyle={[styles.viewStyleImage, styles.borderSelected]}
            Imagestyle={styles.imageStyle}
          />
          {/* <Text style={styles.selectionText}>I am Pregnant</Text> */}
        </View>
        <View style={styles.containerOpacity}>
          <Text style={styles.headingText}>When did you become a new mom?</Text>
          {/*<Text*/}
          {/*  style={{*/}
          {/*    fontSize: 20,*/}
          {/*    fontFamily: fonts.PrimaryJakartaBold,*/}
          {/*  }}>*/}
          {/*  OR*/}
          {/*</Text>*/}

          {/*<SecondaryHeadingComponent style={styles.secondaryHeadingOrientation}>*/}
          {/*  This will help us calculate Gestational Age and Estimated Delivery*/}
          {/*  Date*/}
          {/*</SecondaryHeadingComponent>*/}
        </View>

        <View style={{width: '100%'}}>
          <DatePicker
            label={"Your child's birth date?"}
            updateDate={getDate}
            style={{
              date: {backgroundColor: theme.colors.inputBg},
              dataContainer: {marginBottom: 20},
            }}
          />
        </View>
      </View>
      <View style={{width: '100%', alignItems: 'center'}}>
        <View style={{width: '90%'}}>
          <MainCtaComponent
            onClick={() => setNewMom()}
            style={styles.cta}
            active={true}>
            <Text>Continue</Text>
          </MainCtaComponent>
        </View>
      </View>
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
    padding: 12,
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
    width: 180,
    height: 240,
    backgroundColor: theme.colors.mainBackground,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewStyle: {
    width: '90%',
    borderColor: '#E9E7EA',
    borderWidth: 1,
    borderRadius: 18,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  congratsText: {
    fontWeight: '700',
    fontSize: 24,
    flexWrap: 'wrap',
    padding: 20,
    textAlign: 'center',
    color: '#000',
  },
  selectionText: {fontWeight: '500', fontSize: 18, color: '#000'},
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
    fontSize: 14,
    color: '#000',
  },
  mainText: {
    fontWeight: '800',
    fontSize: 14,
    fontFamily: fonts.SecondaryDMSansBold,
    color: '#000',
  },
  containerOpacity: {alignItems: 'center', gap: 10, textAlign: 'center'},
  headingText: {
    fontFamily: fonts.PrimaryJakartaBold,
    fontSize: 18,
    color: '#000',
  },
});
export default NewMomOnboardingScreen;

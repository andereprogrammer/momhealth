import {
  BackHandler,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import MainCtaComponent from '../../../components/ButtonComponents/MainCtaComponent/MainCtaComponent';
import {offerings} from '../constants/offerings';
import {MotiView} from 'moti';
import OfferingListItem from '../components/OfferingListItem';
import {listingStyles} from './PackageOfferListingScreen';
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {STAGES} from '../constants';
import {fonts} from '../../../theme/enum';

type Props = {};

const PackageOfferingScreen = (props: Props) => {
  const navigation = useNavigation<NavigationProp<any, any>>();
  const route = useRoute();

  useEffect(() => {
    const onBackPress = () => {
      return route.name === 'PackageOfferingScreen';
    };
    const stageOnboarding = STAGES.FREEMIUM;
    AsyncStorage.setItem('stage', stageOnboarding);
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  }, []);

  return (
    <SafeAreaView style={listingStyles.container}>
      <View style={listingStyles.titleSpacing}>
        <Text style={styles.titleText}>
          Sign up for our “love that bump” program for a delightful pregnancy!
        </Text>
      </View>
      <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
        {offerings.slice(4).map((item, index) => {
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
              <OfferingListItem key={item.offering} item={item} />
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
        delay={offerings.slice(4).length * 500}>
        <View style={listingStyles.ctaStyle}>
          <MainCtaComponent
            onClick={() => navigation.navigate('SettingUpYourExperienceScreen')}
            active
            style={{}}>
            Continue
          </MainCtaComponent>
        </View>
      </MotiView>
    </SafeAreaView>
  );
};

export default PackageOfferingScreen;

const styles = StyleSheet.create({
  titleText: {
    fontFamily: fonts.PrimaryJakartaExtraBold,
    fontSize: 24,
  },
});

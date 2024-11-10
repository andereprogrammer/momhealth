import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {BannerPic, ParticleBg} from '../../../assets';
import {fonts} from '../../../theme/enum';
import {track} from '@amplitude/analytics-react-native';
import {trackEvent} from '../../../helpers/product_analytics';
import {trigger} from 'react-native-haptic-feedback';
import {options} from '../../dashboard/navigation/BottomTabNavigation/HomeTabNavigator';

type PremiumBannerProps = {
  navigation: any;
};

const PremiumPackageBanner = ({navigation}: PremiumBannerProps) => {
  function navigate() {
    trigger('impactLight', options);
    trackEvent('freemiumhome', 'package', 'clicked');
    return navigation.navigate('FreemiumPackageNavigation');
  }

  return (
    <TouchableWithoutFeedback style={styles.container} onPress={navigate}>
      <LinearGradient
        colors={['#FFE2F9', '#FFC2F1', '#FEA2E9', '#FFA2EF']}
        style={styles.container}
        useAngle={true}
        angle={120}
        angleCenter={{x: 0.1, y: 0.1}}
        locations={[0.3, 0.6, 0.9, 1]}>
        <ImageBackground
          resizeMethod="resize"
          resizeMode="contain"
          source={ParticleBg}
          style={styles.imageAspect}>
          <View style={styles.cardView}>
            <View style={styles.textContainer}>
              <View style={styles.textView}>
                <View>
                  <Text style={styles.txtUnlock}>
                    Unlock a world of amazing benefits with our 
                  </Text>
                  <View style={styles.secondRow}>
                    <Text style={styles.premiumTxt}>comprehensive plan</Text>
                    {/* <Text style={styles.todayTxt}>today!</Text> */}
                  </View>
                </View>

                <View style={styles.btnContainer}>
                  <LinearGradient
                    style={[styles.imageAspect]}
                    colors={['#8832A3', '#641C97']}>
                    <TouchableOpacity
                      onPress={() => navigate()}
                      style={styles.btnView}>
                      <Text style={styles.enrollText}>Upgrade now</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </View>
            </View>
            <View style={styles.ladyView}>
              <Image
                resizeMethod="resize"
                resizeMode="cover"
                source={BannerPic}
                style={[styles.imageAspect]}
              />
            </View>
          </View>
        </ImageBackground>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

export default PremiumPackageBanner;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
  },
  gradientContainer: {
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
    height: '100%',
  },
  imageAspect: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  ladyView: {
    width: '30%',
    height: '100%',
    marginRight: 20,
    overflow: 'hidden',
  },
  enrollText: {
    color: '#fff',
    fontFamily: fonts.PrimaryJakartaExtraBold,
    fontSize: 14,
  },
  btnView: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnContainer: {
    width: 140,
    alignSelf: 'flex-start',
    height: 30,
    borderRadius: 35,
    overflow: 'hidden',
  },
  todayTxt: {
    fontSize: 16,
    fontFamily: fonts.PrimaryJakartaBold,
    color: '#7336B0',
  },
  premiumTxt: {
    fontSize: 21,
    fontFamily: fonts.PrimaryJakartaExtraBold,
    color: '#A4019D',
  },
  secondRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  txtUnlock: {
    fontSize: 18,
    fontFamily: fonts.PrimaryJakartaBold,
    color: '#7336B0',
  },
  textView: {
    justifyContent: 'space-between',
    height: '100%',
  },
  textContainer: {
    width: '70%',
    paddingHorizontal: 10,
    paddingVertical: 25,
  },
  cardView: {
    width: '100%',
    flexDirection: 'row',
  },
});

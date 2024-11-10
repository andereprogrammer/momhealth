import {Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {SCREEN_WIDTH_WINDOW} from '../../../helpers/layoutHelper';
import {fonts, Pallete} from '../../../theme/enum';
import LottieView from 'lottie-react-native';
import {MotiView} from 'moti';

type Props = {
  selectedPackage: any;
};

const OfferCard = ({selectedPackage}: Props) => {
  return (
    <MotiView>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        useAngle
        angle={65}
        colors={['#fcb045', '#c721cd', '#9f0dfb']}
        style={styles.viewStyle}>
        <Text style={styles.monthsText}>Upto</Text>
        <Text style={styles.offerText}>{selectedPackage.discount}% OFF</Text>

        <LottieView
          autoPlay
          loop
          style={{
            position: 'absolute',
            top: 0,
            flex: 1,
            zIndex: 30,
            width: '100%',
            height: '100%',
            transform: [{scale: 2.4}],
          }}
          source={require('../../../assets/animations/confetti 2.json')}
        />
      </LinearGradient>
    </MotiView>
  );
};

export default OfferCard;

const styles = StyleSheet.create({
  viewStyle: {
    width: SCREEN_WIDTH_WINDOW / 1.6,
    height:
      Platform.OS === 'ios'
        ? SCREEN_WIDTH_WINDOW / 2.4
        : SCREEN_WIDTH_WINDOW / 2.7,
    alignSelf: 'center',
    borderRadius: 15,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  offerText: {
    color: Pallete.plainWhite,
    fontSize: 28,
    fontFamily: fonts.PrimaryJakartaExtraBold,
  },
  monthsText: {
    color: Pallete.plainWhite,
    fontSize: 20,
    fontFamily: fonts.SecondaryDMSansBold,
  },
});

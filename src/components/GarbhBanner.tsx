import {
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';

import LinearGradient from 'react-native-linear-gradient';
import {
  GarbhBannerPic,
  GarbhBannerPicFiller,
  Gayatribg,
  HomeGarbhIcon1,
  HomeGarbhIcon2,
  HomeGarbhIcon3,
  HomeGarbhIcon4,
  HomeGarbhIcon5,
} from '../assets';
import {trackEvent} from '../helpers/product_analytics';
import {fonts, Pallete} from '../theme/enum';
import {horizontalScale, verticalScale} from '../helpers/layoutHelper';

type Props = {
  navigation: any;
};
const {width: SCREEN_WIDTH} = Dimensions.get('window');

const GarbhBanner = (props: Props) => {
  let iconsWithPosition = [
    {
      icon: HomeGarbhIcon1,
      style: {
        width: 32,
        height: 32,
        position: 'absolute',
        top: 5,
        right: 80,
      },
    },
    {
      icon: HomeGarbhIcon2,
      style: {
        width: 32,
        height: 32,
        position: 'absolute',
        top: 40,
        right: 115,
      },
    },
    {
      icon: HomeGarbhIcon3,

      style: {
        width: 45,
        height: 45,
        position: 'absolute',
        bottom: 80,
        right: 125,
      },
    },
    {
      icon: HomeGarbhIcon4,

      style: {
        width: 30,
        height: 30,
        position: 'absolute',
        bottom: 40,
        right: 123,
      },
    },
    {
      icon: HomeGarbhIcon5,

      style: {
        width: 30,
        height: 30,
        position: 'absolute',
        bottom: 5,
        right: 90,
      },
    },
  ];

  function navigate() {
    trackEvent('freemiumhome', 'garbh', 'clicked');
    return props.navigation.navigate('GarbhSanskarFlowNavigation');
  }

  return (
    <TouchableWithoutFeedback
      style={styles.touchContainer}
      onPress={() => navigate()}>
      <View
        style={{
          width: '90%',
          height: 200,
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderRadius: 20,
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <ImageBackground
          style={styles.container}
          imageStyle={styles.containerImage}
          resizeMethod="resize"
          resizeMode="cover"
          source={Gayatribg}
          blurRadius={90}>
          <View style={styles.textContainer}>
            <View>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: fonts.PrimaryJakartaExtraBold,
                  fontSize: 18,
                }}>
                Discover the ancient wisdom of
              </Text>
              <Text
                style={{
                  color: '#FFAE28',
                  fontFamily: fonts.PrimaryJakartaBold,
                  fontSize: 20,
                }}>
                Garbhsanskar
              </Text>
            </View>
            <View
              style={{
                height: 30,
                borderRadius: 20,
                backgroundColor: '#fff',
                width: '62%',
              }}>
              <TouchableOpacity
                onPress={() => navigate()}
                style={{
                  width: '100%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: Pallete.Eggplant,
                    fontFamily: fonts.PrimaryJakartaBold,
                    padding: 2,
                    fontSize: 13,
                  }}>
                  Take me there
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <LinearGradient
            colors={['#DFA24C', '#F0CF8B']}
            style={{
              width: '92%',
              height: '100%',
              minWidth:
                Platform.OS === 'android'
                  ? SCREEN_WIDTH - horizontalScale(150)
                  : null,
              borderWidth: 1,
              borderColor: '#fff',
              borderRadius: 100,
              position: 'absolute',
              right: Platform.OS === 'ios' ? -185 : verticalScale(-160),
              opacity: 1,
              zIndex: 40,
            }}>
            <Image
              resizeMethod="resize"
              resizeMode="cover"
              style={{
                aspectRatio: 1,
                width: '100%',
                height: '100%',
                maxWidth:
                  Platform.OS === 'android'
                    ? SCREEN_WIDTH + horizontalScale(10)
                    : null,
                transform:
                  Platform.OS === 'ios'
                    ? [{scale: verticalScale(1.5)}]
                    : [{scale: verticalScale(1)}],
                zIndex: 50,
              }}
              source={GarbhBannerPicFiller}
            />
          </LinearGradient>

          <View
            style={{
              width: '40%',
              height: '100%',
              position: 'absolute',
              zIndex: 100,
              right: -horizontalScale(40),
              flex: 2,
              opacity: 1,
            }}>
            <Image
              resizeMethod="resize"
              resizeMode="cover"
              source={GarbhBannerPic}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default GarbhBanner;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 20,
    alignItems: 'center',
    overflow: 'hidden',
  },
  touchContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 20,
    alignItems: 'center',
    alignSelf: 'center',
  },
  containerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
    opacity: 0.9,
  },
  textContainer: {
    width: '70%',
    height: '100%',
    paddingHorizontal: 20,
    paddingVertical: 30,
    justifyContent: 'space-between',
  },
});

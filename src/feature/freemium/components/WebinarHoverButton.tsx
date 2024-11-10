import {
  Dimensions,
  Image,
  PixelRatio,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {BannerPic, PackageBanner, Placeholder} from '../../../assets';
import {Pallete, fonts} from '../../../theme/enum';
import {verticalScale} from '../../../helpers/layoutHelper';
import {track} from '@amplitude/analytics-react-native';
import {trackEvent} from '../../../helpers/product_analytics';
import {trigger} from 'react-native-haptic-feedback';
import {options} from '../../dashboard/navigation/BottomTabNavigation/HomeTabNavigator';
import DeviceInfo from 'react-native-device-info';

type Props = {
  navigation: any;
};

const {height} = Dimensions.get('window');

const WebinarHoverButton = (props: Props) => {
  function navigate() {
    trigger('impactLight', options);
    trackEvent('freemiumhome', 'webinar', 'clicked');
    return props.navigation.navigate('WebinarHomeScreen');
  }
  const deviceName = DeviceInfo.getDeviceNameSync();
  console.log(height - verticalScale(505), height, deviceName);

  return (
    <View
      style={{
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        borderRadius: 20,
        flex: 0.3,
        aspectRatio: 1,
        bottom: -height / 6.95,
      }}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        useAngle={true}
        angle={0}
        colors={['#FF6FE6', '#FFABEC', '#FF8CE5']}
        style={{
          width: '100%',
          height: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderRadius: 15,
          alignItems: 'flex-start',
          paddingVertical: 20,
          paddingBottom:
            height > 820
              ? Platform.OS === 'android'
                ? height - verticalScale(490)
                : height - verticalScale(505)
              : height - verticalScale(510),
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 10,
              flex: 0.5,
            }}>
            <View
              style={{
                width: '100%',
              }}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 16,
                  fontFamily: fonts.PrimaryJakartaBold,
                }}>
                Blissful pregnancy webinar
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => navigate()}
            style={{
              backgroundColor: '#fff',
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              flex: 0.35,
              paddingVertical: 8,
            }}>
            <Text
              style={{
                color: Pallete.Eggplant,
                fontFamily: fonts.PrimaryJakartaBold,
              }}>
              Learn more
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

export default WebinarHoverButton;

const styles = StyleSheet.create({});

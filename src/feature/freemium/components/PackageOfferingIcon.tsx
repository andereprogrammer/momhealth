import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Placeholder} from '../../../assets';
import {fonts} from '../../../theme/enum';
import {track} from '@amplitude/analytics-react-native';
import {trackEvent} from '../../../helpers/product_analytics';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';

type Props = {
  source: ImageSourcePropType;
  name: string;
  navigation: any;
};

const PackageOfferingIcon = (props: Props) => {
  const takeMeThere = () => {
    trackEvent('freemiumhome', `offering-${props.name}`, 'clicked');
    switch (props.name) {
      case 'Yoga':
        props.navigation.navigate('FreemiumSessionNavigationScreen');
        break;

      default:
        props.navigation.navigate('FreemiumPackageNavigation');
        break;
    }
  };
  return (
    <View
      style={{
        height: verticalScale(120),
        alignItems: 'center',
        justifyContent: 'space-between',
        width: horizontalScale(116),
        padding: 0,
        margin: 0,
      }}>
      <TouchableOpacity onPress={takeMeThere} style={styles.container}>
        <Image
          source={props.source}
          resizeMethod="resize"
          resizeMode="cover"
          // imageStyle={{
          //   height: '100%',
          //   width: '100%',
          // }}
          style={{
            width: '100%',
            height: props.name === 'Yoga' ? '96%' : '100%',
            opacity: props.name === 'Yoga' ? 1 : 0.85,
            marginLeft: 10,
          }}
        />
      </TouchableOpacity>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'flex-end',
          flex: 0.2,
        }}>
        <Text
          numberOfLines={2}
          style={{
            fontSize: 13,
            fontFamily: fonts.PrimaryJakartaBold,
            maxWidth: 110,
            textAlign: 'center',
          }}>
          {props.name}
        </Text>
        {props.name === 'Yoga' && (
          <Text
            style={{
              color: '#6F2BC4',
              fontSize: 13,
              fontFamily: fonts.PrimaryJakartaExtraBold,
            }}>
            1 free session
          </Text>
        )}
        {props.name === 'Birth' && (
          <Text
            style={{
              fontSize: 13,
              fontFamily: fonts.PrimaryJakartaBold,
            }}>
            prep class
          </Text>
        )}

        {props.name === 'Weekly' && (
          <Text
            style={{
              fontSize: 13,
              fontFamily: fonts.PrimaryJakartaBold,
            }}>
            diet plan
          </Text>
        )}
        {props.name === '1 on 1' && (
          <Text
            style={{
              fontSize: 13,
              fontFamily: fonts.PrimaryJakartaBold,
            }}>
            consultation
          </Text>
        )}
        {props.name === 'Pain' && (
          <Text
            style={{
              fontSize: 13,
              fontFamily: fonts.PrimaryJakartaBold,
            }}>
            relief
          </Text>
        )}
        {props.name === 'Diagnostic' && (
          <Text
            style={{
              fontSize: 13,
              fontFamily: fonts.PrimaryJakartaBold,
            }}>
            support
          </Text>
        )}
      </View>
    </View>
  );
};

export default PackageOfferingIcon;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.8,
    aspectRatio: 1,
    backgroundColor: 'transparent',
    // shadowColor: '#c3c3c3',
    // shadowOffset: {
    //   width: 5,
    //   height: 3,
    // },
    // shadowOpacity: 1,
    // shadowRadius: 5,
    elevation: 10,
  },
});

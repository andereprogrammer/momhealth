import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ImageResolvedAssetSource,
  ImageSourcePropType,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import s from '../../styles/GlobalStyles';
import {PhoneFrame, PremiumBadgeAnimation} from '../../assets';
import getDefaultShadow from '../../styles/ShadowPresets';
import LottieView from 'lottie-react-native';
import {rotate} from '@shopify/react-native-skia';

type ScreenImageProp = {
  source: ImageSourcePropType;
  percentWidth: number; // Accepts [0 - 100] value;
  aspectRatio?: 'square' | 'original';
  phoneFrameVisible?: boolean;
  bottomFadeVisible?: boolean;
  bgColorHexCode?: `#${string}`;
};

// LIMITATION: Width of the Parent element should be of the width of the screen.
const ScreenshotImage = ({
  source,
  percentWidth = 80,
  aspectRatio = 'square',
  phoneFrameVisible = true,
  bottomFadeVisible = true,
  bgColorHexCode = '#ffffff',
}: ScreenImageProp) => {
  const [dimensions, setDimensions] = useState({width: 1, height: 0});
  const windowDimensions = Dimensions.get('window');
  const calculatedWidth = (windowDimensions.width * percentWidth) / 100;
  const calculatedHeight =
    (dimensions.height / dimensions.width) * calculatedWidth * 0.91;
  const calculatedBorderRadius = calculatedWidth * 0.1;

  const [frameDimensions, setFrameDimensions] = useState({width: 1, height: 0});
  const calculatedFrameWidth = (windowDimensions.width * percentWidth) / 100;
  const calculatedFrameHeight =
    (frameDimensions.height / frameDimensions.width) * calculatedFrameWidth;

  useEffect(() => {
    const fetchImageDimensions = async (
      src: ImageSourcePropType = source,
      isPhoneFrame: boolean = false,
    ) => {
      try {
        const {width, height} = await getImageDimensions(src);
        if (isPhoneFrame) {
          setFrameDimensions({width, height});
        } else {
          setDimensions({width, height});
        }
      } catch (error) {
        console.error('Error fetching image dimensions:', error);
      }
    };

    fetchImageDimensions().then(_r => fetchImageDimensions(PhoneFrame, true));
  }, [source]);

  const getImageDimensions = (
    imageSource: ImageSourcePropType,
  ): Promise<{width: number; height: number}> => {
    return new Promise((resolve, reject) => {
      const resolvedSource = Image.resolveAssetSource(
        imageSource,
      ) as ImageResolvedAssetSource;
      if (!resolvedSource) {
        reject('Invalid image source');
        return;
      }

      resolve({width: resolvedSource.width, height: resolvedSource.height});
    });
  };

  return (
    <View style={[]}>
      <View style={[s.positionAbsolute, s.z30, s.wFit, {top: -5, right: -5}]}>
        <LottieView
          source={PremiumBadgeAnimation}
          autoPlay
          style={[{width: 70, height: 70, transform: [{rotate: '20deg'}]}]}
        />
      </View>
      <View
        style={[
          s.flex,
          s.itemsCenter,
          aspectRatio === 'square' &&
            calculatedHeight >= calculatedWidth &&
            s.aspect1,
          s.overflowClip,
          {width: `${percentWidth}%`},
        ]}>
        <Image
          id={'ImageSnapshot'}
          style={[
            {
              height: calculatedHeight,
              width: calculatedWidth,
              marginTop: '4.5%',
              borderTopLeftRadius: calculatedBorderRadius,
              borderTopRightRadius: calculatedBorderRadius,
            },
          ]}
          source={source}
          resizeMode={'contain'}
        />
        {phoneFrameVisible && (
          <Image
            id={'PhoneFrame'}
            style={[
              s.z10,
              s.positionAbsolute,

              {
                height: calculatedFrameHeight,
                width: calculatedFrameWidth,
                top: 0,
                left: 0,
              },
            ]}
            source={PhoneFrame}
            resizeMode={'contain'}
          />
        )}
        {bottomFadeVisible && (
          <LinearGradient
            id={'FadedBottom'}
            colors={[`${bgColorHexCode}00`, bgColorHexCode]}
            style={[
              s.positionAbsolute,
              s.z20,
              s.wFull,
              s.h25,
              {bottom: 0, left: 0, right: 0},
            ]}
          />
        )}
      </View>
    </View>
  );
};

export default ScreenshotImage;

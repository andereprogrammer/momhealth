import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  Easing,
  ImageBackground,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import Video from 'react-native-video';
import FastImage from 'react-native-fast-image';
import {
  SCREEN_WIDTH_WINDOW,
  verticalScale,
} from '../../../helpers/layoutHelper';
import ImageWithView from '../../../components/ImageWithView';
import {BlurView} from '@react-native-community/blur';
import {White} from '../../../assets';
import LinearGradient from 'react-native-linear-gradient';
import {SvgUri} from 'react-native-svg';

type Props = {
  week: number;
  link: string;
};
type ImageBabyProps = {
  week: number;
  index: number;
  imageUrls: string[];
  url: string;
  isVisible: boolean;
};

const ImageBaby = ({
  week,
  index,
  imageUrls,
  url,
  isVisible,
}: ImageBabyProps) => {
  const opacity = useRef(new Animated.Value(isVisible ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: isVisible ? 1 : 0,
      duration: 150,
      useNativeDriver: true,
      easing: isVisible ? Easing.inOut(Easing.ease) : Easing.linear,
    }).start();
  }, [isVisible]);

  return (
    <Animated.View
      style={[
        styles.imageContainer,
        {
          opacity: opacity.interpolate({
            inputRange: [0, 0.5, 0.8, 1],
            outputRange: [0, 0.5, 0.8, 1],
          }),
          zIndex: imageUrls.length - index,
        },
      ]}>
      <View
        style={{
          height: SCREEN_WIDTH_WINDOW / 1.3,
          aspectRatio: 1,
        }}>
        <FastImage
          source={{uri: url}}
          resizeMode="contain"
          style={styles.image}
        />
      </View>
    </Animated.View>
  );
};

const POGTracker = ({week = 10, link}: Props) => {
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [previousWeek, setPreviousWeek] = useState<number | null>(null);
  const [currentWeek, setCurrentWeek] = useState<number>(week);

  const generateAndCacheWeekUrls = (): string[] => {
    const baseUrl =
      'https://s3.ap-south-1.amazonaws.com/everheal.nexus.prod/app/patient/pog-biodigital-videos/bio-digital-baby-images/Week+';
    const urls: string[] = [];

    for (let week = 0; week <= 40; week++) {
      const url = `${baseUrl}${week}.png?isValid=true`;
      urls.push(url);

      FastImage.preload([{uri: url}]);
    }

    return urls;
  };

  useEffect(() => {
    const urls = generateAndCacheWeekUrls();
    setImageUrls(urls);
  }, []);

  useEffect(() => {
    if (currentWeek !== week) {
      setPreviousWeek(currentWeek);
      setCurrentWeek(week);
    }
  }, [week]);

  const STATIC_URL = `https://s3.ap-south-1.amazonaws.com/everheal.nexus.prod/app/patient/pog-biodigital-videos/staticbiodigitalbg.mp4`;

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <>
          {/* <Video
            source={{uri: STATIC_URL}}
            paused={false}
            repeat={true}
            resizeMode="cover"
            style={styles.video}
          /> */}

          <ImageWithView
            imageSource={require('../../../assets/images/pogbaby3.jpg')}
            customStyle={[
              styles.video,
              {position: 'absolute', top: 0, zIndex: 4, opacity: 1},
            ]}
            isLocalImage
            width={'100%'}
            height={'100%'}
          />
          <ImageWithView
            imageSource={require('../../../assets/images/TopLayer.png')}
            customStyle={[styles.video, {zIndex: 5, opacity: 1}]}
            isLocalImage
            width={'100%'}
            height={'100%'}
          />

          <View
            style={{
              position: 'absolute',
              top: '83%',
              left: '40%',
              height: 12,
              width: 90,
              borderRadius: 80,
              zIndex: 96,
              shadowColor:
                Platform.OS === 'android'
                  ? 'rgba(207, 89, 79, 0.6)'
                  : 'rgba(207, 89, 79, 1)',
              elevation: 3,
              shadowOpacity: 1,
              backgroundColor: 'transparent',
              shadowRadius: 5,
              shadowOffset: {
                width: 2,
                height: 12,
              },
            }}></View>

          <View style={styles.motiView}>
            {imageUrls.map((url, index) => {
              const isCurrent = index === currentWeek;
              const isPrevious = index === previousWeek;

              if (isCurrent || isPrevious) {
                return (
                  <ImageBaby
                    key={index}
                    index={index}
                    imageUrls={imageUrls}
                    week={week}
                    url={url}
                    isVisible={isCurrent}
                  />
                );
              }

              return null;
            })}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    flexDirection: 'row',
    overflow: 'hidden',
    flex: 1,
  },
  video: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    alignSelf: 'center',
  },
  motiView: {
    width: SCREEN_WIDTH_WINDOW,
    position: 'absolute',
    height: SCREEN_WIDTH_WINDOW / 1.1,
    top: SCREEN_WIDTH_WINDOW / 2.8,
    zIndex: 15,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    position: 'absolute',
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default React.memo(POGTracker);

import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {
  moderateScale,
  SCREEN_WIDTH_WINDOW,
} from '../../../../helpers/layoutHelper';
import {fonts, Pallete} from '../../../../theme/enum';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import useDataProvider from '../../../../context-store/useDataProvider';
import LinearGradient from 'react-native-linear-gradient';
import {categoryColorCodes, getColorCodesByCategory} from '../../constants';
import {SvgUri} from 'react-native-svg';
import s from '../../../../styles/GlobalStyles';
import {FileIcon, Lock, PlayBtn} from '../../../../assets';
import FastImage from 'react-native-fast-image';

type ThumbnailCardProps = {
  title: string;
  image_link: string;
  video_link: string;
  default_locked: boolean;
  category: string;
  type: string;
};

const ThumbnailCard = ({
  title = '',
  image_link,
  video_link = '',
  default_locked,
  category,
  type,
}: ThumbnailCardProps) => {
  const navigation = useNavigation<NavigationProp<any, any>>();
  const {freemium, setKeyProp} = useDataProvider();
  useEffect(() => {
    return () => {
      setKeyProp(null);
    };
  }, []);
  const openContent = () => {
    if (type === 'Video') {
      navigation.navigate('VideoScreen', {
        url: video_link,
      });
    } else {
      navigation.navigate('PdfViewScreen', {
        url: video_link,
      });
    }
  };
  const handleVideo = () => {
    if (freemium) {
      if (!default_locked) {
        openContent();
      } else {
        navigation.navigate('LockedFeaturesScreen');
      }
    } else {
      openContent();
    }
  };

  const assetBaseInner = `https://s3.ap-south-1.amazonaws.com/everheal.nexus.prod/app/patient/assets/carepage-category-svgs/${category}Inner.svg`;
  const assetBaseOuter = `https://s3.ap-south-1.amazonaws.com/everheal.nexus.prod/app/patient/assets/carepage-category-svgs/${category}Outer.svg`;
  FastImage.preload([
    {uri: assetBaseInner},
    {uri: assetBaseOuter},
    {uri: image_link},
  ]);
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={handleVideo}
      style={[styles.cardContainer]}>
      {/* {getColorCodesByCategory(category).length !== 0 ? (
        <LinearGradient
          locations={[0, 0.4, 0.7, 1]}
          style={[
            styles.gradientAspect,
            styles.borderConstant,
            s.p0,
            s.overflowHidden,
            s.bgWhite,
            s.positionRelative,
            s.wFull,
          ]}
          colors={categoryColorCodes.Mentalhealth}> */}
      <View
        style={[
          styles.gradientAspect,
          styles.borderConstant,
          s.wFull,
          s.overflowHidden,
          s.bgWhite,
          s.positionRelative,
        ]}>
        <Text
          style={[
            s.positionAbsolute,
            s.z50,
            styles.categoryText,
            s.fontJakartaXBold,
            {
              color:
                category === 'Gynecologist inputs' || category === 'Meditation'
                  ? Pallete.plainWhite
                  : Pallete.Eggplant,
            },
          ]}>
          {category}
        </Text>
        <FastImage
          source={type === 'Video' ? PlayBtn : FileIcon}
          style={[
            styles.btnPos,
            s.positionAbsolute,
            s.selfCenter,
            s.justifyCenter,
            s.z50,
          ]}
        />
        <SvgUri
          width="100%"
          height="100%"
          scaleY={1.1}
          style={[styles.outerShape, s.positionAbsolute, s.z10]}
          uri={assetBaseOuter}
        />
        <SvgUri
          width="100%"
          height="100%"
          scaleY={1.1}
          style={[styles.innerShape, s.positionAbsolute, s.z10]}
          uri={assetBaseInner}
        />
        <FastImage
          source={{uri: image_link}}
          style={[
            styles.borderConstant,
            s.positionAbsolute,
            styles.imagePos,
            s.hFull,
            styles.w75,
          ]}
        />
        {default_locked && (
          <View
            // onPress={() => navigation.navigate('PackageHomeScreen')}
            style={styles.lock}>
            <Image source={Lock} style={styles.lockImage} />
          </View>
        )}
      </View>
      {/* </LinearGradient>
      ) : null} */}

      <View style={styles.titleSpacing}>
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(ThumbnailCard);

const styles = StyleSheet.create({
  lockImage: {width: '100%', height: '100%'},
  categoryText: {
    top: '5%',
    left: 10,
    width: '64%',
    fontSize: moderateScale(10),
  },
  btnPos: {
    bottom: '5%',
    left: 10,
    width: 30,
    height: 30,
  },
  lock: {
    position: 'absolute',
    bottom: 10,
    zIndex: 2000,
    width: 30,
    height: 30,
    right: 10,
  },
  imagePos: {zIndex: 3, right: -5, top: 0, transform: [{scale: 1.1}]},
  innerCon: {
    flex: 1,
  },
  w75: {
    width: '70%',
  },
  outerShape: {
    top: 0,
    left: -10,
    transform: [{scaleY: 1.1}],
  },
  innerShape: {
    top: 0,
    left: -20,
    transform: [{scaleY: 1.1}],
  },
  gradientAspect: {
    height: '80%',
  },
  cardContainer: {
    width: SCREEN_WIDTH_WINDOW / 2,
    height: SCREEN_WIDTH_WINDOW / 1.55,
    marginHorizontal: 10,
    position: 'relative',
    shadowRadius: 4,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowColor: '#c3c3c3',
    backgroundColor: 'transparent',
    elevation: 12,
  },
  cardTitle: {
    color: Pallete.EbonyGray,
    fontFamily: fonts.SecondaryDMSansBold,
    fontSize: moderateScale(14),
  },
  titleSpacing: {paddingVertical: 12, paddingHorizontal: 2},
  borderConstant: {
    borderRadius: 20,
  },
});

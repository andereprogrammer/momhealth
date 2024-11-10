import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SCREEN_WIDTH_WINDOW} from '../../../helpers/layoutHelper';
import ImageWithView from '../../../components/ImageWithView';
import {fonts, Pallete} from '../../../theme/enum';
import FastImage from 'react-native-fast-image';
import s from '../../../styles/GlobalStyles';
import {Anitamam, BgShape, PlayBtn} from '../../../assets';
type Props = {
  weeks: number;
  onClickfn: () => void;
};

const WeeklyVideoBanner = ({weeks, onClickfn}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onClickfn}
      style={styles.container}>
      <View style={styles.topText}>
        <Text style={styles.mainText}>{'What to expect in'}</Text>
        <Text style={styles.week}>{'week ' + weeks}</Text>
      </View>

      <FastImage
        source={Anitamam}
        resizeMode="contain"
        style={[
          s.wFull,
          s.overflowHidden,

          s.positionAbsolute,
          {zIndex: 100, bottom: 0, height: '60%'},
        ]}
      />
      <FastImage
        source={BgShape}
        resizeMode="cover"
        style={[s.wFull, s.positionAbsolute, s.z50, s.h75, {bottom: 0}]}
      />
      <ImageWithView
        imageSource={PlayBtn}
        isLocalImage
        width={40}
        height={40}
        customStyle={[
          {
            top: '65%',
            zIndex: 200,
          },
          s.positionAbsolute,
          s.selfCenter,
          s.justifyCenter,
        ]}
      />
      <View style={styles.bottomText}>
        <Text style={styles.nameText}>{'Dr. Anita'}</Text>
        <Text style={styles.designation}>{'Gynecologist'}</Text>
        <Text style={styles.designation}>35 years experience</Text>
      </View>
    </TouchableOpacity>
  );
};

export default WeeklyVideoBanner;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: '#FCC7CD',
    marginHorizontal: 10,
    alignSelf: 'center',
    marginVertical: 10,
    shadowColor: '#777',
    shadowOpacity: 0.18,
    shadowRadius: 3,
    shadowOffset: {
      width: 1,
      height: 4,
    },
    elevation: 12,
  },
  topText: {
    position: 'absolute',
    top: 15,
    left: 14,
    zIndex: 10,
  },
  mainText: {
    fontSize: 22,
    color: Pallete.plainWhite,
    fontFamily: fonts.PrimaryJakartaExtraBold,
  },
  week: {
    fontSize: 26,
    fontFamily: fonts.PrimaryJakartaExtraBold,
    color: Pallete.plainWhite,
  },
  bottomText: {
    position: 'absolute',
    bottom: 15,
    left: 14,
    zIndex: 10,
  },
  nameText: {
    fontSize: 16,
    fontFamily: fonts.PrimaryJakartaExtraBold,
    color: Pallete.plainWhite,
  },
  designation: {
    fontSize: 12,
    fontFamily: fonts.PrimaryJakartaMedium,
    color: Pallete.plainWhite,
  },
});

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {commonStyles} from '../styles/pogStyles';
import ImageWithView from '../../../components/ImageWithView';
import {
  horizontalScale,
  SCREEN_WIDTH_WINDOW,
} from '../../../helpers/layoutHelper';
import {Pallete} from '../../../theme/enum';
import LinearGradient from 'react-native-linear-gradient';
import {stringLiterals} from '../constants';
import {Placeholder, Play, PlayBtn} from '../../../assets';

type RecommendedVideoProps = {
  yogaVideoTitle: string;
  yogaVideoDecription: string;
  imageSource: string;
  onClickFn: () => void;
};

const RecommendedVideo = ({
  yogaVideoDecription = '',
  yogaVideoTitle = '',
  imageSource = '',
  onClickFn,
}: RecommendedVideoProps) => {
  return (
    <>
      <Text style={[commonStyles.headingText, commonStyles.innerSpacing]}>
        {stringLiterals.RECOMMENDED_YOGA}
      </Text>
      <TouchableOpacity onPress={onClickFn}>
        <LinearGradient
          colors={['#F7C2E6', 'rgba(122,60,220,0.4)']}
          angle={190}
          useAngle
          style={[
            commonStyles.flexRow,
            styles.container,
            commonStyles.innerSpacing,
            commonStyles.marginSpacing,
          ]}>
          <ImageWithView
            width={'32%'}
            height={'100%'}
            isLocalImage={false}
            customStyle={{position: 'relative'}}
            imageSource={imageSource}
          />
          <ImageWithView
            width={30}
            height={30}
            isLocalImage
            imageSource={PlayBtn}
            customStyle={{position: 'absolute', left: horizontalScale(50)}}
          />
          <View style={[styles.textContainer]}>
            <Text style={[commonStyles.headingText]}>{yogaVideoTitle}</Text>
            <Text style={[commonStyles.bodyText]}>{yogaVideoDecription}</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </>
  );
};

export default RecommendedVideo;

const styles = StyleSheet.create({
  container: {
    height: SCREEN_WIDTH_WINDOW / 3.2,
    alignItems: 'center',
    borderRadius: 20,
    shadowColor: '#c3c3c3',
    shadowOpacity: 0.4,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowRadius: 3,
  },

  textContainer: {
    width: '63%',
    height: '90%',
    justifyContent: 'flex-start',
    gap: 5,
  },
});

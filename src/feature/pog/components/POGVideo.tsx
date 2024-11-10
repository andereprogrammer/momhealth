import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {commonStyles} from '../styles/pogStyles';
import {
  horizontalScale,
  SCREEN_WIDTH_WINDOW,
  verticalScale,
} from '../../../helpers/layoutHelper';
import ImageWithView from '../../../components/ImageWithView';
import {PlayBtn} from '../../../assets';

type Props = {
  pogVideoTitle: string | undefined;
  pogVideoDescription: string | undefined;
  image_link: string;
  video_link: string;
  onClickFn: (link: string) => void;
};

const POGVideo = ({
  pogVideoDescription,
  pogVideoTitle,
  image_link,
  video_link,
  onClickFn,
}: Props) => {
  return (
    <View
      style={{
        width: SCREEN_WIDTH_WINDOW,
      }}>
      <Text
        style={[
          commonStyles.headingText,
          {paddingVertical: 10, paddingHorizontal: 10},
        ]}>
        {pogVideoTitle}
      </Text>
      <TouchableOpacity
        onPress={() => onClickFn(video_link)}
        style={[
          commonStyles.flexRow,
          styles.container,
          commonStyles.innerSpacing,
          commonStyles.shadow,
          commonStyles.marginSpacing,
        ]}>
        <ImageWithView
          width={'40%'}
          height={'95%'}
          mode="cover"
          isLocalImage={false}
          imageSource={image_link}
          customStyle={styles.customImageStyle}
        />
        <ImageWithView
          width={30}
          height={30}
          isLocalImage
          imageSource={PlayBtn}
          customStyle={styles.playIconStyle}
        />
        <View style={[styles.textContainer]}>
          <Text style={[commonStyles.headingText]}>{pogVideoTitle}</Text>
          <Text style={[commonStyles.bodyText]}>{pogVideoDescription}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default POGVideo;

const styles = StyleSheet.create({
  container: {
    maxHeight: SCREEN_WIDTH_WINDOW / 2.5,
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 20,
  },

  textContainer: {
    width: '55%',
    height: '70%',
    gap: 5,
  },
  customImageStyle: {
    position: 'relative',
    borderRadius: 20,
    overflow: 'hidden',
  },
  playIconStyle: {
    position: 'absolute',
    left: horizontalScale(55),
    top: verticalScale(40),
  },
});

import {ImageProps, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {commonStyles} from '../styles/pogStyles';
import ImageWithView from '../../../components/ImageWithView';
import {
  SCREEN_HEIGHT_WINDOW,
  SCREEN_WIDTH_WINDOW,
} from '../../../helpers/layoutHelper';
import Markdown from 'react-native-markdown-display';
import {Pallete} from '../../../theme/enum';

type Props = {
  title: string;
  description_in_markdown: string;
  image_link: string | undefined | '' | ImageProps;
};

const ThingsToDoCard = ({
  image_link,
  title = '',
  description_in_markdown = '',
}: Props) => {
  return (
    <>
      {description_in_markdown !== '' ? (
        <View
          style={[
            commonStyles.marginSpacing,
            {
              width: '100%',
              paddingHorizontal: 20,
              justifyContent: 'space-between',
              flex: 0.5,
            },
          ]}>
          <View style={[styles.textContainer]}>
            <Text style={[commonStyles.headingText, {width: '100%'}]}>
              {title}
            </Text>
          </View>
          <ImageWithView
            width={SCREEN_WIDTH_WINDOW / 2}
            height={SCREEN_WIDTH_WINDOW / 2}
            isLocalImage={false}
            imageSource={image_link}
            customStyle={[styles.customImageStyle]}
          />
          <Text
            style={[
              commonStyles.bodyText,
              {width: '100%', paddingVertical: 10},
            ]}>
            {description_in_markdown}
          </Text>
        </View>
      ) : null}
    </>
  );
};

export default ThingsToDoCard;

const styles = StyleSheet.create({
  textContainer: {
    width: '100%',
    height: '14%',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 10,
  },
  customImageStyle: {backgroundColor: Pallete.backgroundPink},
});

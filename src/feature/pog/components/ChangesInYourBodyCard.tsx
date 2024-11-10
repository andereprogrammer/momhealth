import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {commonStyles} from '../styles/pogStyles';
import ImageWithView from '../../../components/ImageWithView';
import {
  SCREEN_HEIGHT_WINDOW,
  SCREEN_WIDTH_WINDOW,
} from '../../../helpers/layoutHelper';
import InfoCardWithImage from './InfoCardWithImage';

type ChangesInYourBodyCardProps = {
  title: string;
  description: string;
  image_link: string;
};

const ChangesInYourBodyCard = ({
  title = '',
  description = '',
  image_link = '',
}: ChangesInYourBodyCardProps) => {
  return (
    <>
      {description !== '' ? (
        <View
          style={{
            height: SCREEN_HEIGHT_WINDOW / 1.4,
            width: '100%',
            paddingVertical: 40,
            paddingHorizontal: 20,
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
          }}>
          <View
            style={[
              {
                width: '100%',
                justifyContent: 'flex-start',
                paddingVertical: 20,
              },
            ]}>
            <Text style={[commonStyles.headingText]}>{title}</Text>
          </View>
          <ImageWithView
            imageSource={image_link}
            width={'70%'}
            height={'50%'}
            isLocalImage={false}
            mode="contain"
            customStyle={{alignSelf: 'center'}}
          />
          <View style={[{width: '100%', paddingVertical: 20}]}>
            <Text style={[commonStyles.bodyText]}>{description}</Text>
          </View>
        </View>
      ) : null}
    </>
  );
};

export default ChangesInYourBodyCard;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
  },
  textContainer: {
    width: '66%',
    height: '100%',
    gap: 5,
  },
});

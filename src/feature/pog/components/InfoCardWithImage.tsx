import {DimensionValue, StyleProp, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {commonStyles} from '../styles/pogStyles';
import ImageWithView from '../../../components/ImageWithView';

type Props = {
  customContainerStyles: StyleProp<any>;
  image_link: string;
  imageWidth: DimensionValue | undefined;
  imageHeight: DimensionValue | undefined;
  customTextContainerStyles: StyleProp<any>;
  title: string | undefined;
  description: string | undefined;
  isLocalImage: boolean;
  imageStyle?: StyleProp<any>;
};

const InfoCardWithImage = ({
  customContainerStyles,
  imageHeight,
  imageWidth,
  image_link = '',
  title = '',
  description = '',
  customTextContainerStyles,
  isLocalImage = false,
  imageStyle,
}: Props) => {
  return (
    <View style={[commonStyles.flexRow, customContainerStyles]}>
      <ImageWithView
        imageSource={image_link}
        width={imageWidth}
        height={imageHeight}
        isLocalImage={isLocalImage}
        customStyle={imageStyle}
      />
      <View style={[customTextContainerStyles]}>
        <Text style={[{fontSize: 14}]}>{title}</Text>
        <Text style={[{fontSize: 12}]}>{description}</Text>
      </View>
    </View>
  );
};

export default InfoCardWithImage;

const styles = StyleSheet.create({});

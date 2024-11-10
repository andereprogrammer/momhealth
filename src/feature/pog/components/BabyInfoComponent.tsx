import {ImageProps, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ImageWithView from '../../../components/ImageWithView';
import {commonStyles} from '../styles/pogStyles';
import {fonts} from '../../../theme/enum';
import {SCREEN_WIDTH_WINDOW} from '../../../helpers/layoutHelper';

type BabyInfoComponentProps = {
  infoHeading: string | undefined | '';
  infoDetail: string | undefined | '' | number;
  imageSource: string | undefined | '' | ImageProps;
  staticImage: boolean;
};

const BabyInfoComponent = ({
  infoDetail,
  infoHeading,
  imageSource = '',
  staticImage = true,
}: BabyInfoComponentProps) => {
  return (
    <View style={[styles.container]}>
      <View style={[commonStyles.innerSpacing]}>
        <Text style={[commonStyles.headingText]}>{infoHeading}</Text>
      </View>

      <ImageWithView
        width={'80%'}
        height={'50%'}
        mode="contain"
        imageSource={imageSource}
        isLocalImage={staticImage}
      />
      <Text style={[styles.textAligment, commonStyles.innerSpacing]}>
        {infoDetail}
      </Text>
    </View>
  );
};

export default BabyInfoComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1 / 3,
    alignItems: 'center',
    minHeight: SCREEN_WIDTH_WINDOW / 1.8,
  },
  textAligment: {
    textAlign: 'center',
    fontFamily: fonts.SecondaryDMSansMedium,
    fontSize: 14,
    color: '#333',
  },
});

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {fonts, Pallete} from '../../../theme/enum';
import {Placeholder} from '../../../assets';
import ImageWithView from '../../../components/ImageWithView';
import {moderateScale} from '../../../helpers/layoutHelper';

type Props = {
  item: {offering: string; image: string};
};

const OfferingListItem = ({item}: Props) => {
  return (
    <View key={item.offering} style={[styles.container]}>
      <ImageWithView
        width={'23%'}
        height={75}
        isLocalImage={false}
        imageSource={item.image}
        customStyle={styles.imageCustomStyle}
        mode="contain"
      />
      <View style={styles.textViewStyle}>
        <Text style={styles.listTextStyle}>{item.offering}</Text>
      </View>
    </View>
  );
};

export default OfferingListItem;

const styles = StyleSheet.create({
  textViewStyle: {
    width: '76%',
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  listTextStyle: {
    fontFamily: fonts.PrimaryJakartaBold,
    fontSize: moderateScale(16),
    alignSelf: 'center',
    color: Pallete.EbonyGray,
  },
  imageCustomStyle: {
    borderRadius: 35,
    padding: 10,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 14,
    marginVertical: 16,
  },
});

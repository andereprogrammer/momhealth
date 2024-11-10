import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Placeholder} from '../../../assets';
import {SCREEN_WIDTH_WINDOW} from '../../../helpers/layoutHelper';
import {fonts, Pallete} from '../../../theme/enum';
import ImageWithView from '../../../components/ImageWithView';

type Props = {};

const ToolsDescriptionCard = (props: Props) => {
  return (
    <View
      style={{
        width: SCREEN_WIDTH_WINDOW / 1.5,
        height: SCREEN_WIDTH_WINDOW / 1.5,
        backgroundColor: Pallete.plainWhite,
        borderRadius: 20,
        marginHorizontal: 5,
      }}>
      <ImageWithView
        imageSource={Placeholder}
        isLocalImage
        width={'100%'}
        height={'60%'}
      />
      <View style={{marginVertical: 5, paddingVertical: 5}}>
        <Text
          style={{
            color: Pallete.EbonyGray,
            fontFamily: fonts.PrimaryJakartaBold,
          }}>
          All garbhsanskar tools
        </Text>
        <Text
          style={{
            color: Pallete.EbonyGray,
            fontFamily: fonts.PrimaryJakartaBold,
          }}>
          For you and your baby
        </Text>
      </View>
      <View
        style={{
          width: '100%',
          backgroundColor: Pallete.Eggplant,
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          borderBottomEndRadius: 20,
          borderBottomStartRadius: 20,
        }}>
        <Text
          style={{
            color: Pallete.plainWhite,
            fontFamily: fonts.PrimaryJakartaExtraBold,
          }}>
          Explore now
        </Text>
      </View>
    </View>
  );
};

export default ToolsDescriptionCard;

const styles = StyleSheet.create({});

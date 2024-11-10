import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Cross} from '../../../assets';
import {Pallete, fonts} from '../../../theme/enum';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import PrimaryHeadingTextComponent from '../../../components/TextComponents/PrimaryHeadingTextComponent';

type Props = {
  text: string;
  closeSheet: () => void;
};

const BottomSheetHeaderComponent = (props: Props) => {
  return (
    <View style={styles.mainView}>
      <View style={styles.textView}>
        <PrimaryHeadingTextComponent
          text={props.text}
          fontSize={16}
          color={Pallete.darkBlack}
        />
      </View>
      <TouchableOpacity onPress={props.closeSheet} style={styles.crossBtnView}>
        <Image
          resizeMethod="resize"
          resizeMode="contain"
          source={Cross}
          style={styles.imageView}
        />
      </TouchableOpacity>
    </View>
  );
};

export default BottomSheetHeaderComponent;

const styles = StyleSheet.create({
  mainView: {
    width: '100%',
    height: verticalScale(40),
    alignSelf: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: horizontalScale(10),
  },
  crossBtnView: {
    width: '20%',
    height: '50%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  imageView: {width: '30%', height: '90%'},
  textView: {
    width: '80%',
    height: '100%',
  },
});

import React from 'react';
import {
  Dimensions,
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../../../helpers/layoutHelper';

// import { Container } from './styles';
import {HeaderTextPRops} from './types';
import {BackBtn} from '../../../../../assets';
import {designPalette} from '../../../../../theme/Theme';
import {fonts} from '../../../../../theme/enum';
const {width} = Dimensions.get('window');

const HeaderTextComponent: React.FC<HeaderTextPRops> = props => {
  return (
    <View style={[props.style, styles.textStyles]}>
      <Text
        style={[
          styles.mainText,
          props.mainTextStyle ? props.mainTextStyle : {},
        ]}>
        {props.mainText}
      </Text>
      {props.callTextPresent === true && (
        <TouchableOpacity
          onPress={props.callFuntion}
          style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
          <Text style={styles.callText}>{props.callText}</Text>
          <Image
            resizeMethod="resize"
            resizeMode="contain"
            source={BackBtn}
            style={{width: 14, height: 14, transform: [{rotate: '-180deg'}]}}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  textStyles: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(20),
  },
  mainText: {
    fontFamily: fonts.PrimaryJakartaBold,
    fontSize: 18,
    color: '#000',
  },
  callText: {
    color: designPalette.primary.PinkHopbrush,
    fontFamily: fonts.SecondaryDMSansBold,
  },
});
export default HeaderTextComponent;

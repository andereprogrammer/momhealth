import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import {fonts} from '../../../theme/enum';
import {designPalette} from '../../../theme/Theme';
import {BackBtn} from '../../../assets';
type Props = {
  showModal: (params: boolean) => void;
  typeName: string;
  visibility: boolean;
  callFuntion: () => void;
};
const HeaderWithFilter = (props: Props) => {
  const [show, setShow] = useState(props.visibility);
  const [sessionType, setSessionType] = useState(props.typeName);

  useEffect(() => {
    setShow(props.visibility);
  }, [props.visibility, props.typeName, sessionType, show]);
  const handlePress = () => {
    console.log('inside the header', props.visibility);
    setShow(!props.visibility);
    props.showModal(!props.visibility);
  };
  return (
    <View style={[styles.textStyles]}>
      <View style={{flexDirection: 'row'}}>
        <Text style={[styles.mainText]}>{props.typeName} sessions</Text>
        <TouchableOpacity onPress={handlePress}>
          <Image
            source={BackBtn}
            style={{width: 20, height: 20, transform: [{rotate: '270deg'}]}}
            resizeMethod="resize"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={props.callFuntion}
        style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
        <Text style={styles.callText}>{'View all'}</Text>
        <Image
          resizeMethod="resize"
          resizeMode="contain"
          source={BackBtn}
          style={{width: 14, height: 14, transform: [{rotate: '-180deg'}]}}
        />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  textStyles: {
    // marginHorizontal: horizontalScale(10),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(20),
  },
  mainText: {
    fontFamily: fonts.SecondaryDMSansBold,
    fontSize: 16,
    color: '#000',
  },
  callText: {
    color: designPalette.primary.PinkHopbrush,
    fontFamily: fonts.SecondaryDMSansBold,
  },
});
export default HeaderWithFilter;

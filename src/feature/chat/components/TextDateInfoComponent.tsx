import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import {fonts} from '../../../theme/enum';

type Props = {
  date: string;
};

const TextDateInfoComponent = (props: Props) => {
  return (
    <View style={stylesSharedText.mainView}>
      <View style={stylesSharedText.infoView}>
        <Text style={stylesSharedText.secondaryText}>Shared On</Text>
        <Text style={stylesSharedText.dateText}>{props.date}</Text>
      </View>
    </View>
  );
};

export default TextDateInfoComponent;

export const stylesSharedText = StyleSheet.create({
  mainView: {
    height: verticalScale(60),
    width: '100%',
    marginTop: 10,
  },
  infoView: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: horizontalScale(15),
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(10),
    borderColor: '#E9E7EA',
    gap: 5,
  },
  dateText: {
    fontFamily: fonts.SecondaryDMSansBold,
    fontSize: 16,
    color: '#000',
    textAlign: 'left',
  },
  secondaryText: {
    fontFamily: fonts.SecondaryDMSansMedium,
    fontSize: 14,
    color: '#000',
  },
});

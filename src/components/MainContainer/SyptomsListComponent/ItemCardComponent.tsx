import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {listItem, styleProp} from './types';
import { fonts } from "../../../theme/enum";

type Props = listItem & styleProp;
const ItemCardComponent: React.FC<Props> = props => {
  return (
    <>
      <Text style={[styles.textStyle, props.style]}>{props.syptom}</Text>
    </>
  );
};
const styles = StyleSheet.create({
  cardContainer: {
    alignSelf: 'center',
  },
  textStyle: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    minHeight: 40,
    borderColor: '#E7E6E7',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 12,
    fontWeight: '400',
    fontFamily: fonts.SecondaryDMSansRegular,
    fontSize: 16,
    overflow: 'hidden',
    color: 'rgba(39, 29, 42, 1)',
  },
});
export default ItemCardComponent;

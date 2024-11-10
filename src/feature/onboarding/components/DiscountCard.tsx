import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {fonts, Pallete} from '../../../theme/enum';
import {moderateScale, verticalScale} from '../../../helpers/layoutHelper';

type Props = {
  selectedPackage: any;
};

const DiscountCard = ({selectedPackage}: Props) => {
  return (
    <View style={styles.viewStyle}>
      <Text style={styles.lineThroughmount}>{selectedPackage.full_amount}</Text>
      <Text style={styles.amountPerMonthText}>
        ₹ {selectedPackage?.amount / selectedPackage?.tenure}/month
      </Text>
    </View>
  );
};

export default DiscountCard;

const styles = StyleSheet.create({
  viewStyle: {
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    marginTop: verticalScale(5),
  },
  lineThroughmount: {
    color: Pallete.EbonyGray,
    fontSize: moderateScale(22),
    fontFamily: fonts.PrimaryJakartaBold,
    textDecorationLine: 'line-through',
  },
  amountPerMonthText: {
    color: Pallete.black,
    fontSize: moderateScale(24),
    fontFamily: fonts.PrimaryJakartaBold,
  },
});

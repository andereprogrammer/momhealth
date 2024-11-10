import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React from 'react';
import {fonts} from '../../../../../theme/enum';

type SelectedPackageInfoProps = {
  selectedPackage: any;
  styles?: ViewStyle[];
};

const SelectedPackageInfo = ({
  selectedPackage,
  styles,
}: SelectedPackageInfoProps) => {
  return (
    <View style={styles}>
      <Text
        style={{
          fontSize: 20,
          fontFamily: fonts.PrimaryJakartaBold,
        }}>
        ₹ {selectedPackage?.amount}
      </Text>
      <Text
        style={{
          fontSize: 16,
          fontFamily: fonts.SecondaryDMSansMedium,
        }}>
        {selectedPackage?.tenure}{' '}
        {selectedPackage?.tenure > 1 ? 'months' : 'month'}
      </Text>
    </View>
  );
};

export default SelectedPackageInfo;

const styles = StyleSheet.create({});

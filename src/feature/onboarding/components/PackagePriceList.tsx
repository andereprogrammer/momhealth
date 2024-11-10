import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TenureTileChip from './TenureTileChip';
import MostPopularTag from '../../freemium/features/packages/components/MostPopularTag';
import {fonts, Pallete} from '../../../theme/enum';
import {verticalScale} from '../../../helpers/layoutHelper';

type Props = {
  eligiblePackages: any;
  selectedPackage: any;
  updatePackage: (param: any) => void;
};

const PackagePriceList = ({
  eligiblePackages,
  selectedPackage,
  updatePackage,
}: Props) => {
  return (
    <>
      {eligiblePackages !== undefined && (
        <View style={styles.packageListing}>
          <View style={styles.packageListingView}>
            {eligiblePackages?.packages.map((item: any) => {
              return (
                <View style={styles.relative} key={item.id}>
                  {item.default && <MostPopularTag />}
                  <TenureTileChip
                    packageItem={item}
                    onPress={pac => updatePackage(pac)}
                    selectedPackage={selectedPackage}
                  />
                </View>
              );
            })}
          </View>
        </View>
      )}
    </>
  );
};

export default PackagePriceList;

const styles = StyleSheet.create({
  relative: {
    position: 'relative',
  },
  packageListingView: {
    gap: 10,
    flexDirection: 'column-reverse',
  },
  packageListing: {
    width: '100%',
    paddingHorizontal: 30,
    paddingVertical: verticalScale(5),
    marginVertical: verticalScale(5),
  },
  textStyle: {
    color: Pallete.Eggplant,
    fontFamily: fonts.SecondaryDMSansBold,
  },
});

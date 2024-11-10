import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Ok} from '../../../assets';
import {fonts, Pallete} from '../../../theme/enum';
import {moderateScale, verticalScale} from '../../../helpers/layoutHelper';

type Props = {
  selectedPackage: any;
  packageItem: any;
  onPress: (item: any) => void;
};

const TenureTileChip = ({selectedPackage, packageItem, onPress}: Props) => {
  console.log('packages item', packageItem.item);
  let isSelected = packageItem.id === selectedPackage?.id;
  const {fontScale} = useWindowDimensions();
  let selectedCss = isSelected
    ? styles.packageFocused
    : styles.packageUnfocused;
  return (
    <TouchableOpacity
      onPress={() => onPress(packageItem)}
      style={[styles.container, selectedCss]}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={isSelected ? ['#7F329C', '#4A0080'] : ['#fff', '#fff']}
        style={[
          styles.gradientView,
          {
            paddingHorizontal: isSelected ? 12 : 20,
          },
        ]}>
        <View style={styles.selectedView}>
          {isSelected && (
            <View style={styles.tickAspect}>
              <Image
                resizeMethod="resize"
                resizeMode="cover"
                style={styles.tickImageAspect}
                source={Ok}
                tintColor={'white'}
              />
            </View>
          )}
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
            }}>
            <Text
              style={[
                styles.packagePricingText,
                {
                  color: isSelected ? '#fff' : Pallete.Eggplant,
                },
              ]}>
              ₹{' '}
              {packageItem?.tenure > 1 && (
                <Text
                  style={[
                    styles.packageStrikeOut,
                    {
                      color: isSelected ? '#fff' : Pallete.Eggplant,
                    },
                  ]}>
                  {packageItem?.full_amount + ' '}
                </Text>
              )}
              <Text
                style={{
                  fontFamily: fonts.SecondaryDMSansBold,
                  color: isSelected ? '#fff' : Pallete.Eggplant,
                  fontSize: moderateScale(16),
                }}>
                {packageItem?.amount}
              </Text>
            </Text>
            {packageItem.discount > 0 && (
              <View
                style={[
                  styles.discountView,
                  {
                    backgroundColor: isSelected ? '#fff' : Pallete.Eggplant,
                  },
                ]}>
                <Text
                  style={[
                    styles.discountText,
                    {
                      color: isSelected ? Pallete.Eggplant : '#fff',
                    },
                  ]}>
                  {packageItem.discount}% off
                </Text>
              </View>
            )}
          </View>
        </View>
        <View
          style={{
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: moderateScale(14),
              fontFamily: fonts.PrimaryJakartaExtraBold,
              color: isSelected ? '#fff' : Pallete.Eggplant,
              paddingBottom: 8,
              opacity: 0.8,
            }}>
            for {packageItem.tenure}{' '}
            {packageItem.tenure > 1 ? 'months' : 'month'}
          </Text>
          <Text
            style={{
              width: '100%',
              fontFamily: fonts.SecondaryDMSansMedium,
              color: isSelected ? '#fff' : Pallete.Eggplant,
              fontSize: moderateScale(16),
              opacity: 0.9,
            }}>
            ₹ {packageItem?.amount / packageItem?.tenure}/month
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default TenureTileChip;

const styles = StyleSheet.create({
  discountView: {
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 1,
  },
  discountText: {
    fontFamily: fonts.PrimaryJakartaBold,
    fontSize: 12,
  },
  packageUnfocused: {
    backgroundColor: '#9a9a9a',
  },
  packageFocused: {
    backgroundColor: '#fff',
  },
  container: {
    width: '100%',
    gap: 5,
    marginVertical: verticalScale(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#633D8B',
    position: 'relative',
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowRadius: 5,
    elevation: 10,
    backgroundColor: 'transparent',
    borderRadius: 30,
  },
  gradientView: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 30,
    alignItems: 'center',
    paddingVertical: 10,
  },
  selectedView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tickAspect: {
    width: 35,
    height: 35,
    alignSelf: 'center',
  },
  tickImageAspect: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    alignSelf: 'center',
  },
  packagePricingText: {
    fontFamily: fonts.PrimaryJakartaExtraBold,
    paddingBottom: 5,
    gap: 5,
    display: 'flex',
    flexDirection: 'row',
    fontSize: moderateScale(18),
  },
  packageStrikeOut: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    fontSize: moderateScale(12),
    fontFamily: fonts.PrimaryJakartaBold,
  },
});

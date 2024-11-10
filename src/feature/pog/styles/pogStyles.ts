import {StyleSheet} from 'react-native';
import {fonts, Pallete} from '../../../theme/enum';
import {moderateScale} from '../../../helpers/layoutHelper';

export const commonStyles = StyleSheet.create({
  imageAspect: {
    width: '100%',
    height: '100%',
  },
  centreContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageCard: {
    flex: 0.35,
    borderRadius: 20,
  },
  imageBorder: {
    borderWidth: 1,
    borderColor: Pallete.Eggplant,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  spacing: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  innerSpacing: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  marginSpacing: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  marginInnerSpacing: {
    marginHorizontal: 5,
    marginVertical: 5,
  },
  headingText: {
    fontFamily: fonts.PrimaryJakartaBold,
    fontSize: moderateScale(20),
    color: '#222',
  },
  secondaryHeading: {
    fontFamily: fonts.SecondaryDMSansBold,
    fontSize: 12,
    color: Pallete.plainWhite,
  },
  bodyText: {
    fontFamily: fonts.SecondaryDMSansMedium,
    fontSize: 18,
    color: '#333',
  },
  coloredTextEggplat: {
    color: Pallete.Eggplant,
  },
  shadow: {
    shadowColor: '#c3c3c3',
    shadowOpacity: 0.6,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 4,
    },
  },
});

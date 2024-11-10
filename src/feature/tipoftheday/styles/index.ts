import {StyleSheet} from 'react-native';
import {fonts} from '../../../theme/enum';

export const commonStyles = StyleSheet.create({
  imageAspect: {
    width: '100%',
    height: '100%',
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headingText: {
    color: 'rbga(0, 0, 0, 0.98)',
    fontFamily: fonts.PrimaryJakartaBold,
    fontSize: 18,
  },
  secondaryText: {
    color: '#383838',
    fontFamily: fonts.PrimaryJakartaMedium,
    fontSize: 16,
  },
});

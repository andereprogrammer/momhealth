import {StyleSheet} from 'react-native';

import {COLORS} from '../../utils/theme';
import theme from '../../../../theme/Theme';
import {horizontalScale} from '../../../../helpers/layoutHelper';

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.inputBg,
    marginBottom: horizontalScale(40),
  },
  image: {
    height: 200,
    width: 346,
  },
  heading: {
    color: '#000',
    fontFamily: 'DMSans-Medium',
    fontSize: 34,
    lineHeight: 40,
    letterSpacing: 0.25,
    textAlign: 'center',
    paddingTop: 24,
  },
  description: {
    color: '#000',
    fontFamily: 'DMSans-Regular',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
    textAlign: 'center',
    paddingTop: 16,
  },
  joiningLinkInput: {
    backgroundColor: '#fff',
    borderColor: COLORS.BORDER.LIGHT,
    borderWidth: 1,
    width: '100%',
    borderRadius: 8,
    paddingVertical: 12,
    paddingLeft: 16,
    marginTop: 8,
    color: theme.colors.cardPrimaryBackground,
    fontFamily: 'DMSans-Medium',
  },
  joiningLinkInputText: {
    color: COLORS.TEXT.HIGH_EMPHASIS,
    fontFamily: 'DMSans-Regular',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.25,
  },
  joiningLinkInputView: {
    marginTop: 56,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  joinButton: {
    flex: 1,
    backgroundColor: theme.colors.cardPrimaryBackground,
    paddingRight: 16,
    paddingLeft: 16 + (24 + 32), // 16 + (MORE BUTTON SIZE + MORE BUTTON PADDING)
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  disabled: {
    backgroundColor: COLORS.SECONDARY.DISABLED,
    borderColor: COLORS.SECONDARY.DISABLED,
  },
  joinButtonText: {
    fontFamily: 'DMSans-Medium',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
    color: COLORS.TEXT.HIGH_EMPHASIS_ACCENT,
  },
  disabledText: {
    color: COLORS.TEXT.DISABLED_ACCENT,
  },
  moreButton: {
    width: undefined,
    backgroundColor: COLORS.PRIMARY.DEFAULT,
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  moreButtonIcon: {
    color: theme.colors.cardPrimaryBackground,
  },
  horizontalSeparator: {
    height: 1,
    width: '100%',
    backgroundColor: COLORS.SECONDARY.DISABLED,
    marginVertical: 24,
  },
  scanQRButton: {
    backgroundColor: theme.colors.cardPrimaryBackground,
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.cardPrimaryBackground,
    borderRadius: 8,
  },
  scanQRButtonIcon: {
    color: COLORS.TEXT.HIGH_EMPHASIS_ACCENT,
    paddingRight: 12,
  },
  joiningFlowLeft: {
    width: 'auto',
    backgroundColor: COLORS.SURFACE.LIGHT,
    paddingVertical: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.BORDER.LIGHT,
    paddingLeft: 16,
    paddingRight: 8,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  joiningFlowRight: {
    width: 'auto',
    backgroundColor: COLORS.SURFACE.LIGHT,
    paddingVertical: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.BORDER.LIGHT,
    paddingRight: 16,
    paddingLeft: 8,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  joiningFlowContainer: {
    flexDirection: 'row',
  },
  selectedFlow: {
    backgroundColor: COLORS.PRIMARY.DEFAULT,
  },
});

export {styles};

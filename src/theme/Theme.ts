import {createTheme} from '@shopify/restyle';
import {Pallete} from './enum';

export const designPalette = {
  primary: {
    Eggplant: Pallete.Eggplant,
    PinkHopbrush: Pallete.PinkHopbrush,
    fadedpink: Pallete.fadedpink,
    lightPink: Pallete.lightPink,
    Whitishpink: Pallete.Whitishpink,
  },
  secondary: {
    pastaGreen: Pallete.pastaGreen,
    GoldenGlow: Pallete.GoldenGlow,
    lightBrown: Pallete.lightBrown,
    orangeMelon: Pallete.orangeMelon,
  },
  tertiary: {
    EbonyGray: Pallete.EbonyGray,
    whiteBackground: Pallete.whiteBackground,
    backgroundPink: Pallete.backgroundPink,
  },
  gradeints: {},
};

const palette = {
  primary: Pallete.PinkHopbrush,
  secondary: Pallete.secondary,
  disabledPrimary: Pallete.disabledPrimary,
  backgrooundPrimary: Pallete.backgrooundPrimary,
  cardSelected: Pallete.cardSelected,
  cardBorder: Pallete.cardBorder,
  backgroundSecondary: Pallete.backgroundSecondary,
  inputBackground: Pallete.inputBackground,
  choosePathBg: Pallete.choosePathBg,
  settipUpexperienceBg: Pallete.settipUpexperienceBg,
  black: Pallete.black,
  white: Pallete.whiteBackground,
};

const textColorPalette = {
  heading: Pallete.heading,
  ctaText: Pallete.whiteBackground,
  ctaTextSecondary: Pallete.PinkHopbrush,
  placeHolderText: Pallete.placeHolderText,
  formSecondaryHeading: Pallete.formSecondaryHeading,
  selectionTextColor: Pallete.selectionTextColor,
  selectionBoxSecondary: Pallete.secondary,
  inputBackgroud: Pallete.backgrooundPrimary,
  settipUpCardBg: Pallete.settipUpCardBg,
};

const theme = createTheme({
  colors: {
    mainBackground: palette.backgrooundPrimary,
    cardPrimaryBackground: palette.backgroundSecondary,
    cta: palette.primary,
    inputBg: textColorPalette.inputBackgroud,
    ctadisabled: palette.disabledPrimary,
    ctaTextColor: textColorPalette.ctaText,
    choosePathBg: palette.choosePathBg,
    cardSelected: palette.cardSelected,
    cardBorderSelected: palette.cardBorder,
    settingUpPageBg: palette.settipUpexperienceBg,
    settingUpImgBg: textColorPalette.settipUpCardBg,
  },
  borderRadiuses: {
    card: 20,
    button: 20,
    screen: 10,
    image: 10,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  textVariants: {
    tertiaryHeader: {},
    primaryHeader: {},
    subHeader: {},
    textBold: {},
    textMedium: {},
    fadedText: {},
    coloredText: {},
    header: {
      fontWeight: '700',
      fontSize: 28,
    },
    secondaryHeader: {
      // fontWeight: '400',
      fontSize: 14,
    },
    label: {
      fontWeight: '500' as '500',
      fontSize: 14,
      marginBottom: 10,
      color: '#777',
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
    },
    secondaryInfo: {
      fontWeight: '400',
      fontSize: 12,
    },
    cta: {
      fontWeight: '500' as '500',
      fontSize: 16,
      color: textColorPalette.ctaText,
    },
    defaults: {
      backgroundColor: '#FFFFFF',
      flex: 1,
    },
  },
});

export type Theme = typeof theme;
export default theme;

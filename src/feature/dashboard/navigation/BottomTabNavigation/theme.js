import {DefaultTheme} from '@react-navigation/native';

const YourTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: 'transparent',
  },
};

export default YourTheme;

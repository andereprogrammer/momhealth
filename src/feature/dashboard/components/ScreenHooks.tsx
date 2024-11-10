import {StatusBar} from 'react-native';

export const setStatusBar = (routeName: string, updateFn: any) => {
  console.log('routeName', routeName);
  if (routeName === 'HomeScreen') {
    console.log('Setting to light');
    updateFn('light-content');
  } else {
    updateFn('dark-content');
  }
};

export const updateStatusBar = (routeName: string) => {
  console.log('routeName', routeName);
  switch (routeName) {
    case 'HomeScreen':
    case 'FreemiumHomeScreen':
    case 'ActivityContentScreen':
      console.log('Setting to light');
      StatusBar.setBarStyle('dark-content');
      break;
    default:
      StatusBar.setBarStyle('dark-content');
  }
};

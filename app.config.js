module.exports = {
  name: 'everheal',
  version: '2.0.8',
  extra: {
    apiUrl: process.env.REACT_APP_BASE_URL,
    eas: {
      projectId: '4c65dd84-c35c-47f7-a6eb-a1950aba9d10',
    },
  },
  updates: {
    url: 'https://u.expo.dev/4c65dd84-c35c-47f7-a6eb-a1950aba9d10',
    fallbackToCacheTimeout: 0,
    checkAutomatically: 'ON_LOAD',
    enabled: true,
    requestHeaders: {
      'expo-channel-name': 'production',
    },
  },
  runtimeVersion: '2.0.8',
};

import {identify, Identify, track} from '@amplitude/analytics-react-native';

export const trackEvent = (workflow: string, event: string, action: string) => {
  const eventStr = `${workflow}_${event}_${action}`;
  console.log('sending event', eventStr);
  track(eventStr);
};

export const setIdentityAttribute = (attribute: string, value: string) => {
  const identifyObj = new Identify();
  identifyObj.set(attribute, value);
  identify(identifyObj);
};

export const setOnceIdentityAttribute = (attribute: string, value: string) => {
  const identifyObj = new Identify();
  identifyObj.setOnce(attribute, value);
  identify(identifyObj);
};


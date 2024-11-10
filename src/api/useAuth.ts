import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiEndPointList} from '../constants';
import {REACT_APP_BASE_URL} from '@env';
import {authorizeUserchat} from './chat';
import useDataProvider from '../context-store/useDataProvider';
import {header} from '@sentry/react-native/dist/js/utils/envelope';
import jwt_decode from 'jwt-decode';

let BASE_URL = process.env.REACT_APP_NEXUS_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
});

// Function to save access token in AsyncStorage
const saveAccessToken = async (access_token: string) => {
  try {
    await AsyncStorage.setItem('access_token', access_token);
    await AsyncStorage.setItem('userLogged', 'true');
  } catch (error) {
    // Handle AsyncStorage save error
    console.error('Failed to save access token:', error);
  }
};

// Function to save refresh token in AsyncStorage
const saveRefreshToken = async (refresh_token: string) => {
  try {
    await AsyncStorage.setItem('refresh_token', refresh_token);
  } catch (error) {
    // Handle AsyncStorage save error
    console.error('Failed to save refresh token:', error);
  }
};

const clearTokens = async () => {
  try {
    await AsyncStorage.removeItem('refresh_token');
    await AsyncStorage.removeItem('userLogged');
    await AsyncStorage.removeItem('access_token');
  } catch (error) {
    // Handle AsyncStorage save error
    console.error('Failed to save refresh token:', error);
  }
};

export const isUserLoggedIn = async () => {
  try {
    return await AsyncStorage.getItem('userLogged');
  } catch (error) {
    // Handle AsyncStorage save error
    console.error('Failed to get user Logged in:', error);
  }
};

export const isAuthenticated = async () => {
  try {
    console.log('Calling isAuthenticated');
    let userLogged = await AsyncStorage.getItem('userLogged');
    let refreshToken = await getRefreshToken();
    let accessToken = await getAccessToken();
    if (refreshToken !== null && accessToken !== null) {
      // console.log('accessToken', accessToken, 'refreshToken', refreshToken);
      if (userLogged === 'true' && !isTokenExpired(refreshToken)) {
        if (!isTokenExpired(accessToken)) {
          return true;
        } else {
          await refreshAccessToken(refreshToken);
          return true;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    // Handle AsyncStorage save error
    console.error('Failed to get user Logged in:', error);
    return false;
  }
};

// Axios interceptor for adding access token to the request headers
api.interceptors.request.use(
  async config => {
    const access_token = await getAccessToken();

    const refresh_token = await getRefreshToken();
    // console.log('refresh_token', refresh_token);
    if (access_token && !config.headers.Authorization) {
      //console.log(access_token);
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json';
    }
    if (!config.url.includes('/auth/')) {
      let refreshTokenExpired = isTokenExpired(refresh_token);
      if (refreshTokenExpired) {
        console.log('Token has expired');
        await clearTokens();
        return Promise.resolve();
      }
    }
    // console.log('config interceptor', JSON.stringify(config));
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Axios interceptor for handling token refreshing
let isRefreshing = false;
let refreshSubscribers: ((access_token: string) => void)[] = [];

const onTokenRefreshed = (access_token: string) => {
  refreshSubscribers.forEach(subscriber => subscriber(access_token));
  refreshSubscribers = [];
};

const addRefreshSubscriber = (subscriber: (access_token: string) => void) => {
  refreshSubscribers.push(subscriber);
};

export const refreshAccessToken = async (refreshToken: string) => {
  const response = await api.post(
    '/api/v1/patient-app/auth/refresh-token',
    {},
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    },
  );
  const {access_token} = response.data;
  await saveAccessToken(access_token);
  return access_token;
};

api.interceptors.response.use(
  response => {
    // console.log("response",JSON.stringify(response));
    // console.log("response-headers",JSON.stringify(response.data.headers));
    return response;
  },
  async error => {
    const originalRequest = error.config;
    console.log('response-headers', JSON.stringify(error.response.headers));

    // Check if the error status is 401 (Unauthorized)
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        try {
          const access_token = await new Promise<string>(resolve => {
            addRefreshSubscriber(resolve);
          });
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          return axios(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      } else {
        isRefreshing = true;
        originalRequest._retry = true;

        const refresh_token = await getRefreshToken();
        // console.log('refresh_token', refresh_token);
        let axiosConfig = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + refresh_token,
          },
        };
        console.log('axisConfig', axiosConfig);
        try {
          const access_token = await refreshAccessToken(refresh_token);
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          onTokenRefreshed(access_token);
          return axios(originalRequest);
        } catch (refreshError) {
          console.log('axis error', refreshError.response.headers);
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }
    }

    return Promise.reject(error);
  },
);

// Function to authenticate and obtain tokens
const authenticate = async (phoneNumber: string, otp: string) => {
  try {
    const response = await api.post(apiEndPointList.AUTH_AUTHENTICATE, {
      phone: phoneNumber,
      otp: otp,
    });
    console.log('auth response', response.status);
    if (response.status === 200) {
      const {access_token, refresh_token} = response.data;
      await saveAccessToken(access_token);
      await saveRefreshToken(refresh_token);
    }
    return response.status;
  } catch (error) {
    console.log('auth error', error);
    return 400;
  }
};

// Function to get access token from AsyncStorage
const getAccessToken = async (): Promise<string | null> => {
  try {
    const access_token = await AsyncStorage.getItem('access_token');
    return access_token;
  } catch (error) {
    // Handle AsyncStorage retrieval error
    console.error('Failed to retrieve access token:', error);
    return null;
  }
};

// Function to get refresh token from AsyncStorage
const getRefreshToken = async (): Promise<string | null> => {
  try {
    const refresh_token = await AsyncStorage.getItem('refresh_token');
    return refresh_token;
  } catch (error) {
    // Handle AsyncStorage retrieval error
    console.error('Failed to retrieve refresh token:', error);
    return null;
  }
};

const isTokenExpired = (token: string) => {
  if (token === null) {
    return true;
  }
  var decoded = jwt_decode(token);
  if (decoded.exp < Date.now() / 1000) {
    return true;
  } else {
    return false;
  }
};
export {api, authenticate};

import axios from 'axios';
import {createContext, useContext} from 'react';

// Create an AuthContext
const AuthContext = createContext < any > null;

// Provider component for handling authentication tokens
const AuthProvider: React.FC = ({children}) => {
  // Function to save access token in local storage
  const saveAccessToken = (accessToken: string) => {
    // Implement your own logic to save the access token
  };

  // Function to save refresh token in local storage
  const saveRefreshToken = (refreshToken: string) => {
    // Implement your own logic to save the refresh token
  };

  // Function to get access token from local storage
  const getAccessToken = (): string | null => {
    // Implement your own logic to retrieve the access token from local storage
  };

  // Function to get refresh token from local storage
  const getRefreshToken = (): string | null => {
    // Implement your own logic to retrieve the refresh token from local storage
  };

  return (
    <AuthContext.Provider
      value={{
        saveAccessToken,
        saveRefreshToken,
        getAccessToken,
        getRefreshToken,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the authentication context
const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return authContext;
};

const api = axios.create({
  baseURL: process.env.REACT_APP_NEXUS_BASE_URL + 'api/v1',
});

// Axios interceptor for adding access token to the request headers
api.interceptors.request.use(
  config => {
    const {getAccessToken} = useAuth();
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Axios interceptor for handling token refreshing
let isRefreshing = false;
let refreshSubscribers: ((accessToken: string) => void)[] = [];

const onTokenRefreshed = (accessToken: string) => {
  refreshSubscribers.forEach(subscriber => subscriber(accessToken));
  refreshSubscribers = [];
};

const addRefreshSubscriber = (subscriber: (accessToken: string) => void) => {
  refreshSubscribers.push(subscriber);
};

api.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;
    const {getRefreshToken, saveAccessToken} = useAuth();

    // Check if the error status is 401 (Unauthorized)
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        try {
          const accessToken = (await new Promise())<string>(resolve => {
            addRefreshSubscriber(resolve);
          });
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axios(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      } else {
        isRefreshing = true;
        originalRequest._retry = true;

        const refreshToken = getRefreshToken();
        try {
          const response = await api.post('/auth/refresh-token', {
            refreshToken,
          });
          const {accessToken} = response.data;
          saveAccessToken(accessToken);
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          onTokenRefreshed(accessToken);
          return axios(originalRequest);
        } catch (refreshError) {
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
const authenticate = async (username: string, password: string) => {
  try {
    const response = await api.post('/auth/authenticate', {username, password});
    const {accessToken, refreshToken} = response.data;
    const {saveAccessToken, saveRefreshToken} = useAuth();
    saveAccessToken(accessToken);
    saveRefreshToken(refreshToken);
    return accessToken;
  } catch (error) {
    return Promise.reject(error);
  }
};

export {AuthProvider, useAuth, api, authenticate};

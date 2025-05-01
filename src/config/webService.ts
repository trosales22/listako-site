import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { get } from 'lodash';
import { useAuthData } from 'hooks/useAuthData';
import { useRemoveAuthField } from 'hooks/useRemoveAuthField';
import { useDebouncedToast } from 'hooks/useDebounceToast';

// Set Base URL and Defaults
axios.defaults.baseURL = import.meta.env.VITE_WS_BASE_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

// Request Interceptor
axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const { token } = useAuthData();

  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response Interceptor
axios.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const { debouncedToastInfo, debouncedToastError } = useDebouncedToast();

    const { removeAuthField } = useRemoveAuthField();
    const errorMessage: any =
      get(error, 'response.data.errors[0].message') || get(error, 'response.data.message');
    const errorCode = error?.response?.status;

    if (['Token expired.', 'Token has expired.'].includes(errorMessage)) {
      debouncedToastInfo('Please re-login to continue.');
      removeAuthField('auth_status');
      removeAuthField('token');
      removeAuthField('role');
      window.location.href = '/login';
      return Promise.reject(error);
    }

    if (errorCode === 400) {
      debouncedToastError(errorMessage || 'Bad Request!');
    } else if (errorCode === 401) {
      debouncedToastError(errorMessage || 'Unauthorized');
      removeAuthField('auth_status');
      removeAuthField('token');
      removeAuthField('role');
      window.location.href = '/login';
    } else if (errorCode === 422) {
      debouncedToastError(errorMessage || 'Unprocessable Entity!');
    } else if (errorCode === 500) {
      debouncedToastError('Internal Server Error!');
    } else {
      debouncedToastError('Unable to connect to web service');
    }

    return Promise.reject(error);
  },
);

import axios, { AxiosError } from 'axios';
import { useMemo } from 'react';
import { useAuthApi } from '$web/base/auth';

const errorComposer = (error: AxiosError, setAuthToken: (token: string) => void) => {
  return () => {
    const statusCode = error.response ? error.response.status : null;

    if (statusCode === 401) {
      console.error('Please login to access this resource');
      setTimeout(() => {
        setAuthToken('');
      }, 1000);
    } else {
      console.error(
        error.response?.data?.message ?? 'Something went wrong ! Please try again later 😪'
      );
    }
  };
};

export function useRequest() {
  const { auth, session, setAuthToken } = useAuthApi();

  const instance = useMemo(() => {
    const instance = axios.create({
      baseURL:
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:5000'
          : process.env.REACT_APP_API_URL,
    });

    if (auth) instance.defaults.headers.common.Authorization = `Bearer ${session.getToken()}`;

    instance.interceptors.response.use(undefined, error => {
      error.handleAxiosError = errorComposer(error, setAuthToken);
      return Promise.reject(error);
    });

    return instance;
  }, [session, auth, setAuthToken]);

  return { request: instance };
}

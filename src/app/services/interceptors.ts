import type { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export const AppInterceptors = {
  req: (config: InternalAxiosRequestConfig) => {
    const jwt = localStorage.getItem("jwt-token");
    if (jwt) {
      config.headers.Authorization = `Bearer ${jwt}`;
    }

    return config;
  },
  reqErr: (err: AxiosError) => {
    return Promise.reject(err)
  },
  res: (res: AxiosResponse) => {
    return res
  },
  resErr: (err: AxiosError) => {
    if (err.response?.status === 401) {
      console.log('Response error: ', err)
    }

    return Promise.reject(err)
  }
}

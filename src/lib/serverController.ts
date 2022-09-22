import axios, { AxiosRequestConfig } from 'axios';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const customAxios = axios.create({
  baseURL: `/`,
  withCredentials: true,
  timeout: 60 * 1000,
  headers: {
    ContentType: 'application/json',
  },
});

customAxios.interceptors.request.use(function (config: AxiosRequestConfig) {
  const accessToken = cookies.get('accessToken');

  if (accessToken) {
    config.headers!.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

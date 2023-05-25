import axios from 'axios';
import { parseCookies } from 'nookies';

export const api = axios.create({
    baseURL: '/api'
});

export const serverApi = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? process.env.API_URL : process.env.LOCAL_API_URL,
});

serverApi.interceptors.request.use(async config => {
    const { 'ss.token' : token } = parseCookies();

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});
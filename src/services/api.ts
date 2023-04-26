import axios from 'axios';

export const serverApi = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? process.env.API_URL : process.env.LOCAL_API_URL
});

export const api = axios.create({
    baseURL: '/api'
});
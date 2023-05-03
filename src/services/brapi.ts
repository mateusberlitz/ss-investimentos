import axios from 'axios';

// export const serverApi = axios.create({
//     baseURL: process.env.NODE_ENV === 'production' ? process.env.API_URL : process.env.LOCAL_API_URL
// });

export const brapi = axios.create({
    baseURL: 'https://brapi.dev/api/'
});
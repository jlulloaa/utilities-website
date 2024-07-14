// src/axiosConfig.js

import axios from 'axios';

export const API_URL = process.env.REACT_APP_BACKEND_URL + ":" + process.env.REACT_APP_BACKEND_PORT; // Replace with your actual EC2 public IP and port

export const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true// TRUE: If you need to send cookies or other credentials
});

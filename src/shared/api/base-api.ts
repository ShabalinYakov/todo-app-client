import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const baseApi = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

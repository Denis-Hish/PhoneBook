import axios from 'axios';

// Строим baseURL в зависимости от BASE_URL Vite
// dev: BASE_URL = '/'        -> '/api'
// prod: BASE_URL = '/phonebook/' -> '/phonebook/api'
const RAW_BASE = import.meta.env.BASE_URL || '/';
const NORMALIZED_BASE = RAW_BASE.replace(/\/+$/, ''); // '/phonebook/' -> '/phonebook'
const API_BASE =
  NORMALIZED_BASE === '' || NORMALIZED_BASE === '/'
    ? '/api'
    : `${NORMALIZED_BASE}/api`;

// Создаем axios instance с автоматическим добавлением токена
const axiosInstance = axios.create({
  baseURL: API_BASE,
});

// Interceptor для добавления JWT токена к каждому запросу
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default axiosInstance;

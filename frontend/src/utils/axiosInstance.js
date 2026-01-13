import axios from 'axios';

// Создаем axios instance с автоматическим добавлением токена
const axiosInstance = axios.create();

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
  }
);

export default axiosInstance;

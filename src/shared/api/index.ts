import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL || 'http://localhost:3000/api';
export const BASE_URL = API_URL.replace('/api', '');

export const apiClient = axios.create({
  baseURL: API_URL,
});

// Перехватчик запросов для токена
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Перехватчик для обработки данных из MySQL
apiClient.interceptors.response.use((response) => {
  const fixPaths = (obj: any) => {
    if (!obj || typeof obj !== 'object') return obj;

    // 1. Парсинг JSON полей
    const jsonFields = ['images', 'amenities', 'water', 'heating_sources', 'commercial_types', 'road_type'];
    for (const field of jsonFields) {
      if (typeof obj[field] === 'string') {
        try {
          obj[field] = JSON.parse(obj[field]);
        } catch (e) {}
      }
    }

    // 2. Исправление путей для локального хранилища
    if (obj.image_url && obj.image_url.startsWith('/uploads')) {
      obj.image_url = BASE_URL + obj.image_url;
    }
    if (Array.isArray(obj.images)) {
      obj.images = obj.images.map((path: string) => 
        path.startsWith('/uploads') ? BASE_URL + path : path
      );
    }
    if (obj.video_url && obj.video_url.startsWith('/uploads')) {
      obj.video_url = BASE_URL + obj.video_url;
    }

    return obj;
  };

  if (Array.isArray(response.data)) {
    response.data = response.data.map(fixPaths);
  } else {
    response.data = fixPaths(response.data);
  }

  return response;
}, (error) => {
  if (error.response && (error.response.status === 401 || error.response.status === 403)) {
    localStorage.removeItem('auth_token');
    // Можно добавить редирект на логин
  }
  return Promise.reject(error);
});

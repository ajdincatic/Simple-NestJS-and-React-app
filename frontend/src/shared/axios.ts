import axios from 'axios';
import { logout } from '../redux/reducers/login';
import { store } from '../redux/store';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.headers['Content-Type'] = 'application/json';
axios.defaults.headers['Api-Key'] = process.env.REACT_APP_API_KEY;
axios.defaults.headers.withCredentials = true;

axios.interceptors.request.use(
  (config) => {
    const token = store?.getState()?.auth?.user?.token || null;

    if (!config.headers.Authorization && token) {
      config.headers.Authorization = `Bearer ${token.accessToken}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.data.statusCode === 401) {
      store.dispatch(logout());
    }

    return Promise.reject(error);
  },
);

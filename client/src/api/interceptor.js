import axios from 'axios';
import CONSTANTS from '../constants';
import history from '../browserHistory';

const httpClient = axios.create({
  baseURL: CONSTANTS.BASE_URL,
});

httpClient.interceptors.request.use(
  config => {
    const accessToken = window.localStorage.getItem(CONSTANTS.ACCESS_TOKEN);
    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }
    return config;
  },
  err => Promise.reject(err)
);

httpClient.interceptors.response.use(
  response => {
    if (
      response &&
      response.data &&
      response.data.data &&
      response.data.data.tokenPair
    ) {
      const {
        data: {
          data: {
            tokenPair: { access, refresh },
          },
        },
      } = response;
      window.localStorage.setItem(CONSTANTS.REFRESH_TOKEN, refresh);
      window.localStorage.setItem(CONSTANTS.ACCESS_TOKEN, access);
    }
    return response;
  },
  async err => {
    if (
      err.response.status === 401 &&
      window.location.pathname !== '/login' &&
      window.location.pathname !== '/' &&
      window.location.pathname !== '/registration' &&
      window.location.pathname !== '/help'
    ) {
      history.push('/login');
      history.go('/login');
      return;
    }

    const refreshToken = window.localStorage.getItem(CONSTANTS.REFRESH_TOKEN);
    if (err.response.status === 408 && refreshToken) {
      const {
        data: {
          data: {
            tokenPair: { access, refresh },
          },
        },
      } = await httpClient.post('auth/refresh', { refreshToken });
      window.localStorage.setItem(CONSTANTS.REFRESH_TOKEN, refresh);
      window.localStorage.setItem(CONSTANTS.ACCESS_TOKEN, access);
      err.config.headers['Authorization'] = 'Bearer ' + access;
      return httpClient(err.config);
    }
    return Promise.reject(err);
  }
);

export default httpClient;

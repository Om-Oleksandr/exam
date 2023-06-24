import axios from 'axios';
import CONSTANTS from '../constants';
import history from '../browserHistory';

const httpClient = axios.create({
  baseURL: CONSTANTS.BASE_URL,
});

let accessToken = null;

httpClient.interceptors.request.use(
  config => {
    const refreshToken = window.localStorage.getItem(CONSTANTS.REFRESH_TOKEN);
    if (accessToken && refreshToken) {
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
      accessToken = access;
    }
    return response;
  },
  err => {
    if (
      err.response.status === 401 &&
      window.location.pathname !== '/login' &&
      window.location.pathname !== '/'
    ) {
      history.replace('/login');
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
      } = httpClient.post('auth/refresh', { refreshToken });
      window.localStorage.setItem(CONSTANTS.REFRESH_TOKEN, refresh);
      accessToken = access;
      err.config.headers['Authorization'] = 'Bearer ' + accessToken;
      return axios.request(err.config);
    }
    return Promise.reject(err);
  }
);

export default httpClient;

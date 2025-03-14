import Axios from 'axios';
import ErrorHandler from './error-handler';

const axiosExtra = {
  onRequest(fn) {
    this.interceptors.request.use((config) => fn(config) || config);
  },
  onResponse(fn) {
    this.interceptors.response.use((response) => fn(response) || response);
  },
  onRequestError(fn) {
    this.interceptors.request.use(undefined, (error) => fn(error) || Promise.reject(error));
  },
  onResponseError(fn) {
    this.interceptors.response.use(undefined, (error) => fn(error) || Promise.reject(error));
  },
  onError(fn) {
    this.onRequestError(fn);
    this.onResponseError(fn);
  },
};

const extendAxiosInstance = (axios) => {
  Object.keys(axiosExtra).forEach((key) => {
    // eslint-disable-next-line no-param-reassign
    axios[key] = axiosExtra[key].bind(axios);
  });
};

const initHooks = (axios, hooks) => {
  Object.keys(hooks).forEach((key) => {
    axios[key](hooks[key]);
  });
};

const getDefaultHooks = ({ errorHandler }) => ({
  onError: (error) => ErrorHandler(error, errorHandler),
});

export default (config, { errorHandler }) => {
  const hooks = config?.hooks || {};
  const axios = config?.axios || Axios.create(config);

  // Extend axios proto
  extendAxiosInstance(axios);

  // Init hooks
  initHooks(axios, {
    ...getDefaultHooks({ errorHandler }),
    ...hooks,
  });

  return axios;
};

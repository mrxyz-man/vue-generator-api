import Axios from './axios';

const DEFAULT_OPTIONS = {
  api: {},
  errorHandler: {},
  axios: null,
};

export default (options) => {
  const { api, errorHandler, axios } = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  if (!Object.keys(api).length) {
    throw new Error(`
      No one register api was found!
      Please, add configuration for api-generator.
    `);
  }

  return Object.entries(api).reduce((acc, [name, config]) => ({
    ...acc, [name]: Axios(config, { errorHandler, axios }),
  }), {});
};

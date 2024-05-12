import ApiGenerator from './utils/generator';

/* eslint-disable no-param-reassign */
export default {
  install(Vue, options) {
    const api = ApiGenerator(options);

    Vue.api = api;
    Vue.prototype.$api = api;
  },
};

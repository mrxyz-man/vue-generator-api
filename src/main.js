import Vue from 'vue';
import App from './App.vue';
import ApiGenerator from '../lib';

Vue.use(ApiGenerator, {
  api: {
    base: {
      baseURL: 'https://leslog.ru/api/',
      headers: {
        common: {
          Accept: 'application/json, text/plain, */*',
        },
      },
    },
  },
  errorHandler: {
    callbacks: {
      onError: ({ error, errors, messages }) => {
        console.log(messages);
        error.config.obs.setErrors(errors);
      },
    },
  },
});

export default new Vue({
  el: '#app',
  render: (h) => h(App),
});

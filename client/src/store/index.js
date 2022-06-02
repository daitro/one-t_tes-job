import Vue from 'vue';
import Vuex from 'vuex';
import newsApi from '../api/news';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    newsList: [],
  },
  mutations: {
    setNews(state, news) {
      state.newsList = news;
    },
  },
  actions: {
    getNewsList(context) {
      return newsApi
        .getNewsList()
        .then((res) => {
          context.commit('setNews', res.data);
        })
        .catch((err) => {
          console.error('Ошибка:', err);
        });
    },
  },
});

export default store;

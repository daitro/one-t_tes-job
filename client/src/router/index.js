import Vue from 'vue';
import VueRouter from 'vue-router';
import NewsPage from '../views/NewsPage.vue';
import ArticlePage from '../views/ArticlePage.vue';
import CreateArticlePage from '../views/CreateArticlePage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'NewsPage',
    component: NewsPage,
  },
  {
    path: '/article/:id',
    name: 'Article',
    component: ArticlePage,
  },
  {
    path: '/createArticle',
    name: 'CreateArticlePage',
    component: CreateArticlePage,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

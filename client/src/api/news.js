import HTTP from './http';

const getNewsList = () => HTTP.get('/api/news/list');

const getNewsArticleById = (id) => HTTP.get(`/api/news/article/${id}`);

const createNewsArticle = (payload) => HTTP.post('/api/news/add', payload);

const addNewComment = (payload) => HTTP.post('/api/news/comment', payload);

const newsApi = {
  getNewsList,
  getNewsArticleById,
  createNewsArticle,
  addNewComment,
};

export default newsApi;

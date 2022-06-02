const express = require('express');

const router = express.Router();

const news = require('../model/news');

router.post('/comment', (req, res) => {
  const currentNewsArticle = news.find((article) => article.id === req.body.newsId);

  currentNewsArticle.comments.push(req.body.comment);
  res.sendStatus(200);
});

router.post('/add', (req, res) => {
  news.push(req.body);
  res.sendStatus(200);
});

router.get('/list', (req, res) => {
  res.json(news);
});

router.get('/article/:id', (req, res) => {
  const article = news.find((item) => item?.id === req.params.id);

  if (article) {
    res.json(article);
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;

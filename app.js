const express = require('express');
const { getArticles, getArticleCommentsByArticleId } = require('./controllers/articles.controllers');
const { getTopics } = require('./controllers/topics.controllers');
const { handle500StatusCodes, handle400StatusCodes } = require('./errors');

const app = express();

app.get('/api/topics', getTopics);

app.get('/api/articles', getArticles);

app.get('/api/articles/:article_id/comments', getArticleCommentsByArticleId)

app.all('/*', (req, res, next) => {
  next({status: 404});
})

app.use(handle400StatusCodes);
app.use(handle500StatusCodes);

module.exports = app;
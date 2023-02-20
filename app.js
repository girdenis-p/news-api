const express = require('express');
const { getArticleById, getArticles, getArticleCommentsByArticleId } = require('./controllers/articles.controllers');
const { getTopics } = require('./controllers/topics.controllers');
const { handle500StatusCodes, handlePSQLErrors, handleCustomErrors } = require('./errors');

const app = express();

app.get('/api/topics', getTopics);

app.get('/api/articles', getArticles);

app.get('/api/articles/:article_id', getArticleById)

app.get('/api/articles/:article_id/comments', getArticleCommentsByArticleId)

app.all('/*', (req, res, next) => {
  next({status: 404});
})

app.use(handlePSQLErrors);
app.use(handleCustomErrors);
app.use(handle500StatusCodes);

module.exports = app;
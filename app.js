const express = require('express');
const { getArticleById, getArticles } = require('./controllers/articles.controllers');
const { getTopics } = require('./controllers/topics.controllers');
const { handle500StatusCodes, handle400StatusCodes, handlePSQLErrors } = require('./errors');

const app = express();

app.get('/api/topics', getTopics);

app.get('/api/articles', getArticles);

app.get('/api/articles/:article_id', getArticleById)

app.all('/*', (req, res, next) => {
  next({status: 404});
})

app.use(handlePSQLErrors);
app.use(handle400StatusCodes);
app.use(handle500StatusCodes);

module.exports = app;
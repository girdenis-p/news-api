const express = require('express');
const { getArticleById, getArticles, } = require('./controllers/articles.controllers');
const { postCommentByArticleId } = require('./controllers/comments.controllers');
const { getTopics } = require('./controllers/topics.controllers');
const { handle500StatusCodes, handlePSQLErrors, handleCustomErrors } = require('./errors');

const app = express();

app.use(express.json());

app.get('/api/topics', getTopics);

app.get('/api/articles', getArticles);

app.get('/api/articles/:article_id', getArticleById)

app.post('/api/articles/:article_id/comments', postCommentByArticleId)

app.all('/*', (req, res, next) => {
  next({status: 404});
})

app.use(handlePSQLErrors);
app.use(handleCustomErrors);
app.use(handle500StatusCodes);

module.exports = app;
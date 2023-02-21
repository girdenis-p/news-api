const express = require('express');

const { getArticleById, getArticles, patchArticleById } = require('./controllers/articles.controllers');
const { postCommentByArticleId, getArticleCommentsByArticleId } = require('./controllers/comments.controllers');
const { getTopics } = require('./controllers/topics.controllers');
const { handle500StatusCodes, handlePSQLErrors, handleCustomErrors } = require('./errors');
const { getUsers } = require('./controllers/users.controllers');

const app = express();

app.use(express.json());

app.get('/api/topics', getTopics);

app.get('/api/articles', getArticles);

app.get('/api/articles/:article_id', getArticleById)

app.patch('/api/articles/:article_id', patchArticleById)

app.post('/api/articles/:article_id/comments', postCommentByArticleId)

app.get('/api/articles/:article_id/comments', getArticleCommentsByArticleId)

app.get('/api/users', getUsers)

app.all('/*', (req, res, next) => {
  next({status: 404});
})

app.use(handlePSQLErrors);
app.use(handleCustomErrors);
app.use(handle500StatusCodes);

module.exports = app;
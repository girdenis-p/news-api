const express = require('express');
const { getArticles } = require('./controllers/articles.controllers');
const { getTopics } = require('./controllers/topics.controllers');
const { handle500StatusCodes, catch404StatusCodes } = require('./errors');

const app = express();

app.get('/api/topics', getTopics);

app.get('/api/articles', getArticles);

app.use(catch404StatusCodes);
app.use(handle500StatusCodes);

module.exports = app;
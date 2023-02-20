const express = require('express');
const { getTopics } = require('./controllers/topics.controllers');
const { handle500StatusCodes, handle404StatusCodes } = require('./errors');

const app = express();

app.get('/api/topics', getTopics);

app.use(handle404StatusCodes)
app.use(handle500StatusCodes);

module.exports = app;
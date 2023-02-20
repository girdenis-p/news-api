const express = require('express');
const { getTopics } = require('./controllers/topics.controllers');
const { handle500StatusCodes, catch404StatusCodes, catch505StatusCodes } = require('./errors');

const app = express();

app.use(catch505StatusCodes);

app.get('/api/topics', getTopics);

app.use(catch404StatusCodes);
app.use(handle500StatusCodes);

module.exports = app;
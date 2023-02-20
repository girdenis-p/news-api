const express = require('express');
const { getTopics } = require('./controllers/topics.controllers');
const { handle500StatusCodes, handle400StatusCodes } = require('./errors');

const app = express();

app.get('/api/topics', getTopics);

app.all('/*', (req, res, next) => {
  next({status: 404});
})

app.use(handle400StatusCodes);
app.use(handle500StatusCodes);

module.exports = app;
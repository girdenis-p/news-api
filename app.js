const express = require('express');
const { getTopics } = require('./controllers/topics.controllers');
const { handle500StatusCodes } = require('./errors');

const app = express();

app.get('/api/topics', getTopics);

app.use((req, res, next) => {
  res.status(404).send({msg: `Endpoint ${req.url} not found!`});
})
app.use(handle500StatusCodes);

module.exports = app;
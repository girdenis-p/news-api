const express = require('express');
const cors = require('cors');

const { handle500StatusCodes, handlePSQLErrors, handleCustomErrors } = require('./errors');

const apiRouter = require('./routes/api-router')

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api', apiRouter)

app.all('*', (req, res, next) => {
  next({status: 404});
})

app.use(handlePSQLErrors);
app.use(handleCustomErrors);
app.use(handle500StatusCodes);

module.exports = app;
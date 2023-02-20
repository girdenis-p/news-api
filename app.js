const express = require('express');
const { handle500StatusCodes } = require('./errors');

const app = express();

app.use(handle500StatusCodes)

module.exports = app;
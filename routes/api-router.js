const apiRouter = require('express').Router();

const { getEndpoints } = require('../controllers/endpoints.controllers');

const articleRouter = require('./articles-router')
const commentRouter = require('./comments-router')
const topicRouter = require('./topics-router')
const userRouter = require('./users-router')

apiRouter.get('/', getEndpoints);

apiRouter.use('/articles', articleRouter)

apiRouter.use('/comments', commentRouter)

apiRouter.use('/topics', topicRouter)

apiRouter.use('/users', userRouter)

module.exports = apiRouter;
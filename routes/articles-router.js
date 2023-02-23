const articleRouter = require('express').Router();

const { getArticleById, getArticles, patchArticleById } = require('../controllers/articles.controllers');
const { postCommentByArticleId, getArticleCommentsByArticleId} = require('../controllers/comments.controllers');

articleRouter.get('/', getArticles);

articleRouter.route('/:article_id')
  .get(getArticleById)
  .patch(patchArticleById)

articleRouter.route('/:article_id/comments')
  .get(getArticleCommentsByArticleId)
  .post(postCommentByArticleId)

module.exports = articleRouter;